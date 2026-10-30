import { useEffect, useState } from "react";
import App from "../../App"
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
    activePage,
    onNavigate,
    title,
    totalTasks,
    pendingTasks,
    completedTasks,
    searchValue,
    onSearchChange,
    notifications,
}) {
    // controls the sidebar on mobile and tablet screens
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // while the mobile sidebar is open:
    // - close it when Escape is pressed
    // - stop the page behind it from scrolling
    useEffect(() => {
        if (!sidebarOpen) return;

        function handleEscape(event) {
            if (event.key === "Escape") {
                setSidebarOpen(false);
            }
        }

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        // clean up when sidebar closes
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <div className="min-h-screen bg-slate-100 lg:flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar: slides in on mobile, stays fixed on the left on desktop */}
            <div
                className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:self-start ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Sidebar
                    activePage={activePage}
                    onNavigate={(page) => {
                        onNavigate?.(page);
                        // close the mobile sidebar after clicking a menu item
                        setSidebarOpen(false);
                    }}
                    totalTasks={totalTasks}
                    pendingTasks={pendingTasks}
                    completedTasks={completedTasks}
                />
            </div>

            {/* Main content */}
            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
                <Header
                    title={title}
                    onMenuClick={() => setSidebarOpen(true)}
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    notifications={notifications}
                />

                <main className="flex-1 p-5 sm:p-8">
                    <App />
                </main>
            </div>
        </div>
    );
}