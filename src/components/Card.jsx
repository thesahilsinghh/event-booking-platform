const Card = ({ title, value, icon, bg }) => {
    return (
        <div
            className={`${bg} text-white rounded-xl p-5 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm opacity-80">{title}</p>
                    <h2 className="text-2xl font-bold">{value}</h2>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Card;
