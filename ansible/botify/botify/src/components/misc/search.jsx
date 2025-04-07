import React from "react";
import { Search } from "@/assets/icons";
import Input from "../ui/input";

function SearchIcon() {
  return <Input iconSrc={Search} placeholder="Search ..." />;
}

export default SearchIcon;
