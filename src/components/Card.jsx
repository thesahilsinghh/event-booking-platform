const Card = ({ title, value }) => {
    return (
        <div className="bg-white p-4 rounded shadow w-full sm:w-1/2 lg:w-1/4">
            <h2 className="text-sm text-gray-500">{title}</h2>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

export default Card;
