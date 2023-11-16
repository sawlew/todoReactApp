import { Route, Routes } from "react-router-dom";
import TodoDashboard from "./pages/TodoDashboard";
import SingleTodo from "./pages/SingleTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoDashboard />} />
      <Route path="/todo/:todo_id" element={<SingleTodo />} />
    </Routes>
  )

}

export default App
