import { useState } from "react";

function TaskForm({ onAddTask }) {
    const [taskName, setTaskName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const title = taskName.trim();

        if (!title) {
            return;
        }

        onAddTask(title);
        setTaskName("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor="task-name">Denumirea sarcinii</label>
            <div className="form-row">
                <input
                    id="task-name"
                    type="text"
                    placeholder="Introdu denumirea sarcinii"
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                    required
                />
                <button type="submit">Adaugă</button>
            </div>
        </form>
    );
}

export default TaskForm;
