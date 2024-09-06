import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Drop from '../DropDown';
import { Widget } from '../../App';
import axios from 'axios';

const url = "http://localhost:8080/users";

const Add = () => {
    const { widgete, setWidget } = useContext(Widget);
    const [id, setId] = useState();
    const [crypts, setCrypts] = useState({});
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [user, setUser] = useState(null); // для хранения данных пользователя
    const tok = localStorage.getItem("userId");

    useEffect(() => {
        setId(tok);
    }, [tok]);

    useEffect(() => {
        if (id) {
            // Получить текущие данные пользователя
            axios.get(`${url}/${id}`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => {
                    console.error("Error fetching user data:", err);
                });
        }
    }, [id]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const updatedCrypts = { ...data, name: selectedCrypto };
        setCrypts(updatedCrypts);
    };

    useEffect(() => {
        if (user && crypts) {
            const newCrypt = {
                name: selectedCrypto,
                amount: parseFloat(crypts.amount),
                value: parseFloat(crypts.price),
                purchased: [
                    {
                        quantity: parseFloat(crypts.amount),
                        date: new Date().toISOString().split('T')[0] // текущая дата
                    }
                ]
            };

            // Проверка, существует ли уже кошелек с этой криптовалютой
            const existingWallet = user.wallets.find(wallet => wallet.name === selectedCrypto);

            let updatedWallets;

            if (existingWallet) {
                // Обновить существующий кошелек
                updatedWallets = user.wallets.map(wallet => {
                    if (wallet.name === selectedCrypto) {
                        return {
                            ...wallet,
                            amount: wallet.amount + newCrypt.amount,
                            purchased: [
                                ...wallet.purchased,
                                ...newCrypt.purchased
                            ]
                        };
                    }
                    return wallet;
                });
            } else {
                // Добавить новый кошелек
                updatedWallets = [...user.wallets, newCrypt];
            }

            axios.put(`${url}/${id}`, { ...user, wallets: updatedWallets })
                .then(res => console.log("User data updated:", res.data))
                .catch(err => {
                    console.error("Error updating user data:", err);
                });
        }
    }, [crypts]);

    const handleSelect = (name) => {
        setSelectedCrypto(name);
    };

    return (
        <div className="inp_ w-[300px] h-[400px] absolute right-[40%] top-[20%] z-50 rounded-xl">
            <h1 className='my-4 text-white text-[26px] font-bold'>Widget</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col ml-6'>
                  <div className="flex justify-between mr-[25px] items-center">
                    <label className='flex text-white' htmlFor="name">Crypto:</label>
                    <Drop onSelect={handleSelect} />
                  </div>
                    <input
                        className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
                        placeholder='Crypto name'
                        value={widgete ? widgete.name || "" : ""}
                        id="name"
                        {...register("name", { required: "Name is required" })}
                    />
                </div>

                <div className='flex flex-col ml-6'>
                    <label className='flex text-white' htmlFor="amount">Count:</label>
                    <input
                        className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
                        placeholder='Crypto amount'
                        id="amount"
                        type="text"
                        {...register("amount", {
                            required: "Count is required",
                            pattern: {
                                value: /^[0-9]*\.?[0-9]+$/,
                                message: "Invalid count format (use only numbers and decimals)"
                            }
                        })}
                    />
                    {errors.amount && <p>{errors.amount.message}</p>}
                </div>

                <div className='flex flex-col ml-6'>
                    <label className='flex text-white' htmlFor="price">Price:</label>
                    <input
                        className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
                        placeholder='Crypto price'
                        id="price"
                        type="text"
                        value={widgete ? widgete.price || "" : ""}
                        {...register("price", {
                            required: "Price is required",
                            pattern: {
                                value: /^[0-9]*\.?[0-9]+$/,
                                message: "Invalid price format (use only numbers and decimals)"
                            }
                        })}
                    />
                </div>

                <div>
                    <button type="submit" className='bg-white w-[120px] h-[35px] rounded-[8px]'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
