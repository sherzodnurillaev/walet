import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from '../Components/PieChart';
import LineChart from '../Components/LineChart';
import Card from '../Components/Card';
import Market from '../Components/Market';
import Handle from '../Components/HandleBtn';
import Add from '../Components/AddWidget';

const url = "http://localhost:8080/";
const user = "users"
const neew = "news"

const Home = () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [data, setData] = useState(null); 
    const [wallets, setWallets] = useState(null);
    const [news, setNews] = useState([]);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (token === null) {
            localStorage.clear();
            navigate("/");
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id) {
            axios(`${url}${user}/${id}`)
                .then(res => {
                    setData(res.data);
                    setWallets(res.data.wallets)
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                });
        }
    }, [id]);
    useEffect(() => {
        axios(`${url}${neew}`)
        .then(res => {
            setNews(res.data);
            console.log(news);
        })
        .catch(err => {
            console.error('Error fetching user data:', err);
        });
    }, [])

    if (!wallets) {
        return <div>Loading...</div>;
    }
    
    const totalAmount = wallets.reduce((sum, item) => sum + (item.amount * item.value), 0);

    return (
        <div className='relative mx-5 mt-5'>
            {/* Модальный окно ин */}
            {add && <Add />}
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <h1 className='text-white text-[18px]'>Overview</h1>
                    <span className='text-[#54669C] text-[14px]'>25 October, Sunday</span>
                </div>
                <button onClick={() => setAdd(!add)} className='widget'>Add widget</button>
            </div>
            <div className="flex gap-[16px] mt-6">
                <div className="nav w-[208px] h-[296px] rounded-[8px]">
                    <h1 className='flex m-3 text-white'>Balance</h1>
                    <div>
                        <PieChart />
                    </div>
                </div>
                <div className="nav w-[208px] h-[296px]">
                    <div className="flex justify-between m-3">
                        <h1 className='text-white'>Spending</h1>
                        <span className='text-white'>January</span>
                    </div>
                    <div>
                        <h1 className='text-white flex ml-4'>$ {totalAmount}</h1>
                    </div>
                    <LineChart />
                </div>
                <div className="collor grid grid-cols-2 gap-[16px]">
                    {
                        wallets.map((wallet) => (
                            <Card key={wallet.name} wallet={wallet} />
                        ))
                    }
                </div>
            </div>
            <div className=" flex gap-[17px] mt-[20px]">
                <div className="nav w-[660px] h-[230px]">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4 mx-[24px] my-[16px]">
                            <h1 className='text-white text-[14px]'>Market</h1>
                            <Handle wallets={wallets} />
                        </div>
                        <span className='text-white text-[14px] mx-[24px] my-[16px]'>November</span>
                    </div>

                    <div className="">
                        <Market wallets={wallets} /> 
                    </div>
                </div>
                <div>
                    <div className="nav relative w-[285px] h-[230px] rounded-[8px]">
                        <h1 className='text-white'>Recent news</h1>
                        <hr className='mb-3' />
                        <div className="overflow-scroll h-[190px] text-left pb-2">
                            <div className="h-7 w-[280px] flex gap-4 items-center">
                                <div className="w-[100px]">

                                {
                                    news.map((newsItem, index) => (
                                        <h1 className='text-white text-[14px]' key={index}>{newsItem.date}</h1>
                                    ))
                                }
                                </div>
                                <div className="">
                                {
                                    news.map((newsItem, index) => (
                                        <h1 className='text-white text-[14px]' key={index}>{newsItem.title}</h1>
                                    ))
                                }
                                </div>
                            </div>                                   
                    
                        </div>
                        <div className="absolute bottom-0 w-[285px] h-[30px] backdrop-opacity-10 backdrop-invert #5523DD66/20 "></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
