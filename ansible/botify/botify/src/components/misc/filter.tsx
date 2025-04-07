import React from "react";
import CustomButton from "../form-elements/CustomButton";
import Image from "next/image";
import { filterIcon } from "@/assets/icons";

function FilterIcon() {
  return (
    <CustomButton
      className="bg-gray-50 gap-2.5 flex flex-row items-center text-sm font-normal leading-5 text-gray-700 px-6 py-3 shadow-none"
      iconSrc={filterIcon}
    >
      Filters
    </CustomButton>
  );
}

export default FilterIcon;
