import { useEffect, useState } from "react";
import WalletChart from "../Components/ChartWallet";
import Card from "../Components/Home/Card";
import DonutChart from "../Components/PieChart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Diagram from "../Components/Diagram";

const url = "http://localhost:8080/";
const user = "users";
const neew = "news";

const Wallet = () => {
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
        .then((res) => {
          setData(res.data);
          setWallets(res.data.wallets);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [id]);
  useEffect(() => {
    axios(`${url}${neew}`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, []);

  if (!wallets) {
    return <div>Loading...</div>;
  }

  const totalAmount = wallets.reduce(
    (sum, item) => sum + item.amount * item.value,
    0
  );
  return (
    <>
      <div className="!p-[30px]">
        <h1 className="text-white flex text-[18px] mb-[24px]">Wallets</h1>

        <div className="flex gap-4">
          <div className="relative">
            <div className="nav w-[250px] h-[140px] rounded-[8px]">
              <WalletChart />
            </div>
            <div className="absolute top-[40px] left-[55px]">
                <span className="text-[#2D317A] text-[16px]">TOTAL</span>
              <h1 className="text-white text-[18px]">
                {Math.floor(totalAmount)}
              </h1>
            </div>
          </div>
          <div className="w-[750px] overflow-scroll">
            <div className="collor flex gap-[25px]">
              {wallets.map((wallet) => (
                <Card key={wallet.name} wallet={wallet} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-[24px] mt-[24px]">
            <div className="nav w-[650px]">
                <Diagram wallets={wallets}/>
            </div>

            <div className="nav">
                <div className="w-[300px] !px-[20px]">
                    <h1 className="flex my-[12px] text-white">RECENT TRANSACTION</h1>
                    <div className="w-[100%] h-[1px] bg-[#2D317A]"></div>
                </div>
            </div>
        </div>

      </div>
    </>
  );
};

export default Wallet;
