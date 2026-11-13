import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.jsx";
import Task from "./components/Task.jsx";

const filters = [
    { value: "all", label: "Toate" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Finalizate" }
];

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const visibleTasks = tasks.filter((task) => {
        if (filter === "active") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });
    const completedCount = tasks.filter((task) => task.completed).length;

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
            <div className="stats" aria-live="polite">
                <span>Total sarcini: {tasks.length}</span>
                <span>Finalizate: {completedCount}</span>
            </div>
            <TaskForm onAddTask={addTask} />
            <div className="filters" role="group" aria-label="Filtrează sarcinile">
                {filters.map(({ value, label }) => (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={filter === value}
                        onClick={() => setFilter(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {visibleTasks.length === 0 && (
                <p className="empty">
                    {tasks.length === 0
                        ? "Nu există sarcini momentan."
                        : "Nu există sarcini pentru filtrul selectat."}
                </p>
            )}
            <ul>
                {visibleTasks.map((task) => (
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
