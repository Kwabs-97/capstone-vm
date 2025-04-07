"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Issue = {
  id?: string;
  userQuery: string;
  botSource: string;
  date: string;
  actions: string;
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "userQuery",
    header: () => (
      <div className="text-gray-800 font-medium text-xs leading-4 p-3">
        User Query
      </div>
    ),
    cell: ({ row }) => {
      return <div className="p-3">{row.getValue("userQuery")}</div>;
    },
  },
  {
    accessorKey: "botSource",
    header: () => (
      <div className="text-gray-800 font-medium text-xs leading-4 p-3">
        Bot Source
      </div>
    ),
    cell: ({ row }) => {
      return <div className="p-3">{row.getValue("botSource")}</div>;
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="text-gray-800 font-medium text-xs leading-4 p-3">
        Date
      </div>
    ),
    cell: ({ row }) => {
      return <div className="p-3">{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="text-gray-800 font-medium text-xs leading-4 p-3">
        Actions
      </div>
    ),
    cell: ({ row }) => {
      return <div className="p-3">{row.getValue("actions")}</div>;
    },
  },
];
