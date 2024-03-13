import HomeLayout from "../layouts/HomeLayout";

function Home() {
    return (
        <HomeLayout>
            <div className="bg-slate-700 text-white h-[88vh] flex  justify-between items-center  ">
                <div className="flex flex-col justify-between w-[50vw] mx-[20px]">
                  <div className="flex gap-4">
                  <h3 className="font-bold lg:md:text-[30px] text-[19px]"> Upskilling made  </h3>
                    <ul className="font-bold lg:md:text-[30px] text-[19px] w-[33%] text-center h-[40px] overflow-hidden bg-white   transition-all relative animate-slide ">
                        <li className="bg-black mb-1">Practical</li>
                        <li className="bg-black mb-1">Affordable</li>
                        <li className="bg-black">Easy</li>
                    </ul>
                  </div>
                    <div>
                    <p className=" lg:md:text-[16px] text-[13px] text-start  font-bold my-[5px] ">PW Skills is the one-stop destination for your upskilling journey. Brace yourself to find the best job-ready courses and high-end technologies available in the sector. And if that weren't good enough, get the highest quality course content at the most affordable prices!
                        What are we waiting for ? Let's push Start!</p>
                    <div className=" m-[15px]">
                        <button className='  hover:bg-red-400 hover:text-white transition-all ease-linear duration-300 border-[1px] border-red-300 rounded-lg bg-red-500 text-white p-3 '>
                            Explore course</button>
                    </div>
                    </div>
                    
                </div>
                <div className=" lg:md:w-[50vw] w-[70vw] ">
                    <img src="..\src\assets\images\homePageMainImage.png" alt="homeImage" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Home;