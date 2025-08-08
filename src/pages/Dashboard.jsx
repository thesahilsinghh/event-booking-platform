import { FaUsers, FaShoppingCart, FaDollarSign, FaChartLine } from "react-icons/fa";
import Card from "../components/Card";

const Dashboard = () => {
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
                title="Users"
                value="1,024"
                icon={<FaUsers className="text-white text-3xl" />}
                bg="bg-gradient-to-r from-blue-500 to-blue-700"
            />
            <Card
                title="Orders"
                value="856"
                icon={<FaShoppingCart className="text-white text-3xl" />}
                bg="bg-gradient-to-r from-green-500 to-green-700"
            />
            <Card
                title="Revenue"
                value="$12,300"
                icon={<FaDollarSign className="text-white text-3xl" />}
                bg="bg-gradient-to-r from-yellow-500 to-yellow-700"
            />
            <Card
                title="Visitors"
                value="2,300"
                icon={<FaChartLine className="text-white text-3xl" />}
                bg="bg-gradient-to-r from-purple-500 to-purple-700"
            />
        </div>
    );
};

export default Dashboard;
