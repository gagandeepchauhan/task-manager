import { useState, useMemo, useEffect, useCallback } from "react";
import { addTask, deleteTask, getTasks, updateTask } from "./api-manager";
import TaskList from "./components/TaskList";
import "./styles.css";
import { DndContext } from "@dnd-kit/core";
import { Status } from "./types";
import AddTaskForm from "./components/AddTaskForm";

export default function App() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [operationTask, setOperationTask] = useState();

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Update UI
    setAllTasks((prev) => {
      return prev.map((t) => {
        return t.id === taskId ? { ...t, status: newStatus } : t
      })
    });

    try {
      const current = allTasks.find((t) => t.id === taskId);
      await updateTask(taskId, { ...current, status: newStatus });
    } catch (err) {
      alert(err);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await getTasks();
      setAllTasks(tasks);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const groupedTasks = useMemo(() => {
    let grpTasks = {
      [Status.TODO]: [],
      [Status.IN_PROGRESS]: [],
      [Status.REVIEW]: [],
      [Status.COMPLETED]: []
    };
    allTasks.forEach((t) => {
      grpTasks[t.status] = grpTasks[t.status]
        ? [...grpTasks[t.status], t]
        : [t];
    });
    return grpTasks;
  }, [allTasks]);

  const handleAddTask = async (task) => {
    const newTask = { ...task, id: Date.now() };

    setAllTasks((prev) => [...prev, newTask]);

    try {
      await addTask(task);
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdateTask = async (task) => {

    setAllTasks((prev) => prev.map((t) => {
      return t.id === task.id ? { ...task } : { ...t };
    }));

    try {
      await updateTask(task.id, task);
    } catch (err) {
      alert(err);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");

    if (!confirm) return;

    setAllTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTask(id);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOperationTask(undefined);
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <AddTaskForm
              initialValues={operationTask}
              onAdd={(task) => {
                operationTask ? handleUpdateTask(task) : handleAddTask(task);
                setShowModal(false);
                setOperationTask(undefined);
              }}
              onCancel={() => {
                setOperationTask(undefined);
                setShowModal(false)
              }
              }
            />
          </div>
        </div>
      )}
      <div className="App">
        <h1>Task management</h1>
        <h3>Here you can manage your tasks</h3>
        <button className="add-btn" onClick={() => {
          setOperationTask(undefined);
          setShowModal(true)
        }
        }>
          + Add Task
        </button>
        {loading && <p>
          Loading...
        </p>}
        <div className="taskContainerGroup">
          {Object.keys(groupedTasks)?.map((status) => (
            <TaskList
              key={status}
              status={status}
              tasks={groupedTasks?.[status]}
              onUpdate={(task) => {
                setOperationTask(task);
                setShowModal(true);
              }}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>


      </div>
    </DndContext>
  );
}
