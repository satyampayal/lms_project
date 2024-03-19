import Footer from "../Components/Footer";
import Header from "../Components/Header";

function HomeLayout({children}){
    return (
        <main className="">
        <Header/>
       {children}
        <Footer/>
      
        </main>

    )
}

export default HomeLayout;