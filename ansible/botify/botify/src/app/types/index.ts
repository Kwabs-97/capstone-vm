export interface ChatbotDataInterface {
  id?: string;
  name?: string;
  color?: string;
  offline_fallback_notification_email?: string;
  welcome_message?: string;
  isLive?: boolean;
  isPublic?: boolean;
  lastTrained?: Date;
  fallback_message?: string;
  collect_user_email?: boolean;
  website_url?: string;
}
