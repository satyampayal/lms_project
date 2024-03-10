import Footer from "../Components/Footer";
import Header from "../Components/Header";
//import HomeCourses from "../Components/HomeCourses";

function HomeLayout({children}){
    return (
        <>
        <Header/>
        {children}
        {/* <HomeCourses/> */}
        <Footer/>
        </>

    )
}

export default HomeLayout;