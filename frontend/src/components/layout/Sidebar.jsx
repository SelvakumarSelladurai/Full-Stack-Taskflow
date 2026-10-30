import { useState } from "react";
import {
    FiGrid,
    FiList,
    FiClock,
    FiCheckCircle,
    FiCheckSquare,
    FiSettings,
    FiHelpCircle,
    FiPlus,
    FiChevronsLeft,
    FiChevronsRight,
} from "react-icons/fi";

// Main menu items
const navigationItems = [
    { label: "Overview", icon: FiGrid, page: "overview" },
    { label: "All Tasks", icon: FiList, page: "all" },
    { label: "Pending", icon: FiClock, page: "pending" },
    { label: "Completed", icon: FiCheckCircle, page: "completed" },
];

export default function Sidebar({
    activePage = "overview",
    onNavigate = () => { },
    totalTasks = 0,
    pendingTasks = 0,
    completedTasks = 0,
}) {
    // true = small sidebar with only icons (this works only on large screens)
    const [collapsed, setCollapsed] = useState(false);

    // numbers shown next to the menu items
    const counts = {
        all: totalTasks,
        pending: pendingTasks,
        completed: completedTasks,
    };

    // completed percentage for the progress bar (avoid dividing by 0)
    const progress =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <aside
            className={`flex h-screen w-64 shrink-0 flex-col bg-slate-950 px-5 py-6 text-slate-300 transition-all duration-200 ${collapsed ? "lg:w-20 lg:px-3" : ""
                }`}
        >
            {/* Brand + collapse button */}
            <div
                className={`mb-10 flex items-center justify-between gap-2 px-2 ${collapsed ? "lg:flex-col lg:gap-4 lg:px-0" : ""
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
                        <FiCheckSquare size={23} />
                    </div>

                    {/* hide the text when sidebar is collapsed */}
                    <div className={collapsed ? "lg:hidden" : ""}>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            TaskFlow
                        </h1>
                        <p className="text-xs text-slate-400">
                            Work smarter, every day
                        </p>
                    </div>
                </div>

                {/* collapse button is only for large screens */}
                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-900 hover:text-white lg:block"
                >
                    {collapsed ? (
                        <FiChevronsRight size={18} />
                    ) : (
                        <FiChevronsLeft size={18} />
                    )}
                </button>
            </div>

            {/* Create task */}
            <button
                type="button"
                onClick={() => onNavigate("create")}
                title={collapsed ? "Create task" : undefined}
                className="mb-8 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
                <FiPlus size={18} className="shrink-0" />
                <span className={collapsed ? "lg:hidden" : ""}>Create task</span>
            </button>

            <p
                className={`mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500 ${collapsed ? "lg:hidden" : ""
                    }`}
            >
                Workspace
            </p>

            {/* Main navigation */}
            <nav className="space-y-2">
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.page;

                    return (
                        <button
                            key={item.page}
                            type="button"
                            onClick={() => onNavigate(item.page)}
                            title={collapsed ? item.label : undefined}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition ${collapsed ? "lg:justify-center" : ""
                                } ${isActive
                                    ? "bg-violet-600/15 font-semibold text-violet-300"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Icon size={19} className="shrink-0" />
                                <span className={collapsed ? "lg:hidden" : ""}>
                                    {item.label}
                                </span>
                            </span>

                            {/* Overview does not need a count */}
                            {item.page !== "overview" && (
                                <span
                                    className={`rounded-md px-2 py-0.5 text-xs ${collapsed ? "lg:hidden" : ""
                                        } ${isActive
                                            ? "bg-violet-600/20 text-violet-300"
                                            : "bg-slate-800 text-slate-400"
                                        }`}
                                >
                                    {counts[item.page]}
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Progress card (hidden when collapsed or when there are no tasks) */}
            {totalTasks > 0 && (
                <div
                    className={`mt-8 rounded-xl bg-slate-900 p-4 ${collapsed ? "lg:hidden" : ""
                        }`}
                >
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">
                            {progress}% done
                        </p>
                        <p className="text-xs text-slate-500">
                            {completedTasks}/{totalTasks}
                        </p>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full rounded-full bg-violet-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Bottom navigation */}
            <div className="mt-auto space-y-2 border-t border-slate-800 pt-5">
                <button
                    type="button"
                    onClick={() => onNavigate("help")}
                    title={collapsed ? "Help & Support" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white ${collapsed ? "lg:justify-center" : ""
                        }`}
                >
                    <FiHelpCircle size={19} className="shrink-0" />
                    <span className={collapsed ? "lg:hidden" : ""}>
                        Help & Support
                    </span>
                </button>

                <button
                    type="button"
                    onClick={() => onNavigate("settings")}
                    title={collapsed ? "Settings" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white ${collapsed ? "lg:justify-center" : ""
                        }`}
                >
                    <FiSettings size={19} className="shrink-0" />
                    <span className={collapsed ? "lg:hidden" : ""}>Settings</span>
                </button>

                {/* User card */}
                <div
                    className={`mt-5 flex items-center gap-3 rounded-xl bg-slate-900 p-3 ${collapsed ? "lg:justify-center lg:p-2" : ""
                        }`}
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
                        TF
                    </div>

                    <div className={`min-w-0 ${collapsed ? "lg:hidden" : ""}`}>
                        <p className="truncate text-sm font-semibold text-white">
                            TaskFlow User
                        </p>
                        <p className="text-xs text-slate-500">Free plan</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}