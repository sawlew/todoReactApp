import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage, setLocalStorage } from './utils/local-storage';
import './App.css';
import { TodoLoader } from './components/TodoLoader';
import { TodoList } from './components/TodoList';
import { showConfirmModal } from './utils/showModal';

const todo_ls_name = import.meta.env.VITE_TODO_LOCAL_STORAGE_NAME;
function App() {
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [formError, setFormError] = useState({isError: false,
    errorMessage: null,
    errorType: null,
  });

   const createTodo = () => {
    try{
      if (!todoInput){
        setFormError({
          isError: true,
          errorMessage: "Please provide a todo title",
        });

        setTimeout(() => {
          setFormError({
            isError: false,
            errorMessage: null,
          });
        }, 5000);
        console.log(todos);
      }

      const newTodo = {
        id: uuidv4(),
        title: todoInput,
        created_at: new Date().toLocaleString(),
    };
    
    // check for ls
    const todos = getLocalStorage(todo_ls_name);

    // const todo_db = JSON.parse(localStorage.getItem(DB_NAME)) || [];
    const new_todos = [...todos, newTodo];

    setLocalStorage(todo_ls_name, new_todos);

    //Update the state with the new array of todos
    setTodos(newTodo);

    //Clear the input field
    setTodoInput("");

    } catch(error){
      //Show
    }
    fetchTodos();
  };

  //Delete function
  const handleDelete = (id) => {
    const deleteTodo = () =>{
      const todo_db = getLocalStorage(todo_ls_name);
      const new_todo_db = todo_db.filter((todo) => todo.id !== id);
      setLocalStorage(todo_ls_name, new_todo_db);
      fetchTodos();
    };

    showConfirmModal({
      title: 'Delete Todo!',
      text: 'Do you want to delete this todo?',
      icon: 'warning',
      confirmButtonText: 'Yes!',
      showCancelButton: true,
      cb: deleteTodo,
    });
  };

  const fetchTodos = () => {
    const _todos = getLocalStorage(todo_ls_name);
    setTodos(_todos);
    setTimeout(() => {
      setLoadingTodos(false);
    }, 2000);
      
    
    
  }
    useEffect(() => {
      fetchTodos();
    }, []);
 
  return (
    <div>
        <div>
          <h1 className="text-center text-white text-2xl font-extrabold my-5">MY TODO APP</h1>
          <div className="border w-[90%] h-[100px] mx-auto p-5 rounded-lg bg-white lg:w-1/2">
            <div className="w-full h-[50px] mx-auto gap-2 flex justify-between items-start">
              <input type="text" placeholder="Add a new task" className="border border-blue-300 focus:outline-none focus:ring w-3/4 h-10 rounded p-3 text-blue-500" id="input-panel"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              />
              <button className="cursor-pointer active:bg-blue-500 active:text-white  w-1/4 h-10 rounded bg-blue-500 text-white hover:bg-blue-300" id="btn"
              onClick={createTodo}
              >Add Task</button>
              <button className="cursor-pointer active:bg-blue-500 active:text-white  w-1/4 h-10 rounded bg-blue-500 text-white hover:bg-blue-300 hidden"
              // onClick={updateTodo}
              id="update-btn">Update</button>
            </div>
            {formError.isError && (
              <p className="text-center text-red-500">{formError.errorMessage}</p>
            )}
            
          </div>
          
            <div className="border bg-white w-[90%] lg:w-1/2 min-h-[20%] max-h-[70%] p-5 my-5 mx-auto rounded-lg overflow-y-scroll no-scroll scroll-smooth" id="display-box">
            {loadingTodos ? <TodoLoader /> : <div>
            {!loadingTodos && todos.length === 0 && (
              <p className="text-center pt-5 text-blue-300">Your todos will appear here</p>
              )}
              {todos.map(({title, id, created_at}) => {
                return <TodoList
                title={title}
                id={id}
                created_at={created_at}
                key={`todo-list-${id}`}
                handleDelete={handleDelete}
                />;
              })}
              </div>}
            
            
            </div>
          
          
        </div>

    </div>
  )
}

export default App
