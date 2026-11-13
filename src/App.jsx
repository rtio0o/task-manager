import { useState } from "react";
import "./App.css";
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

    function toggleTask(id) {
        setTasks((previousTasks) => previousTasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }

            return task;
        }));
    }

    function deleteTask(id) {
        setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
    }

    return (
        <main>
            <h1>Task Manager</h1>
            <TaskForm onAddTask={addTask} />
            <ul>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                ))}
            </ul>
        </main>
    );
}

export default App;
