
import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  CheckCheck,
  Circle,
  CircleCheck,
  Clock3,
  LayoutDashboard,
  ListTodo,
  LoaderCircle,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

const filters = [
  { id: "all", label: "All tasks", icon: ListTodo },
  { id: "pending", label: "In progress", icon: Clock3 },
  { id: "completed", label: "Completed", icon: CircleCheck },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || "Something went wrong.");
    }

    if (response.status === 204) return null;
    return response.json();
  }

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await request("/tasks");
      setTasks(data);
    } catch (err) {
      setError(
        `${err.message} Check that your FastAPI server is running at ${API_URL}.`
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "pending" && !task.completed) ||
        (activeFilter === "completed" && task.completed);

      const query = search.trim().toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, search]);

  async function createTask(event) {
    event.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const task = await request("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
        }),
      });

      setTasks((current) => [task, ...current]);
      setTitle("");
      setDescription("");
      setShowForm(false);
      setActiveFilter("all");
      setNotice("Task created successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleTask(task) {
    setError("");
    setNotice("");

    try {
      const updated = await request(`/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !task.completed }),
      });

      setTasks((current) =>
        current.map((item) => (item.id === task.id ? updated : item))
      );
      setNotice(updated.completed ? "Task completed." : "Task reopened.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTask(task) {
    if (!window.confirm(`Delete "${task.title}"?`)) return;

    setError("");
    setNotice("");

    try {
      await request(`/tasks/${task.id}`, { method: "DELETE" });
      setTasks((current) => current.filter((item) => item.id !== task.id));
      setNotice("Task deleted.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon"><CheckCheck size={23} /></span>
          <span>TaskFlow<span className="brand-dot">.</span></span>
        </a>

        <p className="nav-label">WORKSPACE</p>

        <nav className="navigation">
          <button
            className="nav-item active"
            onClick={() => setActiveFilter("all")}
          >
            <LayoutDashboard size={19} /> Overview
          </button>

          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeFilter === id && id !== "all" ? "selected" : ""}`}
              onClick={() => setActiveFilter(id)}
            >
              <Icon size={19} /> {label}
              <span className="nav-count">
                {id === "all"
                  ? tasks.length
                  : id === "pending"
                    ? pendingCount
                    : completedCount}
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="focus-card">
            <span className="focus-icon"><Sparkles size={18} /></span>
            <p className="focus-title">Stay focused</p>
            <p className="focus-text">Small steps lead to big achievements.</p>
            <div className="progress-track">
              <div className="progress-value" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-caption">{progress}% of tasks completed</p>
          </div>

          <div className="profile">
            <div className="avatar">S</div>
            <div className="profile-info">
              <strong>My Workspace</strong>
              <span>Personal account</span>
            </div>
            <LogOut size={17} className="profile-icon" />
          </div>
        </div>
      </aside>

      <main className="main-content" id="home">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span><span>/</span><strong>Overview</strong>
          </div>
          <div className="topbar-actions">
            <span className="today-label">
              <Activity size={16} /> Your productivity space
            </span>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <div className="avatar small-avatar">S</div>
          </div>
        </header>

        <section className="dashboard">
          <div className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={15} /> YOUR PERSONAL WORKSPACE</div>
              <h1>Good work starts here<span className="heading-dot">.</span></h1>
              <p className="welcome-subtitle">
                Organize your tasks. Focus on what matters.
              </p>
            </div>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              <Plus size={19} /> New task
            </button>
          </div>

          {error && (
            <div className="alert error-alert">
              <span>{error}</span>
              <button onClick={() => setError("")} aria-label="Dismiss error">
                <X size={17} />
              </button>
            </div>
          )}

          {notice && (
            <div className="alert success-alert">
              <Check size={17} /> {notice}
              <button onClick={() => setNotice("")} aria-label="Dismiss message">
                <X size={17} />
              </button>
            </div>
          )}

          <div className="stats-grid">
            <StatCard
              label="Total tasks"
              value={tasks.length}
              detail="All your tasks in one place"
              icon={ListTodo}
              color="violet"
            />
            <StatCard
              label="In progress"
              value={pendingCount}
              detail="Things still to do"
              icon={Clock3}
              color="blue"
            />
            <StatCard
              label="Completed"
              value={completedCount}
              detail="Tasks you've finished"
              icon={CircleCheck}
              color="green"
            />
          </div>

          <section className="tasks-panel">
            <div className="panel-header">
              <div>
                <h2>Your tasks</h2>
                <p>Keep moving forward, one task at a time.</p>
              </div>
              <span className="task-total">{visibleTasks.length} tasks</span>
            </div>

            <div className="task-toolbar">
              <div className="filter-tabs">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`filter-tab ${activeFilter === filter.id ? "active-tab" : ""}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <label className="search-box">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tasks..."
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    type="button"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>

            {showForm && (
              <form className="create-form" onSubmit={createTask}>
                <div className="form-heading">
                  <h3>Create a task</h3>
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setShowForm(false)}
                    aria-label="Close form"
                  >
                    <X size={18} />
                  </button>
                </div>
                <label>
                  Task title
                  <input
                    autoFocus
                    required
                    maxLength={200}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="What do you need to do?"
                  />
                </label>
                <label>
                  Description <span className="optional-label">Optional</span>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Add a few details..."
                  />
                </label>
                <div className="form-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button className="primary-button" disabled={saving}>
                    {saving && <LoaderCircle size={17} className="spin" />}
                    <Plus size={17} /> Create task
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <div className="empty-state">
                <LoaderCircle size={27} className="spin" />
                <p>Loading your tasks...</p>
              </div>
            ) : visibleTasks.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">
                  <ListTodo size={27} />
                </span>
                <h3>{search ? "No matching tasks" : "A fresh start"}</h3>
                <p>
                  {search
                    ? "Try a different search term."
                    : activeFilter === "completed"
                      ? "Completed tasks will appear here."
                      : activeFilter === "pending"
                        ? "You're all caught up. Nice work!"
                        : "Create your first task and get things moving."}
                </p>
                {!search && activeFilter === "all" && (
                  <button className="primary-button" onClick={() => setShowForm(true)}>
                    <Plus size={17} /> Create your first task
                  </button>
                )}
              </div>
            ) : (
              <div className="task-list">
                {visibleTasks.map((task) => (
                  <article
                    className={`task-row ${task.completed ? "task-completed" : ""}`}
                    key={task.id}
                  >
                    <button
                      className={`task-check ${task.completed ? "checked" : ""}`}
                      onClick={() => toggleTask(task)}
                      aria-label={task.completed ? "Reopen task" : "Complete task"}
                    >
                      {task.completed ? <Check size={16} /> : <Circle size={21} />}
                    </button>

                    <div className="task-content">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      <div className="task-meta">
                        <span className={`status-pill ${task.completed ? "done-pill" : "pending-pill"}`}>
                          {task.completed ? (
                            <><Check size={12} /> Completed</>
                          ) : (
                            <><Clock3 size={12} /> In progress</>
                          )}
                        </span>
                        <span className="task-id">Task #{task.id}</span>
                      </div>
                    </div>

                    <div className="task-actions">
                      <button
                        className="icon-button delete-button"
                        onClick={() => deleteTask(task)}
                        aria-label={`Delete ${task.title}`}
                        title="Delete task"
                      >
                        <Trash2 size={17} />
                      </button>
                      <MoreHorizontal size={19} className="more-icon" />
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="panel-footer">
              <span>Powered by TaskFlow</span>
              <span><span className="online-dot" /> Connected to your workspace</span>
            </div>
          </section>

          <footer className="page-footer">
            Made for focused work. One task at a time.
          </footer>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, detail, icon: Icon, color }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${color}`}><Icon size={21} /></div>
      <p className="stat-label">{label}</p>
      <div className="stat-value">{value}</div>
      <p className="stat-detail">{detail}</p>
    </article>
  );
}
