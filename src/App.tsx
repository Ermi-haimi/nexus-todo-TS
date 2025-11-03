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
        <div className=" bg-orange-100 h-screen">
            <h1 className="bg-linear-0 to-orange-300 from-orange-100 p-5 text-5xl font-bold mb-3">Write Your Todo list</h1>
            <div className="max-w-xl flex flex-col items-center  m-auto px-2">
            
            <form onSubmit={handleSubmit} className="flex justify-center m-auto w-full gap-2 -3 border-amber-900">
                <label htmlFor="input" className="hidden">.</label>
            <input type="text" id="input" onChange={handleInput} className="border flex-1 px-1 bg-orange-300"/>
                <button type="submit" className="bg-green-600 px-3 p-1 rounded-md w-17">Add</button>
            </form>
            <ul className="flex justify-center items- flex-col m-auto -3 -blue-900 w-full">
                {todos.map(work => (
                    <li key={work.id} className="flex justify-between max-w p-1 px-3">
                        {work.task}
                        <button onClick={() => { handleDelete(work.id) }} className="bg-red-500 rounded-sm p-1">Delete</button>
                    </li>
                    
                    
                ))}
                </ul>
                </div>
        </div>
    );
}

export default App;