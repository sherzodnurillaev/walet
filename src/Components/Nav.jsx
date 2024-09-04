import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:8080/users";

const Nav = () => {
    const id = localStorage.getItem("userId");

    const [data, setData] = useState({});
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        axios(`${url}/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
            });
    }, [id]);

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="relative h-screen">
            <img src="/logo/valuet.png" alt="" className="w-[155px] ml-[50px] mt-[21px]" />
            
            <div className="ml-[25px] mt-[40px] flex flex-col gap-4">
                <div
                    onClick={() => handleClick("overview")}
                    className={`flex items-center gap-4 cursor-pointer ${activeTab === "overview" ? "active" : ""}`}
                >
                    <img src="/nav/overviev.png" alt="" className="w-[24px]" />
                    <span className="text-white">Overview</span>
                </div>
                <div
                    onClick={() => handleClick("wallets")}
                    className={`flex items-center gap-4 cursor-pointer ${activeTab === "wallets" ? "active" : ""}`}
                >
                    <img src="/nav/overviev.png" alt="" className="w-[24px]" />
                    <span className="text-white">Wallets</span>
                </div>
                <div
                    onClick={() => handleClick("transictions")}
                    className={`flex items-center gap-4 cursor-pointer ${activeTab === "transictions" ? "active" : ""}`}
                >
                    <img src="/nav/overviev.png" alt="" className="w-[24px]" />
                    <span className="text-white">Transictions</span>
                </div>
                <div
                    onClick={() => handleClick("exchange")}
                    className={`flex items-center gap-4 cursor-pointer ${activeTab === "exchange" ? "active" : ""}`}
                >
                    <img src="/nav/overviev.png" alt="" className="w-[24px]" />
                    <span className="text-white">Exchange</span>
                </div>
            </div>

            <div className="absolute bottom-[0px] left-[25px] w-[200px]">
                <div className="w-[200px] h-[2px] bg-[#018FFF]"></div>
                <div className="flex items-center gap-4 mt-[26px]">
                    <img src="/logo/Ellipse.png" alt="" />
                    <span className="text-[#616A8B] text-[20px]">{data.name}</span>
                </div>

                <Link to="/" >
                    <div onClick={logout} className="flex items-center gap-[27px] ml-2 mt-[26px] mb-[42px] cursor-pointer">
                        <img src="/logo/Out.png" alt="" className="w-[25px]" />
                        <span className="text-[#616A8B] text-[20px]">Log Out</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

function logout() {
    localStorage.clear();
}

export default Nav;
