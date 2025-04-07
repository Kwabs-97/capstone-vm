"use client";
import Logo from "../misc/Logo";
import Link from "next/link";
import { Columns2, Users, Database, CircleHelp, Layers } from "lucide-react";
import { Chatbot } from "@/assets/icons";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Sidebar() {
  const [isToggled, setIsToggled] = useState(false);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const navItems = [
    {
      link: "/", // Set to an empty string for the root path
      icon: <Chatbot />,
      name: "Chatbots", // Adding a name for readability in the link text
    },
    {
      link: "Issues",
      icon: <Database size={16} />,
      name: "Issues",
    },
    {
      link: "Users",
      icon: <Users size={16} />,
      name: "Users",
    },
    {
      link: "Integrations",
      icon: <Layers size={16} />,
      name: "Integrations",
    },
    {
      link: "Help",
      icon: <CircleHelp size={16} />,
      name: "Help",
    },
  ];

  return (
    <div
      className={`h-full flex flex-row transition-all duration-300 ${
        isToggled ? "w-16" : "w-60"
      }`}
    >
      <div
        className={`bg-basic flex flex-col justify-between transition-all duration-150 ${
          isToggled ? "w-16" : "w-60"
        }`}
      >
        <section className="links flex flex-col gap-4">
          <header>
            <Logo className="px-4 py-2.5" isToggled={isToggled} />
          </header>
          <main className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              {navItems.slice(0, 3).map((navItem, i) => {
                const href = navItem.link
                  ? `/dashboard/${navItem.link.toLowerCase()}`
                  : "/";
                const isActive = pathname === href;
                return (
                  <Link
                    href={href}
                    key={i}
                    className={`flex flex-row gap-4 px-4 py-2.5 items-center hover:ml-2 duration-200 ${
                      isActive ? "bg-lightBlue bg-opacity-25 rounded-lg" : ""
                    }`}
                  >
                    <div className={`${isActive ? "text-blue-400" : ""}`}>
                      {navItem.icon}
                    </div>
                    <div className={`${isToggled ? "hidden" : ""}`}>
                      <p className={`${isActive ? "text-blue-400" : ""}`}>
                        {navItem.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col gap-1">
              <header className={`px-4 py-2.5 ${isToggled ? "hidden" : ""}`}>
                Settings
              </header>
              {navItems.slice(3).map((navItem, i) => {
                const href = `/dashboard/${navItem.link.toLowerCase()}`;
                const isActive = pathname === href;
                return (
                  <Link
                    href={href}
                    key={i}
                    className={`flex flex-row gap-4 px-4 py-2.5 items-center hover:ml-2 duration-200 ${
                      isActive ? "bg-lightBlue bg-opacity-25 rounded-lg" : ""
                    }`}
                  >
                    <div className={`${isActive ? "text-blue-400" : ""}`}>
                      {navItem.icon}
                    </div>
                    <div className={`${isToggled ? "hidden" : ""}`}>
                      <p className={`${isActive ? "text-blue-400" : ""}`}>
                        {navItem.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </main>
        </section>
        <section
          className="collapsible py-3.5 px-4 hover:cursor-pointer"
          onClick={handleToggle}
        >
          <div className="flex flex-row gap-4 items-center ">
            <div>
              <Columns2 size={16} />
            </div>
            <div className={`${isToggled ? "hidden" : ""}`}>
              <p className="text-nowrap">Collapse Menu</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
