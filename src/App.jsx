import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm.jsx";
import Task from "./components/Task.jsx";

const filters = [
    { value: "all", label: "Toate" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Finalizate" }
];

const storageKey = "task-manager-tasks";

function loadTasks() {
    try {
        const savedTasks = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
        if (!Array.isArray(savedTasks)) {
            return [];
        }

        return savedTasks.filter((task) =>
            typeof task?.id === "string"
            && typeof task.title === "string"
            && typeof task.completed === "boolean"
        );
    } catch {
        return [];
    }
}

function App() {
    const [tasks, setTasks] = useState(loadTasks);
    const [storageError, setStorageError] = useState(false);
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

    function saveTasks(nextTasks) {
        setTasks(nextTasks);

        try {
            localStorage.setItem(storageKey, JSON.stringify(nextTasks));
            setStorageError(false);
        } catch {
            setStorageError(true);
        }
    }

    function addTask(title) {
        const newTask = {
            id: crypto.randomUUID(),
            title,
            completed: false
        };

        saveTasks([...tasks, newTask]);
    }

    function toggleTask(id) {
        saveTasks(tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }

            return task;
        }));
    }

    function renameTask(id, title) {
        saveTasks(tasks.map((task) => {
            if (task.id === id) {
                return { ...task, title };
            }

            return task;
        }));
    }

    function deleteTask(id) {
        saveTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <main>
            <h1>Task Manager</h1>
            <div className="stats" aria-live="polite">
                <span>Total sarcini: {tasks.length}</span>
                <span>Finalizate: {completedCount}</span>
            </div>
            <TaskForm onAddTask={addTask} />
            {storageError && (
                <p className="empty" role="status">
                    Sarcinile nu au putut fi salvate în browser.
                </p>
            )}
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
                        onRename={renameTask}
                        onDelete={deleteTask}
                    />
                ))}
            </ul>
        </main>
    );
}

export default App;
