import React from "react";

function Skeleton() {
  return (
    <div className="skeleton py-3 flex items-center justify-center flex-col gap-2">
      <div className="animate-pulse space-y-4  p-4 bg-gray-100 w-[141px] h-[50px] rounded-lg flex-grow">
        {/* Paragraph skeleton */}
        <div className="space-y-2 ">
          <div className="h-1 bg-white rounded w-full" />
          <div className="h-1 bg-white rounded w-full" />
          <div className="h-1 bg-white rounded w-full" />
        </div>
      </div>
      <div className="animate-pulse space-y-4  p-4 bg-blue-50 w-[141px] h-[50px] rounded-lg justify-self-end ">
        {/* Paragraph skeleton */}
        <div className="space-y-2 ">
          <div className="h-1 bg-blue-100 rounded w-full" />
          <div className="h-1 bg-blue-100 rounded w-full" />
          <div className="h-1 bg-blue-100 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
