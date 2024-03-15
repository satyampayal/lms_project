import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Home from "../pages/Home";
//import HomeCourses from "../Components/HomeCourses";

function HomeLayout({children}){
    return (
        <main>
        <Header/>
       {children}
        <Footer/>
      
        </main>

    )
}

export default HomeLayout;