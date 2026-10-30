import { FiCalendar, FiSun } from "react-icons/fi";

export default function WelcomeSection() {
    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-600">
                    <FiSun size={17} />
                    YOUR WORKSPACE
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Welcome back!
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Here's what's happening with your tasks today.
                </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:self-auto">
                <FiCalendar size={17} className="text-violet-600" />
                {formattedDate}
            </div>
        </section>
    );
}