import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

const Dashboard = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-gray-100 min-h-screen">
                <Header />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card title="Users" value="1,024" />
                    <Card title="Orders" value="856" />
                    <Card title="Revenue" value="$12,300" />
                    <Card title="Visitors" value="2,300" />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
