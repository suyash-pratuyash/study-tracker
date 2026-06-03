import { useState, useEffect, useRef } from "react";

// ─── Utility ────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, "0");

const MODES = [
  { label: "Focus", duration: 25 * 60, color: "#e85d4a" },
  { label: "Short Break", duration: 5 * 60, color: "#4ade80" },
  { label: "Long Break", duration: 15 * 60, color: "#60a5fa" },
];

// ─── Timer Component ─────────────────────────────────────────────────────────
function Timer() {
  const [modeIdx, setModeIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef(null);

  const mode = MODES[modeIdx];
  const progress = timeLeft / mode.duration;
  const circumference = 2 * Math.PI * 90;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (modeIdx === 0) setCycles((c) => c + 1);
            if (Notification.permission === "granted") {
              new Notification(`${mode.label} session complete!`);
            }
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, modeIdx]);

  const switchMode = (idx) => {
    setModeIdx(idx);
    setTimeLeft(MODES[idx].duration);
    setRunning(false);
  };

  const reset = () => {
    setTimeLeft(mode.duration);
    setRunning(false);
  };

  const requestNotif = () => {
    if (Notification.permission === "default") Notification.requestPermission();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode Tabs */}
      <div className="flex gap-2">
        {MODES.map((m, i) => (
          <button
            key={m.label}
            onClick={() => switchMode(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              modeIdx === i
                ? "text-[#0f0f0f] shadow-lg scale-105"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
            style={modeIdx === i ? { backgroundColor: m.color } : {}}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Circular Timer */}
      <div className="relative w-52 h-52 flex items-center justify-center">
        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90"
          viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={mode.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{
              transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease",
            }}
          />
        </svg>
        <div className="text-center z-10">
          <div className="text-5xl font-bold tracking-tighter text-white font-mono">
            {pad(Math.floor(timeLeft / 60))}:{pad(timeLeft % 60)}
          </div>
          <div className="text-xs text-white/50 mt-1 uppercase tracking-widest">
            {mode.label}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 items-center">
        <button
          onClick={reset}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition"
          title="Reset">
          ↺
        </button>
        <button
          onClick={() => {
            setRunning((r) => !r);
            requestNotif();
          }}
          className="w-16 h-16 rounded-full font-bold text-[#0f0f0f] text-lg shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: mode.color }}>
          {running ? "⏸" : "▶"}
        </button>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-xs font-bold">
          ×{cycles}
        </div>
      </div>
    </div>
  );
}

// ─── Task Item ───────────────────────────────────────────────────────────────
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
        task.done ? "opacity-40" : "bg-white/5 hover:bg-white/10"
      }`}>
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          task.done
            ? "border-[#4ade80] bg-[#4ade80]"
            : "border-white/30 hover:border-white/60"
        }`}>
        {task.done && (
          <span className="text-[#0f0f0f] text-xs font-bold">✓</span>
        )}
      </button>
      <span
        className={`flex-1 text-sm ${task.done ? "line-through text-white/40" : "text-white/90"}`}>
        {task.text}
      </span>
      <span className="text-[10px] text-white/30 hidden group-hover:block">
        {task.tag}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-white/20 hover:text-red-400 transition text-xs opacity-0 group-hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

// ─── Task Manager ────────────────────────────────────────────────────────────
const TAGS = ["Study", "Revision", "Assignment", "Reading", "Other"];

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("study-tasks")) || [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [tag, setTag] = useState("Study");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("study-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [{ id: Date.now(), text, tag, done: false }, ...prev]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearDone = () => setTasks((prev) => prev.filter((t) => !t.done));

  const filtered = tasks.filter((t) =>
    filter === "All" ? true : filter === "Done" ? t.done : !t.done,
  );

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition"
        />
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-xl px-3 text-sm text-white/70 outline-none">
          {TAGS.map((t) => (
            <option key={t} value={t} className="bg-[#1a1a2e]">
              {t}
            </option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 rounded-xl bg-[#e85d4a] text-white font-bold text-sm hover:bg-[#d44a37] transition">
          +
        </button>
      </div>

      {/* Filters + Stats */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {["All", "Pending", "Done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                filter === f
                  ? "bg-white/20 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40">
            {doneCount}/{tasks.length} done
          </span>
          {doneCount > 0 && (
            <button
              onClick={clearDone}
              className="text-xs text-white/30 hover:text-red-400 transition">
              Clear done
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4ade80] rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / tasks.length) * 100}%` }}
          />
        </div>
      )}

      {/* Task List */}
      <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
        {filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">
            {tasks.length === 0
              ? "No tasks yet. Add one above ↑"
              : "Nothing here."}
          </p>
        ) : (
          filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("timer");

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4 font-sans">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e85d4a]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#60a5fa]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Study Tracker
          </h1>
          <p className="text-white/40 text-xs mt-1">
            Stay focused. Get things done.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white/5 p-1 rounded-2xl">
            {["timer", "tasks"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                  tab === t
                    ? "bg-white/15 text-white shadow"
                    : "text-white/40 hover:text-white/60"
                }`}>
                {t === "timer" ? "🍅 Pomodoro" : "✅ Tasks"}
              </button>
            ))}
          </div>

          {tab === "timer" ? <Timer /> : <TaskManager />}
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          Data saved locally · Works offline
        </p>
      </div>
    </div>
  );
}
