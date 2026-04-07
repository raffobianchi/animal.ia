import { DashboardSidebar } from "~/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-y-auto pb-24 md:pb-0">
        {children}
      </div>
    </div>
  );
}
