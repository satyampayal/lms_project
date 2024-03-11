import HomeLayout from "../layouts/HomeLayout";

function Home() {
    return (
        <HomeLayout>
            <div className="bg-slate-700 text-white  h-[82vh] grid lg:md:grid-cols-2 grid-cols-1 justify-center items-align-center ">
                <div className=" relative top-[30%] left-[30%] text-left">
                    <h1 className="text-[40px] text-red-500 text-left">Our Course Home page </h1>
                    <h3>Motivation line </h3>
                    <p>slide bar animated</p>
                    <div className="flex gap-2 ">
                        <button className='  hover:bg-red-500 hover:text-white transition-all ease-linear duration-300 border-[1px] border-red-300 rounded-lg bg-red-300 text-white p-3 '>Explore course</button>
                        <button className='  hover:bg-red-500 hover:text-white transition-all ease-linear duration-300 border-[1px] border-red-300 rounded-lg bg-red-300 text-white p-3 '>Contact us</button>
                    </div>
                </div>
                <div>
                    <img src="..\src\assets\images\homePageMainImage.png" alt="homeImage" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Home;