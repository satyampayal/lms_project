import Footer from "../Components/Footer";
import Header from "../Components/Header";

function HomeLayout({children}){
    return (
        <>
        <Header/>
        {children}
        <Footer/>
        </>

    )
}

export default HomeLayout;