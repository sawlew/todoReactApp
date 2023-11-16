import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLocalStorage } from '../utils/local-storage';
// import { useParams } from 'react-router-dom'

const SingleTodo = () => {
  const { todo_id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const getTodoById = () => {
      const todo_ls_name = import.meta.env.VITE_TODO_LOCAL_STORAGE_NAME;
      const todo_db = getLocalStorage(todo_ls_name);
      const currentTodo = todo_db.find((todo) => todo.id === todo_id);
      setTodo(currentTodo);
    };

    if (todo_id){
      getTodoById();
    }
  }, [todo_id]);
  // console.log(todo);

  if (!todo){
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-blue-500 relative">
        <header>
          <h1 className="py-5 text-center lg:text-3xl md:text-3xl text-xl text-white font-medium">Task Preview</h1>
        </header>
        <main className="w-[90%] lg:w-1/2 mx-auto border p-5 rounded-lg bg-white">
          <Link to="/" className="inline-flex flex items-center gap-2 text-gray-500 hover:text-blue-800 rounded-lg px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span className="text-sm">Back to all Task</span>
          </Link>
          <section className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold break-all">{todo.title}</h3>
              <p id="editDescription" />
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 hover:text-yellow-500 cursor-pointer"
              //  onclick="_handle_edit_mode_()"
               >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </div>
          </section>
          <section className="mt-3">
            <span className="text-sm">Created on</span>
            <span className="text-sm">{todo.created_at}</span>
            <span className="mx-1">↦</span>
            <span className="bg-yellow-700 text-sm px-1 py-0.5 rounded-lg text-white">Pending</span>
          </section>
        </main>
        <div className="hidden absolute top-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-75" id="newTodoPreviewSection">
          <div className="w-[90%] lg:w-1/2 bg-white py-10 px-5 rounded-lg">
            <h1 className="text-3xl font-medium text-center">Edit Todo</h1>
            <div className="flex justify-center items-center gap-2 py-10">
              <input type="text" placeholder="Title" id="newTodoPreview" className="border border-blue-300 focus:outline-none focus:ring w-full h-10 rounded p-3 text-blue-500" />
              <input type="text" placeholder="Description" id="newTodoPreviewDes" className="border border-blue-300 focus:outline-none focus:ring w-full h-10 rounded p-3 text-blue-500" />
            </div>
            <div className="text-center">
              <button className="cursor-pointer active:bg-blue-500 active:text-white  w-1/4 h-10 rounded bg-blue-500 text-white hover:bg-blue-300"
               id="update_task_btn" 
              //  onclick="_update_todo_()"
               >
                Confirm
                </button>
              <button className="cursor-pointer active:bg-blue-500 active:text-white  w-1/4 h-10 rounded bg-blue-500 text-white hover:bg-blue-300"
               id="cancelEdit" 
              //  onclick="_cancelEdit_()"
               >
                Cancel
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SingleTodo