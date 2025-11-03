import { useEffect, useState } from "react";

type Todo = {
    id: number;
    task: string
}

function App() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [task, setTask] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedTodo = localStorage.getItem("savedTodos");
        if (savedTodo) {
            setTodos(JSON.parse(savedTodo))
        }
        setIsLoaded(true);
    }, [])
    

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("savedTodos", JSON.stringify(todos)) 
            
        };
    }, [todos, isLoaded])
    
    

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
                <label htmlFor="input">.</label>
            <input type="text" id="input" onChange={handleInput}/>
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