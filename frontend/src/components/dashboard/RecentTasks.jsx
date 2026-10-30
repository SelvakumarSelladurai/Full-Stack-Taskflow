import {
    FiCheckCircle,
    FiClock,
    FiMoreHorizontal,
} from "react-icons/fi";

const recentTasks = [
    {
        id: 1,
        title: "Complete TaskFlow dashboard",
        category: "Development",
        priority: "High",
        status: "In Progress",
        dueDate: "Today",
    },
    {
        id: 2,
        title: "Connect FastAPI backend",
        category: "Development",
        priority: "High",
        status: "Pending",
        dueDate: "Tomorrow",
    },
    {
        id: 3,
        title: "Design task management page",
        category: "UI Design",
        priority: "Medium",
        status: "Completed",
        dueDate: "Oct 28",
    },
    {
        id: 4,
        title: "Write project documentation",
        category: "Documentation",
        priority: "Low",
        status: "Pending",
        dueDate: "Nov 02",
    },
];

const statusStyles = {
    "In Progress": "bg-blue-50 text-blue-600",
    Pending: "bg-amber-50 text-amber-600",
    Completed: "bg-emerald-50 text-emerald-600",
};

const priorityStyles = {
    High: "text-rose-600",
    Medium: "text-amber-600",
    Low: "text-slate-500",
};

export default function RecentTasks() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Recent Tasks
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Keep track of your latest activities.
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-violet-600 hover:text-violet-700"
                >
                    View all
                </button>
            </div>

            <div className="space-y-4">
                {recentTasks.map((task) => (
                    <article
                        key={task.id}
                        className="flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                    >
                        <div className="flex min-w-0 items-start gap-3">
                            <div className="mt-1 text-slate-400">
                                {task.status === "Completed" ? (
                                    <FiCheckCircle className="text-emerald-500" size={19} />
                                ) : (
                                    <FiClock size={19} />
                                )}
                            </div>

                            <div className="min-w-0">
                                <h3
                                    className={`truncate text-sm font-semibold ${task.status === "Completed"
                                        ? "text-slate-400 line-through"
                                        : "text-slate-800"
                                        }`}
                                >
                                    {task.title}
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    {task.category} · Due {task.dueDate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pl-8 sm:pl-0">
                            <span
                                className={`text-xs font-semibold ${priorityStyles[task.priority]}`}
                            >
                                {task.priority}
                            </span>

                            <span
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${statusStyles[task.status]}`}
                            >
                                {task.status}
                            </span>

                            <button
                                type="button"
                                aria-label={`More options for ${task.title}`}
                                className="text-slate-400 hover:text-slate-700"
                            >
                                <FiMoreHorizontal size={20} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}