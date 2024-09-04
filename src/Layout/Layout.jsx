import { Outlet } from "react-router-dom"
import Nav from "../Components/Nav"

const Layout = () => {

    return (
        <main className="main">
            <nav className="nav">
                <Nav />
            </nav>
            <section className="">
                <header className="w-[100%] h-[50px] bg-yellow-500"></header>
                <article>
                    <Outlet />
                </article>
            </section>
        </main>
    )
}

export default Layout
