import { useState } from "react";

function Task({ task, onToggle, onRename, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState("");

    function startEditing() {
        setDraft(task.title);
        setIsEditing(true);
    }

    function saveTitle(event) {
        event.preventDefault();
        const title = draft.trim();

        if (!title) {
            return;
        }

        onRename(task.id, title);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <li className="task">
                <form className="form-row task-edit" onSubmit={saveTitle}>
                    <input
                        type="text"
                        aria-label="Noua denumire a sarcinii"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        autoFocus
                        required
                    />
                    <button type="submit" disabled={!draft.trim()}>Salvează</button>
                    <button
                        type="button"
                        className="secondary"
                        onClick={() => setIsEditing(false)}
                    >
                        Anulează
                    </button>
                </form>
            </li>
        );
    }

    return (
        <li className="task">
            <label className={task.completed ? "completed" : ""}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <span>{task.title}</span>
            </label>
            <div className="task-actions">
                <button
                    type="button"
                    className="secondary"
                    aria-label={`Editează: ${task.title}`}
                    onClick={startEditing}
                >
                    Editează
                </button>
                <button
                    type="button"
                    className="delete"
                    aria-label={`Șterge: ${task.title}`}
                    onClick={() => onDelete(task.id)}
                >
                    Șterge
                </button>
            </div>
        </li>
    );
}

export default Task;
