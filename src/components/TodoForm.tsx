import React from 'react'
import "./TodoForm.css";
import { useState } from 'react';
interface TodoFormProps {
  onAddTodo: (text: string,date:string) => void;
}
function TodoForm({onAddTodo}:TodoFormProps) {
    const [whatTyping,setTyping]=useState('')
const [date, setDate] = useState("");
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!whatTyping.trim()) return;
    onAddTodo(whatTyping,date);
setTyping("");
setDate("");
  // Later:
  // Add the todo
  // Clear the input
};

  return (
    
   <form
   onSubmit={handleSubmit}
   className='todo-form'>

<input
className='todo-input'
type='text'
placeholder='enter a task'
onChange={(e)=>setTyping(e.target.value)}
value={whatTyping}
/>
<input
  className="date-input"
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
<button className='add-btn'
>
Add
</button>

   </form >
   
  )
}

export default TodoForm
