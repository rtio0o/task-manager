import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import Task from "./components/Task.jsx";

function App() {
    const [tasks, setTasks] = useState([]);

    function addTask(title) {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            completed: false
        };

        setTasks((previousTasks) => [...previousTasks, newTask]);
    }

    return (
        <main>
            <h1>Task Manager</h1>
            <TaskForm onAddTask={addTask} />
            <ul>
                {tasks.map((task) => <Task key={task.id} task={task} />)}
            </ul>
        </main>
    );
}

export default App;
