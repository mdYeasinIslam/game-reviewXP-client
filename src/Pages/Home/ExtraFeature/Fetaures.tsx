
const Fetaures = () => {
    return (
        <div className="max-w-6xl md:mx-5 xl:mx-auto my-20 bg-gray-800 text-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-4   overflow-hidden">
            <div className="md:col-span-2">
                <img
                    src="/images/feature.webp"
                    alt="Gaming Trends"
                    className="h-[20rem] md:h-[24rem] lg:h-[30rem] w-full"
                />
            </div>
            <div className="md:col-span-2 p-5 flex flex-col justify-center gap-5">
                <h3 className="text-2xl font-bold mb-3 text-yellow-400 ">
                    Discover the Latest Gaming Trends
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                    Explore the future of gaming with insights into trending genres,
                    cutting-edge technologies, and the most anticipated releases.
                    Stay updated and elevate your gaming experience!
                </p>

                <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                        RPG
                    </span>
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                        Action
                    </span>
                    <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full">
                        Strategy
                    </span>
                    <span className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full">
                        Adventure
                    </span>
                    <span className="bg-lime-500 text-white text-sm px-3 py-1 rounded-full">
                        Battle Royal
                    </span>
                    <span className="bg-cyan-500 text-white text-sm px-3 py-1 rounded-full">
                       Survival
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Fetaures;