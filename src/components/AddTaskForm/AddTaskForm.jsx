import { useEffect, useState } from "react";
import { Status } from "../../types";
import styles from './styles.module.css';

export default function AddTaskForm({ initialValues, onAdd, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        content: "",
        status: Status.TODO,
        assignee: "",
        assigned_to: "",
        date: "",
        ...initialValues
    });

    useEffect(() => {
        setForm({
            title: "",
            content: "",
            status: Status.TODO,
            assignee: "",
            assigned_to: "",
            date: "",
            ...initialValues
        })
    }, [initialValues]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title) return alert("Title is required");


        onAdd(form);


        setForm({
            title: "",
            content: "",
            status: Status.TODO,
            assignee: "",
            assigned_to: "",
            date: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.taskForm}>
            <input
                name="title"
                placeholder="Task title"
                value={form.title}
                onChange={handleChange}
                autoFocus
            />

            <textarea
                name="content"
                placeholder="Description"
                value={form.content}
                onChange={handleChange}
            />

            <select name="status" value={form.status} onChange={handleChange}>
                {Object.values(Status).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <input
                name="assignee"
                placeholder="Assignee"
                value={form.assignee}
                onChange={handleChange}
            />

            <input
                name="assigned_to"
                placeholder="Assigned To"
                value={form.assigned_to}
                onChange={handleChange}
            />

            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
            />

            <button type="submit">Add Task</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}