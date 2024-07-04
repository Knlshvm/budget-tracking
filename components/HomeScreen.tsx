"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ErorComp from "./ErorComp";
import TableComp from "./TableComp";

export default function HomeScreen() {
  const [expense, setExpense] = useState({
    totalAmount: 0,
    income: 0,
    expense: 0,
    error: false,
  });

  const [errorMsg, seterrorMsg] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: 0,
    type: "positive",
  });

  const [formEntries, setFormEntries] = useState<any>([]);

  const [visible, setVisible] = useState(false);
  const [uniqueId, setuniqueId] = useState<any>([]);

  function handleFromclick(event: any) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]:
        event.target.name === "amount"
          ? Number(event.target.value)
          : event.target.value,
      // [name]:name === "amount" ? Number(value):value,
    }));
  }

  const uuidFromUuidV4 = () => {
    const newUuid:string = uuidv4()
    setuniqueId((prevData:any)=>{
        return[...prevData, newUuid]
    })
  }

  function handleExpensechanges() {
    setExpense((prevState) => {
      if (formData.type === "positive") {
        return {
          ...prevState,
          totalAmount: prevState.totalAmount + formData.amount,
          income: prevState.income + formData.amount,
        };
      } else if (
        formData.type === "negative" &&
        prevState.totalAmount > formData.amount
      ) {
        return {
          ...prevState,
          totalAmount: prevState.totalAmount - formData.amount,
          income: prevState.income - formData.amount,
          expense: prevState.expense + formData.amount,
        };
      } else if (
        formData.type === "negative" &&
        prevState.totalAmount < formData.amount
      ) {
        return {
          ...prevState,
          error: true,
        };
      }
      return prevState;
    });
  }

  function handleSubmit() {
    const { description, type, amount } = formData;

    if (
      description.trim() === "" ||
      amount <= 0 ||
      !["positive", "negative"].includes(type)
    ) {
      return;
    }

    if (type == "negative" && amount > expense.totalAmount) {
      seterrorMsg("Expense cant be more than total budget");
      return;
    }

    uuidFromUuidV4();
    handleExpensechanges();
    setVisible(true);
    // setFormEntries((prev: any) => ({ ...prev, formData }));
    setFormEntries((prevEntries: any) => [...prevEntries, formData]);

    // setFormEntries([...formEntries, formData]);

    // console.log("button");

    setFormData((prevState) => ({
      ...prevState,
      description: "",
      amount: 0,
    }));
  }

  useEffect(() => {}, [expense, formEntries]);

  return (
    <div className="h-screen">
      <div className=" w-full  h-[500px] ">
        {/* <Image
          src="/weather-effects-collage-concept.png"
          alt="weather"
          height={500}
          width={100}
        /> */}
        <div className=" bg-white items-center justify-center flex flex-col mt-8 gap-5">
          <h1 className="font-extrabold text-black">Amount</h1>
          <div className="h-12 w-36 rounded-lg border border-black  items-center justify-center flex ">
            {expense.totalAmount}
          </div>
        </div>
        <div className=" mt-2 h-52  flex items-center justify-center flex-col ">
          <div className="border border-black mt-10 h-16 w-72 rounded-xl bg-green-600 flex items-center justify-between">
            <h1 className="text-white ml-2 mt-5">INCOME</h1>
            <div className="flex items-center justify-between space-x-3">
              <p className="text-white ml-2 mt-5">+</p>
              <div className="text-white mt-5 pr-2">{expense.income}</div>
            </div>
          </div>
          <div className="border border-black mt-10 h-16 w-72 rounded-xl bg-red-600 flex items-center justify-between">
            <h1 className="text-white ml-2 mt-5">EXPENSE</h1>
            <div className="flex items-center justify-between space-x-3">
              <p className="text-white ml-2 mt-5">-</p>
              <div className="text-white mt-5 pr-2">{expense.expense}</div>
            </div>
          </div>
        </div>

        {/* middle-input-container */}
        <div className="h-16 mt-10 bg-gray-400 flex items-center justify-center ">
          <div className="h-12 w-96 flex items-center m-2">
            <div className="border border-slate-600 h-12 w-12 rounded-full mr-2 ">
              <select
                className="bg-slate-400 h-full w-full rounded-full"
                onChange={handleFromclick}
                name="type"
                id="type"
                value={formData.type}
              >
                <option value="positive" className="bg-slate-400">
                  +
                </option>
                <option value="negative" className="bg-slate-400">
                  -
                </option>
              </select>
            </div>
            <div className="h-12 w-96 ">
              <input
                type="text"
                className="h-full w-full rounded-md px-2"
                placeholder="Description"
                onChange={handleFromclick}
                id="description"
                name="description"
                value={formData.description}
              />
            </div>
          </div>
          <div className=" h-12 w-48 ">
            <input
              placeholder="amount"
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              className="h-full w-full rounded-md px-2"
              onChange={handleFromclick}
            />
          </div>
          <button
            className="h-12 w-12 rounded-full border border-slate-400 mx-3"
            onClick={handleSubmit}
          >
            <Image src="/check-mark.png" height={40} width={40} alt="icon" />
          </button>
        </div>
        {/* error-com */}
        <ErorComp errorMsg={errorMsg} />

        {/* exp-inc-com */}
        <div>
          <TableComp
            formEntries={formEntries}
            expense={expense}
            visible={visible}
            uniqueId={uniqueId}
          />
        </div>
      </div>
    </div>
  );
}
