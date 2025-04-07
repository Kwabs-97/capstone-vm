import { Avatar } from "@/assets/icons";
import { DataTable } from "./data-table";
import FilterIcon from "@/components/misc/filter";
import SearchIcon from "@/components/misc/search";
import { Issue, columns } from "./columns";

async function getIssues(): Promise<Issue[]> {
  return [
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
    {
      userQuery: "I want to know about the B2B services on your plartform",
      botSource: "Jobmanor",
      date: new Date().toLocaleDateString(),
      actions: "Train",
    },
  ];
}
async function IssuesPage() {
  const data = await getIssues();

  return (
    <div className="flex flex-col gap-5 overflow-hidden ">
      <div className="header py-8 px-12 border-b border-b-gray-200">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-900 text-2xl leading-8 font-bold">
              Issues
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
      <div className="flex flex-col gap-6 px-12">
        <div className="flex flex-row gap-6">
          <FilterIcon />
          <SearchIcon />
        </div>

        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}

export default IssuesPage;
