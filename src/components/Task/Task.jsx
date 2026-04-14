import styles from "./styles.module.css";
import { useDraggable } from "@dnd-kit/core";

export default function Task({ task, onUpdate, onDelete }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
        activationConstraint: {
            distance: 5,
        },
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        padding: "10px",
        margin: "5px",
        // background: "white",
        // border: "1px solid black",
        // cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style}
            className={styles.taskDiv}
        >
            <div
                {...listeners}
                {...attributes}
                style={{ cursor: "grab", marginBottom: "5px" }}
            >
                ⠿ Drag
            </div>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.content}>{task.content}</div>
            <p className={styles.content}>{new Date(task.date).toDateString()}</p>
            <div>
                <small>Assignee : {task.assignee}</small><br />
                <small>Assigned to : {task.assigned_to}</small>
            </div>
            <div className={styles.actions}>
                <button style={{ color: '#1096d9' }} onClick={(e) => {
                    e.stopPropagation();
                    onUpdate(task)
                }}>Edit</button>
                <button style={{ color: 'red' }} onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task.id)
                }}>Delete</button>
            </div>
        </div>
    );
}
