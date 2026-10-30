import {
    FiLayers,
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiArrowUpRight,
} from "react-icons/fi";

const stats = [
    {
        title: "Total Tasks",
        value: 24,
        description: "All your tasks",
        icon: FiLayers,
        color: "bg-violet-100 text-violet-600",
    },
    {
        title: "In Progress",
        value: 8,
        description: "Currently working",
        icon: FiClock,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Completed",
        value: 12,
        description: "Successfully finished",
        icon: FiCheckCircle,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "Overdue",
        value: 4,
        description: "Need your attention",
        icon: FiAlertCircle,
        color: "bg-rose-100 text-rose-600",
    },
];

export default function TaskStats() {
    return (
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <article
                        key={stat.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                            >
                                <Icon size={21} />
                            </div>

                            <FiArrowUpRight size={19} className="text-slate-400" />
                        </div>

                        <p className="mt-5 text-sm font-medium text-slate-500">
                            {stat.title}
                        </p>

                        <h2 className="mt-1 text-3xl font-bold text-slate-900">
                            {stat.value}
                        </h2>

                        <p className="mt-2 text-xs text-slate-400">
                            {stat.description}
                        </p>
                    </article>
                );
            })}
        </section>
    );
}