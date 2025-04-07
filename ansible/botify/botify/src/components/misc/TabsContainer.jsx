import React from "react";

function TabsContainer({ children, onClick }) {
  return (
    <section
      className="flex flex-row items-start justify-start"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

export default TabsContainer;
