'use client';

import {useState, useEffect} from "react";

//get props from Todo.tsx
type Props ={
  onAdd: (value: string) => void; //this is function for send to Todo.tsx
  input: string;
  setInput: (value: string) => void;
  editId: number | null;
  onCancle: () => void; //this is function not have parameter
};

export default function TodoForm({onAdd, input, setInput, editId, onCancle}: Props) {
  //React.ChangeEvent use for onChange event
  const inputForm = (event : React.ChangeEvent<HTMLInputElement>) =>{
    setInput(event.target.value);
  }

  //React.FormEvent use for onSubmit event
  const handleSubmit = (event: React.FormEvent) =>{
    event.preventDefault(); //protect form reload 
    onAdd(input) //use function for return input
    setInput(''); //reset input
  }

  return (
    <>
      {/* When submit, call handleSubmit function */}
      <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-6 text-center">To-Do List</h1>
          <input
            type="text"
            placeholder="กรอกสิ่งที่ต้องทำ"
            value={input}
            onChange={inputForm} 
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-center mt-5 space-x-3">
            <button 
              type="submit"  
              className={`rounded-md hover:scale-105 text-white duration-300 
                ${editId != null 
                  ? "bg-yellow-400 hover:bg-yellow-500 py-2 px-5"
                  : "bg-blue-500 hover:bg-blue-600 py-2 px-6"
                }`}
            >
              {editId != null ? "แก้ไข" : "เพิ่ม"}
            </button>
            {/* case Edit data, cancle button show */}
            {editId != null && (
              <button 
                type="button" 
                onClick={() => onCancle()}
                className="py-2 px-4 rounded-md hover:scale-105 text-white duration-300 bg-red-500 hover:bg-red-600"
              >
                ยกเลิก
              </button>
            )}
          </div>
          <div className="mt-5 text-lg">
                <h1>เพิ่มล่าสุด</h1>
          </div>
      </form>
    </>
  );
}
