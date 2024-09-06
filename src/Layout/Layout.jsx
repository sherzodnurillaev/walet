import { Outlet } from "react-router-dom"
import Nav from "../Components/Nav"

const Layout = () => {

    return (
        <main className="main">
            <nav className="nav">
                <Nav />
            </nav>
            <section className="">
                <header className="w-[100%] h-[50px] ">
                    <div className="flex">
                        <input type="text" placeholder="Search..." 
                        className="bg-[#161245] !px-[7px] h-[30px] rounded-[8px] relative"/>
                    </div>
                    <div className="absolute">
                        <img src="/search.png" alt="" className="" />
                    </div>
                </header>
                <article>
                    <Outlet />
                </article>
            </section>
        </main>
    )
}

export default Layout
