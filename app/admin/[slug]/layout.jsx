import SideBar from "@/components/ReusableComponents/SideBar";
import TopBar from "@/components/ReusableComponents/TopBar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <SideBar />

          <div className="flex flex-col flex-1">
            <TopBar />

            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
