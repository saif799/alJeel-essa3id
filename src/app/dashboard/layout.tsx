import SideBar from "@/components/sideBar";

export const metadata = {
  title: "لوحة التحكم",
};
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SideBar />

      {children}
    </div>
  );
};

export default DashboardLayout;
