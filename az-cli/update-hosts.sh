#!/bin/bash

# Constants
BLUE='\033[0;34m'
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
HOSTS_FILE="/etc/hosts"
REAL_USER_HOME=$(eval echo ~${SUDO_USER:-$USER})
SSH_CONFIG_FILE="${REAL_USER_HOME}/.ssh/config"
DELIMITER_START="#### start azure routing ####"
DELIMITER_END="#### end azure routing ####"
SSH_DELI_START="#### start azure ssh config ####"
SSH_DELI_END="#### end azure ssh config ####"

# Azure config
RESOURCE_GROUP="myResourceGroup" 
SSH_USER="azureuser"

log_info()    { printf "${BLUE} [azure] ${NC} %s\n" "$1"; }
log_success() { printf "${GREEN} [azure] ${NC} %s\n" "$1"; }
log_error()   { printf "${RED} [azure] ${NC} %s\n" "$1"; }
log_warning() { printf "${YELLOW} [azure] ${NC} %s\n" "$1"; }

check_azure_cli() {
    if ! command -v az >/dev/null 2>&1; then
        log_error "Azure CLI not found. Please install Azure CLI first."
        exit 1
    fi
    if ! az account show >/dev/null 2>&1; then
        log_info "Azure login required..."
        az login || { log_error "Azure login failed."; exit 1; }
    fi
}

check_root() {
    if [ -z "$EUID" ] || [ "$EUID" -ne 0 ]; then
        log_info "Not running as root. Elevating privileges..."
        sudo -E bash "$0" "$@"
        exit $?
    fi
}

clean_existing_entries() {
    log_info "Ensuring SSH config exists at: $SSH_CONFIG_FILE"
    mkdir -p "$(dirname "$SSH_CONFIG_FILE")"
    touch "$SSH_CONFIG_FILE"
    chown ${SUDO_USER:-$USER}:${SUDO_USER:-$USER} "$SSH_CONFIG_FILE"
    chmod 600 "$SSH_CONFIG_FILE"

    # Clear old SSH config section
    sed -i "/${SSH_DELI_START}/,/${SSH_DELI_END}/d" "$SSH_CONFIG_FILE"
    echo -e "\n${SSH_DELI_START}\n${SSH_DELI_END}" >> "$SSH_CONFIG_FILE"

    # Clear old hosts entries
    if grep -q "${DELIMITER_START}" "$HOSTS_FILE"; then
        log_info "Removing previous Azure host entries."
        sed -i "/${DELIMITER_START}/,/${DELIMITER_END}/d" "$HOSTS_FILE"
    fi
}

update_hosts_and_ssh() {
    log_info "Fetching VMs from Azure..."
    echo -e "${DELIMITER_START}\n" | tee -a "$HOSTS_FILE" > /dev/null

    az vm list -g "$RESOURCE_GROUP" --show-details --query "[?powerState=='VM running']" -o json | \
    jq -r '.[] | [.name, .publicIps] | @tsv' | \
    while IFS=$'\t' read -r name ip; do
        if [ -n "$ip" ]; then
            domain="${name}.cloud"
            echo -e "${ip} ${domain}" | tee -a "$HOSTS_FILE" > /dev/null
            log_success "Added: ${ip} ${domain}"

            sed -i "/${SSH_DELI_END}/d" "$SSH_CONFIG_FILE"
            {
                echo -e "\nHost ${name}"
                echo -e "    HostName ${ip}"
                echo -e "    User ${SSH_USER}"
                echo -e "    StrictHostKeyChecking no"
                echo -e "    UserKnownHostsFile /dev/null"
            } >> "$SSH_CONFIG_FILE"
            echo -e "${SSH_DELI_END}" >> "$SSH_CONFIG_FILE"
        fi
    done

    echo -e "\n${DELIMITER_END}" | tee -a "$HOSTS_FILE" > /dev/null
    chown ${SUDO_USER:-$USER}:${SUDO_USER:-$USER} "$SSH_CONFIG_FILE"
}

main() {
    log_info "Starting Azure VM SSH/hosts update"
    check_root "$@"
    check_azure_cli
    clean_existing_entries
    update_hosts_and_ssh
    log_success "Azure VM integration complete!"
}

main "$@"
