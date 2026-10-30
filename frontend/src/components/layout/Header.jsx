import { useEffect, useRef, useState } from "react";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";

export default function Header({
    title = "Overview",
    onMenuClick,
    searchValue = "",
    onSearchChange = () => { },
    // example: [{ id: 1, title: "Task is due today", time: "5 min ago", read: false }]
    notifications = [],
}) {
    // open / close the notification box
    const [showNotifications, setShowNotifications] = useState(false);

    // used to detect clicks outside the notification box
    const notificationRef = useRef(null);

    // how many notifications are not read yet
    const unreadCount = notifications.filter((item) => !item.read).length;

    // close the notification box when user clicks outside or presses Escape
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        // remove the listeners when component is removed
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
                {/* Menu button (only on small screens) */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                >
                    <FiMenu size={21} />
                </button>

                <div className="min-w-0">
                    <p className="text-xs text-slate-500">Workspace / TaskFlow</p>
                    <h2 className="mt-1 truncate text-xl font-bold text-slate-900">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Search */}
                <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-violet-400 sm:flex">
                    <FiSearch className="text-slate-400" size={18} />

                    <input
                        type="search"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search tasks..."
                        aria-label="Search tasks"
                        className="w-36 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 md:w-48"
                    />
                </label>

                {/* Notifications */}
                <div ref={notificationRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setShowNotifications(!showNotifications)}
                        aria-label="Notifications"
                        aria-expanded={showNotifications}
                        className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
                    >
                        <FiBell size={19} />

                        {/* small dot only when there are unread notifications */}
                        {unreadCount > 0 && (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-600" />
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                            <p className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
                                Notifications
                            </p>

                            {notifications.length === 0 ? (
                                <p className="px-4 py-8 text-center text-sm text-slate-500">
                                    You are all caught up
                                </p>
                            ) : (
                                <ul className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
                                    {notifications.map((item) => (
                                        <li key={item.id} className="px-4 py-3">
                                            <p
                                                className={`text-sm ${item.read
                                                    ? "text-slate-500"
                                                    : "font-medium text-slate-900"
                                                    }`}
                                            >
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {item.time}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">
                    TF
                </div>
            </div>
        </header>
    );
}