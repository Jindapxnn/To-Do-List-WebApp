'use client';

import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce} from "react-toastify";
import Link from "next/link";
import { confirmAlert } from "react-confirm-alert";

//Create Object
type TodoItem = {
    id: number;
    text: string;
}

export default function Todo() {
    //use useState for config value
    const [data, setData] = useState<TodoItem[]>([]); //use TodoItem
    const [input, setInput] = useState("");
    const [Formvalue, setFormvalue] = useState(false);
    const [editId, setEditId] = useState<number | null>(null); //have number and null value

    // check input can't submit if input is ''
    useEffect(() =>{
        if(input.trim() !== ''){
          setFormvalue(true);
        }else{
          setFormvalue(false);
        }
      },[input]);
    
    //addData function
    const addData = (input: string) => {
        if(Formvalue == false){
            toast.error("กรอกข้อมูลด้วย !!")
            return;
        }
        //case EditData
        if (editId !== null) {
            // แก้ไขข้อมูล
            const updated = data.map(item =>
                item.id === editId ? { ...item, text: input } : item //True (copy old item for config text) : false return old item
            );
            setData(updated);
            toast.success('แก้ไขรายการสำเร็จ!');
            setEditId(null);
            setInput(""); //reset input 
        } else {
            // เพิ่มใหม่
            const newItem: TodoItem = {
                id: Date.now(),
                text: input,
            }
            setData([...data, newItem]); //addData back lastData
            toast.success('เพิ่มรายการสำเร็จ!');
        }
    }

    //get id and find data for edit data 
    const handleEdit = (id: number) => {
        const itemToEdit = data.find(items => items.id === id);
        if(itemToEdit){
            setInput(itemToEdit.text);
            setEditId(id);
        }
    }

    //use cancleEdit data
    const cancleEdit = () => {
        setInput('');
        setEditId(null);
        toast.info('ยกเลิกการแก้ไข');
    }

    //get id and delete
    const handleDelete = (id: number) => {
        confirmAlert({
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบรายการนี้หรือไม่?',
            buttons: [
            {
                label: 'ใช่, ลบเลย',
                onClick: () => {
                setData(data.filter(items => items.id != id));
                toast.error('ลบรายการสำเร็จ');
                }
            },
            {
                label: 'ยกเลิก',
                onClick: () => {
                toast.info('ยกเลิกการลบ');
                }
            }
            ]
        })
    }

    return(
        <>
            <div className="bg-white/50 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md">
                {/* send function and data (props) */}
                <TodoForm onAdd={addData} input={input} setInput={setInput} editId={editId} onCancle={cancleEdit}/>
                <TodoList data={data} onEdit={handleEdit} onDelete={handleDelete}/>
            </div>
            <div className="fixed bottom-4 right-4">
                <div className="flex items-center p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-lg space-x-3">
                    {/* Avatar */}
                    <img
                    src="./profile.jpg"
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                    />

                    {/* Text */}
                    <div className="flex flex-col leading-tight">
                        <p className="text-base font-semibold">Jindapol K.</p>
                        <Link
                            href="https://github.com/Jindapxnn?tab=repositories"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            @Jindapxnn
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="colored"
            transition={Bounce}
            />
        </>
    )
}