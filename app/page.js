
'use client'
import { useEffect, useState } from "react";
import Todo from "@/components/Todo";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [todos, setTodos] = useState([]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form => ({ ...form, [name]: value }))
    console.log(formData)
  }

  const updateTodo = async (mongoId) => {
    const response = await axios.put('/api', {}, {
      params: {
        mongoId: mongoId
      }
    })
    toast.success(response.data.msg);
    fetchTodos();
  }

  const deleteTodo = async (mongoId) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: mongoId
      }

    }

    )
    toast.success(response.data.msg)
    fetchTodos();
  }
  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api', formData)
      toast.success(response.data.msg)
      setFormData({
        title: '',
        description: ''
      })
      await fetchTodos()
    } catch (e) {
      console.log(e)
    }
  }

  const fetchTodos = async () => {
    const response = await axios.get('/api')
    setTodos(response.data.todos);
    console.log(response.data.todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <>
      <ToastContainer autoClose={3000} />
      <form onSubmit={onSubmitForm} className="mx-auto w-[80%] max-w-[600px] px-2 flex items-start mt-24 flex-col">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="enter todo" className="px-3 py-3 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="enter description" className="border-2 w-full mt-4 px-2 py-2"></textarea>
        <button type="submit" className="bg-orange-500 px-12 py-2  mt-2">Add Todo</button>
      </form>


      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status              </th>
              <th scope="col" className="px-6 py-3">
                Action              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item, index) => {
              return <Todo key={index} id={index + 1} title={item.title} description={item.description} completed={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            })}

          </tbody>
        </table>
      </div>

    </>
  );
}
