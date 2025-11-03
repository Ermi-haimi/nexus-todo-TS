import { useState } from "react";

type Todo = {
    id: number;
    task: string
}

function App() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState<string>("");

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (task.trim().length === 0) {
            alert("Please write a todo");
            return;
        }

        const todo: Todo = {
            id: Date.now(),
            task: task.trim()
        }

        setTodos([todo, ...todos]);
        setTask("");
        
    }

    function handleDelete(id: number) {
        const newTodos = todos.filter(work => work.id !== id);
        setTodos(newTodos)
        
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleInput}/>
                <button type="submit" >Add</button>
            </form>
            <ul>
                {todos.map(work => (
                    <li key={work.id}>
                        {work.task}
                        <button onClick={() => { handleDelete(work.id) }}>Delete</button>
                    </li>
                    
                    
                ))}
            </ul>
        </div>
    );
}

export default App;