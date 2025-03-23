'use client';

import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Checkbox} from "@heroui/checkbox";

//Create Object
type TodoItem = {
  id: number;
  text: string;
}

//props
type Props = {
    data: TodoItem[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

export default function TodoList({data, onEdit, onDelete}: Props) {

    return(
        <>
            {/* map data show in website and return id for Edit and Delete data */}
            <ul className="mt-5">
              {data.map((items) =>{
                return (
                  <li key={items.id}className="mt-5 bg-white p-4 rounded-xl flex justify-between items-center">
                    {/* Left section */}
                    <div className="flex items-center space-x-3">
                      <span className="pl-1 font-medium text-lg">{items.text}</span>
                    </div>
                    {/* Right section */}
                    <div className="space-x-3">
                        <button 
                        type="submit" 
                        onClick={() => onEdit(items.id)}
                        className="bg-yellow-300 p-1 text-white text-lg rounded-lg hover:bg-yellow-400 hover:scale-105 duration-300"
                        >
                        แก้ไข
                        </button>
                        <button 
                        type="submit" 
                        onClick={() => onDelete(items.id)}
                        className="bg-red-500 p-1 px-3 text-white text-lg rounded-lg hover:bg-red-600 hover:scale-105 duration-300"
                        >ลบ
                        </button>
                    </div>
                  </li>
                )
              })}
            </ul>
        </>
    )
}