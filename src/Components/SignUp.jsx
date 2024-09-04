import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import generateToken from '../http/Token';

const SignUp = () => {
    const [dataUser, setData] = useState({})
    const [test, setTest] = useState(false)
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const url = "http://localhost:8080/users"

    useEffect(() => {
        axios.get(url)
        .then(res => {
            setData(res.data)
            console.log(res.data);
        })
        console.log(test);
        
    }, [test])
    const token = generateToken()
    console.log(token);
    


    const onSubmit = (data) => {
        
        let status = false
        dataUser.forEach(user => {
            if (user.email === data.email) {
                status = true
            }
            
        });
        if (!status) {
                axios.post(url, {...data, token})
                .then(res => {
                console.log(res);
                setTest(!test)
            })
        }
        
        
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-100 m-[50px]">
                <div className="relative">
                    <input type="text" {...register("name", {required: 'name'})} placeholder="Your name" className="inp h-[45px] rounded-lg bg-[#2E3558] w-[350px] p-[50px] text-[20px] text-white"/>

                    <img src="/logo/Ellipse.png" alt="" className="absolute top-1.5 left-1" />
                    <img src="/logo/name.png" alt="" className="absolute top-[11px] left-[13px] w-[25px]" />
                            </div>
                <div className="relative">
                    <input type="text" {...register("email", {required: 'email'})} placeholder="E-mail or Login" className="inp h-[45px] rounded-lg bg-[#2E3558] w-[350px] p-[50px] text-[20px] text-white"/>

                    <img src="/logo/Ellipse.png" alt="" className="absolute top-1.5 left-1" />
                    <img src="/logo/man.png" alt="" className="absolute top-[15px] left-[19px]" />
                </div>
                <div className="relative">
                    <input type="text" {...register("password", {required: 'passwor'})} placeholder="Your password" className="inp h-[45px] rounded-lg bg-[#2E3558] w-[350px] p-[50px] text-[20px] text-white"/>

                    <img src="/logo/Ellipse.png" alt="" className="absolute top-1.5 left-1" />
                    <img src="/logo/zamok.png" alt="" className="absolute top-[15px] left-[19px]" />
                </div>

                <div className="flex justify-center gap-[32px]">
                <button
                    className="btnIn"
                >
                    SIGN UP
                </button>
                <button
                    className="btnUp"
                >
                    SIGN IN
                </button>
            </div>
            </form>
    )
}

export default SignUp
