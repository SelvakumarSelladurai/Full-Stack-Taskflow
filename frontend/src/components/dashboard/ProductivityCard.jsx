import { FiTrendingUp, FiTarget } from "react-icons/fi";

export default function ProductivityCard() {
    const completed = 12;
    const total = 24;
    const percentage = Math.round((completed / total) * 100);

    return (
        <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-violet-300">
                        <FiTrendingUp size={17} />
                        Productivity
                    </div>

                    <h2 className="mt-3 text-2xl font-bold">
                        You're making progress!
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Keep going. Every completed task counts.
                    </p>
                </div>

                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300 sm:flex">
                    <FiTarget size={29} />
                </div>
            </div>

            <div className="mt-8">
                <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Overall task completion</span>
                    <span className="font-semibold text-white">{percentage}%</span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                        className="h-full rounded-full bg-violet-500 transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                    {completed} out of {total} tasks completed
                </p>
            </div>
        </section>
    );
}