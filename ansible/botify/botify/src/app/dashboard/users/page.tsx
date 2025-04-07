import React from "react";
import { Avatar } from "@/assets/icons";
import { DataTable } from "./data-table";
import { exportIcon } from "@/assets/icons";
import SearchIcon from "@/components/misc/search";
import { columns } from "./columns";
import CustomButton from "@/components/form-elements/CustomButton";
import getUsers from "@/data/users";

async function page() {
  const data = await getUsers();
  return (
    <div className="flex flex-col h-screen">
      <div className="header py-8 px-12 border-b border-b-gray-200 flex-none">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-900 text-2xl leading-8 font-bold">
              Users
            </h3>
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate{" "}
            </p>
          </div>
          <div className="avatar">
            <Avatar />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-12 flex-1 py-6 min-h-0">
        <div className="flex flex-row w-full justify-between flex-none">
          <SearchIcon />
          <CustomButton iconSrc={exportIcon}>Export</CustomButton>
        </div>

        <div className="flex-1 min-h-0">
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default page;
