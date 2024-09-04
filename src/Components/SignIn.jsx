import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



const SignIn = () => {
    const navigate = useNavigate();
    const [test, setTest] = useState(false)
    const [resData, setResData] = useState()

    const url = "http://localhost:8080/users"
    
    
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm()

    useEffect(() => {
        axios(url)
        .then(res => {
            setResData(res.data)
        })
    }, [test])

    const onSubmit = (data) => {
        resData.forEach(elem => {
            
            if(data.email === elem.email) {
                if(data.password === elem.password) {
                    setTest(!test)
                    localStorage.setItem("userId", elem.id )
                    localStorage.setItem("token", elem.token )
                    navigate("/Home");
                }
            }
        });

    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 w-100 m-[50px]'>
            <div className="relative">
                <input type="text" {...register("email", {required: 'email'})} placeholder="E-mail or Login" className="inp h-[58px] rounded-lg bg-[#2E3558] w-[350px] p-[50px] text-[20px] text-white"/>

                <img src="/logo/Ellipse.png" alt="" className="absolute top-3 left-1" />
                <img src="/logo/man.png" alt="" className="absolute top-[21px] left-[19px]" />
            </div>
            <div className="relative">
                <input type="text" {...register("password", {required: 'password'})} placeholder="password" className="inp h-[58px] rounded-lg bg-[#2E3558] w-[350px] p-[50px] text-[20px] text-white"/>

                <img src="/logo/Ellipse.png" alt="" className="absolute top-3 left-1" />
                <img src="/logo/zamok.png" alt="" className="absolute top-[21px] left-[19px]" />
            </div>

            <div className="flex justify-center gap-[32px]">
                <button
                    className="btnUp"
                >
                    SIGN UP
                </button>
                <button
                    className="btnIn"
                >
                    SIGN IN
                </button>
            </div>
        </form>
            
    )
}

export default SignIn
