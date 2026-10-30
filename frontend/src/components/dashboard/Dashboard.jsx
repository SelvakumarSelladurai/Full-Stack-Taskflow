import WelcomeSection from "./WelcomeSection";
import TaskStats from "./TaskStats";
import ProductivityCard from "./ProductivityCard";
import RecentTasks from "./RecentTasks";

export default function Dashboard() {
    return (
        <div className="mx-auto max-w-7xl">
            <WelcomeSection />

            <TaskStats />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <div className="xl:col-span-2">
                    <ProductivityCard />
                </div>

                <div className="xl:col-span-3">
                    <RecentTasks />
                </div>
            </div>
        </div>
    );
}