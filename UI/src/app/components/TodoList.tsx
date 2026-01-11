import { Check, Circle, Trash } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <motion.div
        className="text-center py-16 text-[#b5b3ad]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-5"
        >
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </motion.div>
        <motion.p
          className="text-base font-light tracking-wide mb-2"
          style={{ fontFamily: "'Crimson Text', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          开始记录今日要事
        </motion.p>
        <motion.p
          className="text-sm font-light text-[#c9b8a8]"
          style={{ fontFamily: "'Crimson Text', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          每天专注三件重要的事
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {todos.map((todo, index) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ 
              layout: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              delay: index * 0.08 
            }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-[24px] blur-xl" />
            <div className="relative flex items-start gap-5 p-6 bg-white/50 backdrop-blur-2xl rounded-[24px] border border-white/60 hover:border-[#c9b8a8]/30 hover:bg-white/60 shadow-[0_8px_32px_-8px_rgba(197,184,168,0.12)] hover:shadow-[0_12px_48px_-8px_rgba(197,184,168,0.2)] transition-all duration-500">
              <motion.button
                onClick={() => onToggle(todo.id)}
                className="flex-shrink-0 mt-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-7 h-7 rounded-xl border-[1.5px] flex items-center justify-center transition-all duration-500 ${
                    todo.completed
                      ? "bg-gradient-to-br from-[#c9b8a8] via-[#b5a092] to-[#9d8977] border-[#c9b8a8] shadow-[0_4px_16px_rgba(201,184,168,0.3)]"
                      : "border-[#d3d1cb] hover:border-[#c9b8a8] bg-white/80 backdrop-blur-sm"
                  }`}
                  animate={{
                    rotate: todo.completed ? [0, 5, -5, 0] : 0,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatePresence>
                    {todo.completed && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
              <div className="flex-1 min-w-0">
                <motion.div
                  className="flex items-center gap-2 mb-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div className="h-px w-6 bg-gradient-to-r from-[#c9b8a8]/40 to-transparent" />
                  <span
                    className="text-[10px] text-[#b5a092] tracking-[0.15em] uppercase font-light"
                    style={{ fontFamily: "'Crimson Text', serif" }}
                  >
                    第 {index + 1} 件事
                  </span>
                </motion.div>
                <motion.p
                  className={`text-[#37352f] leading-relaxed transition-all duration-500 text-base ${
                    todo.completed ? "line-through text-[#b5b3ad]" : ""
                  }`}
                  style={{ fontFamily: "'Crimson Text', serif" }}
                  animate={{
                    opacity: todo.completed ? 0.5 : 1,
                  }}
                >
                  {todo.text}
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(todo.id)}
                    className="hover:bg-red-50/50 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <Trash className="w-4 h-4 text-[#b5b3ad] hover:text-red-400 transition-colors" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}