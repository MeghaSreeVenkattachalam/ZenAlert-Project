import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/TaskManager.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskManager = () => {

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [reminder, setReminder] = useState("");

  // ✅ NEW: prevent repeated toast
  const [notifiedTasks, setNotifiedTasks] = useState([]);

  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("User parse error", err);
  }

  // ✅ FETCH TASKS
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:8080/api/tasks/${user.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [user?.email]);

  // ✅ FIXED REMINDER LOGIC (NO REPEAT 🔥)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (
          task.reminder &&
          new Date(task.reminder) <= now &&
          !task.completed &&
          !notifiedTasks.includes(task.id)   // ✅ prevents repeat
        ) {
          toast.info(`⏰ Reminder: "${task.title}" is due!`);

          setNotifiedTasks((prev) => [...prev, task.id]); // ✅ mark as shown
        }
      });
    }, 60000);

    return () => clearInterval(timer);
  }, [tasks, notifiedTasks]);

  // ✅ ADD TASK
  const addTask = async () => {
    if (!taskTitle.trim() || !dueDate) {
      toast.error("⚠️ Title & Due Date required");
      return;
    }

    const newTask = {
      email: user.email,
      title: taskTitle.trim(),
      priority,
      dueDate,
      reminder,
      completed: false,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/tasks",
        newTask
      );

      setTasks([...tasks, res.data]);
      toast.success("✅ Task added");

      setTaskTitle("");
      setDueDate("");
      setPriority("Medium");
      setReminder("");
    } catch (err) {
      console.error(err);
      toast.error("Error adding task");
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      toast.warning("🗑️ Task deleted");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ✅ TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };

      const res = await axios.put(
        `http://localhost:8080/api/tasks/${task.id}`,
        updated
      );

      setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-container">
      <h2>🚀 Task Manager</h2>

      {/* FORM */}
      <div className="task-form">

        <label>📝 Task Title</label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task"
        />

        <label>📅 Due Date</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>🚦 Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🟢 Low</option>
        </select>

        <label>⏰ Reminder</label>
        <input
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />

        <button onClick={addTask}>➕ Add Task</button>
      </div>

      {/* TASK LIST */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>🎉 No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.priority.toLowerCase()}`}
            >
              <h3 style={{
                textDecoration: task.completed ? "line-through" : "none"
              }}>
                {task.title}
              </h3>

              <p>📅 {new Date(task.dueDate).toLocaleString()}</p>
              <p>🚀 {task.priority}</p>

              {task.reminder && (
                <p>🔔 {new Date(task.reminder).toLocaleString()}</p>
              )}

              <div className="task-actions">
                <button onClick={() => toggleComplete(task)}>
                  {task.completed ? "✅ Done" : "✔ Mark Done"}
                </button>

                <button onClick={() => deleteTask(task.id)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default TaskManager;