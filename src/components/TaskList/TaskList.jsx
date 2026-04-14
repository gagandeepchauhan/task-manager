import Task from "../Task/Task";
import styles from "./styles.module.css";
import { useDroppable } from "@dnd-kit/core";

export default function TaskList({ status, tasks, onUpdate, onDelete }) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div ref={setNodeRef} className={styles.container}>
            <div className={styles.head}>{status}</div>
            <div className={styles.tasks}>
                {tasks?.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}
