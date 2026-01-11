import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FONTS } from "./lib/constants";
import { useTodos } from "./hooks/useTodos";

function Popup() {
  const {
    todos,
    loading,
    completedCount,
    remainingCount,
    maxTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const openNewTab = () => {
    chrome.tabs.create({ url: "chrome://newtab" });
  };

  if (loading) {
    return (
      <div className="w-[360px] h-[450px] bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e1] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#c9b8a8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-[360px] h-[450px] bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e1] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-br from-[#c9b8a8]/10 via-[#b5a092]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] bg-gradient-to-tr from-[#9d8977]/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-white/25 to-transparent rounded-full blur-3xl" />
      </div>

      {/* External link button - top right */}
      <motion.div
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={openNewTab}
          className="w-8 h-8 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-xl border border-[#d4cdc3]/30 text-[#6b5d54] hover:text-[#4a3f37] shadow-[0_4px_16px_-4px_rgba(197,184,168,0.15)] hover:shadow-[0_6px_20px_-4px_rgba(197,184,168,0.25)] transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="在新标签页打开"
        >
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
        </motion.button>
      </motion.div>

      <div className="relative z-10 px-5 py-6 h-full flex flex-col">
        {/* Logo and title */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-light mb-1.5 relative inline-block"
            style={{ fontFamily: FONTS.CORMORANT_GARAMOND }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-[#8b7a67] via-[#a89685] to-[#6b5d54] bg-clip-text text-transparent font-semibold tracking-wide">
                3things
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c9b8a8] to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </span>
          </motion.h1>
          <motion.p
            className="text-[#9d8977] text-[10px] tracking-[0.25em] uppercase font-light"
            style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            日日是好
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between text-[10px] text-[#9d8977] mb-1.5 px-0.5">
              <span className="font-light tracking-wider" style={{ fontFamily: FONTS.CRIMSON_TEXT }}>今日进度</span>
              <motion.span
                className="font-medium tabular-nums"
                key={completedCount}
                initial={{ scale: 1.3, color: "#c9b8a8" }}
                animate={{ scale: 1, color: "#9d8977" }}
                transition={{ duration: 0.4 }}
              >
                {completedCount} / {maxTodos}
              </motion.span>
            </div>
            <div className="relative h-0.5 bg-gradient-to-r from-[#ede8e1]/50 via-[#e5ddd3]/50 to-[#ede8e1]/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4c4b0] via-[#c9b8a8] to-[#b5a092] rounded-full shadow-[0_0_15px_rgba(201,184,168,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / maxTodos) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Todo input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <TodoInput
            onAdd={addTodo}
            disabled={remainingCount === 0}
            remainingCount={remainingCount}
            compact
          />
        </motion.div>

        {/* Todo list - flexible to fill space */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1"
          style={{ minHeight: 0 }}
        >
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            compact
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Popup;
