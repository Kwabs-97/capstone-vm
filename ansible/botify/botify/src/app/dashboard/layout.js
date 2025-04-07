import Main from "@/components/layouts/main";
import Sidebar from "@/components/layouts/sidebar";

function DashbordLayout({ children }) {
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
      <Sidebar />
      <Main className="flex flex-col gap-6">{children}</Main>
    </div>
  );
}

export default DashbordLayout;
