import { useContext } from "react";
import Form from "../Components/Sign/Form";

const Sign = () => {
    
    return (
        <div className="container">
            <div className="flex w-full h-[100vh] relative">
                
                <div className="flex items-center gap-x-[200px] text-center m-[72px]">
                    <div className="inp_block w-[450px] h-[550px] z-10 rounded-[12px] relative">
                        <h1 className="text-[38px] mt-14 text-white">Welcome!</h1>

                        <div className="">
                            {
                                <Form />
                                
                            }
                        </div>


                        <a href="#" className="text-[#5FB2FF] absolute bottom-[70px] right-[33%]">Forgot your password?</a>
                    </div>
                    <div>
                        <h1 className="valuet text-[72px] font-bold">VALUET</h1>
                        <div className="w-[175px] h-[2px] bg-[#1288E8] ml-[30px] mt-[7px] mb-[18px]"></div>
                        <p className="text-[20px] text-white font-light">Your currency dashboard</p>
                    </div>
                </div>

                <img src="/rotate/one.png" alt="" className="absolute top-[25%] left-6 animate-spin z-20 w-[120px]"/>
                <img src="/rotate/two.png" alt="" className="absolute top-[20%] left-[40%] animate-spin"/>
                <img src="/rotate/three.png" alt="" className="absolute bottom-[14%] right-[36%] animate-spin"/>
                <img src="/reg1.png" alt="" className="absolute bottom-0 right-0 w-[80%]" />
                <img src="/reg2.png" alt="" className="absolute bottom-0" />
            </div>
        </div>
    )
}

export default Sign
