import Footer from "../Components/Footer";
import Header from "../Components/Header";
import CourseList from "../pages/Course/CourseList";

function HomeLayout({children}){
    return (
        <main className="">
        <Header/>
       {children}
       <CourseList/>
        <Footer/>
      
        </main>

    )
}

export default HomeLayout;