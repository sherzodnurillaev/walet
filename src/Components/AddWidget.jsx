import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Drop from './DropDown';
import { Widget } from '../App';
import axios from 'axios';

const url = "http://localhost:8080/users";
const widget = "widget";

const Add = () => {
    const { widgete, setWidget } = useContext(Widget);
    const [id, setId] = useState();
    const [crypts, setCrypts] = useState({});
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const tok = localStorage.getItem("userId")
  useEffect(() => {
    setId(tok)
  }, [tok])

  console.log(id);
  

    
  

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setCrypts(data)
  };

    useEffect(() => {
        axios.post(`${url}/${id}`, {
            crypts
        })
        .then(res => console.log(res.data))

    }, [crypts])
  

  const handleSelect = (name) => {
    setSelectedCrypto(name);
  };

  return (
    <div className="inp_ w-[300px] h-[400px] absolute right-[40%] top-[20%] z-50 rounded-xl">
      <h1 className='my-4 text-white text-[26px] font-bold'>Widget</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col ml-6'>
          <label className='flex text-white' htmlFor="name">crypt:</label>
          <Drop onSelect={handleSelect} />
          <input
            className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
            placeholder='Crypto name'
            value={widgete ? widgete.name || "" : ""}
            id="name"
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div className='flex flex-col ml-6'>
          <label className='flex text-white' htmlFor="amount">count:</label>
          <input
            className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
            placeholder='Crypto amount'
            id="amount"
            type="text"
            {...register("amount", {
              required: "Count is required",
            })}
          />
          {errors.amount && <p>{errors.amount.message}</p>}
        </div>
        
        <div className='flex flex-col ml-6'>
          <label className='flex text-white' htmlFor="value">price:</label>
          <input
            className='add text-[14px] border-[1px] border-current rounded-md w-[91%] mb-4'
            placeholder='Crypto price'
            id="price"
            type="text"
            value={widgete ? widgete.price || "" : ""}
            {...register("price", {
                required: "Count is required",
              })}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
