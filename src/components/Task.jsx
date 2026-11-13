function Task({ task, onToggle, onDelete }) {
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
            <button
                type="button"
                className="delete"
                aria-label={`Șterge: ${task.title}`}
                onClick={() => onDelete(task.id)}
            >
                Șterge
            </button>
        </li>
    );
}

export default Task;
