import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { TodoInput } from "./components/TodoInput";
import { TodoList, Todo } from "./components/TodoList";
import { QuoteDisplay } from "./components/QuoteDisplay";
import { HistoryModal } from "./components/HistoryModal";

const MAX_TODOS_PER_DAY = 3;
const STORAGE_KEY = "3things-data";

interface DayData {
  date: string;
  todos: Todo[];
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<DayData[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 获取今天的日期字符串 (YYYY-MM-DD)
  const getTodayString = () => {
    return new Date().toISOString().split("T")[0];
  };

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data: DayData[] = JSON.parse(saved);
        const today = getTodayString();
        const todayData = data.find((d) => d.date === today);

        if (todayData) {
          setTodos(todayData.todos);
        }

        // 加载历史数据（排除今天）
        const pastData = data
          .filter((d) => d.date !== today)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setHistory(pastData);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
  }, []);

  // 保存数据到 localStorage
  const saveData = (updatedTodos: Todo[]) => {
    const today = getTodayString();
    const saved = localStorage.getItem(STORAGE_KEY);
    let allData: DayData[] = [];

    if (saved) {
      try {
        allData = JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }

    // 更新或添加今天的数据
    const todayIndex = allData.findIndex((d) => d.date === today);
    if (todayIndex >= 0) {
      allData[todayIndex].todos = updatedTodos;
    } else {
      allData.push({ date: today, todos: updatedTodos });
    }

    // 只保留最近30天的数据
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    allData = allData.filter(
      (d) => new Date(d.date) >= thirtyDaysAgo
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));

    // 更新历史数据显示
    const pastData = allData
      .filter((d) => d.date !== today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setHistory(pastData);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveData(updatedTodos);
  };

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveData(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveData(updatedTodos);
  };

  const remainingCount = MAX_TODOS_PER_DAY - todos.length;
  const canAddMore = todos.length < MAX_TODOS_PER_DAY;

  const completedCount = todos.filter((t) => t.completed).length;
  const allCompleted = todos.length === MAX_TODOS_PER_DAY && completedCount === MAX_TODOS_PER_DAY;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e1] relative overflow-hidden">
      {/* 优雅的背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9b8a8]/10 via-[#b5a092]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#9d8977]/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 右上角历史记录入口 */}
      <motion.div 
        className="absolute top-8 right-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          onClick={() => setShowHistory(true)}
          className="gap-2 bg-white/40 backdrop-blur-xl hover:bg-white/60 border-[#d4cdc3]/30 text-[#6b5d54] hover:text-[#4a3f37] shadow-[0_8px_32px_-8px_rgba(197,184,168,0.2)] hover:shadow-[0_12px_40px_-8px_rgba(197,184,168,0.3)] transition-all duration-500 rounded-full px-5 py-2.5"
        >
          <History className="w-4 h-4" />
          历史记录
        </Button>
      </motion.div>

      <div className="container max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Logo 和标题 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl font-light mb-3 relative inline-block"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-[#8b7a67] via-[#a89685] to-[#6b5d54] bg-clip-text text-transparent font-semibold tracking-wide">
                3things
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9b8a8] to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p 
            className="text-[#9d8977] text-sm tracking-[0.3em] uppercase font-light mt-6"
            style={{ fontFamily: "'Crimson Text', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            专注当下 · 成就未来
          </motion.p>
        </motion.div>

        {/* 今日进度 */}
        <AnimatePresence>
          {todos.length > 0 && (
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between text-sm text-[#9d8977] mb-3 px-1">
                <span className="font-light tracking-wider" style={{ fontFamily: "'Crimson Text', serif" }}>今日进度</span>
                <motion.span
                  className="font-medium tabular-nums"
                  key={completedCount}
                  initial={{ scale: 1.3, color: "#c9b8a8" }}
                  animate={{ scale: 1, color: "#9d8977" }}
                  transition={{ duration: 0.4 }}
                >
                  {completedCount} / {MAX_TODOS_PER_DAY}
                </motion.span>
              </div>
              <div className="relative h-1.5 bg-gradient-to-r from-[#ede8e1]/50 via-[#e5ddd3]/50 to-[#ede8e1]/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4c4b0] via-[#c9b8a8] to-[#b5a092] rounded-full shadow-[0_0_20px_rgba(201,184,168,0.4)]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedCount / MAX_TODOS_PER_DAY) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <AnimatePresence>
                {allCompleted && (
                  <motion.div 
                    className="mt-6 p-6 bg-white/40 backdrop-blur-xl border border-[#d4cdc3]/20 rounded-3xl text-center shadow-[0_8px_32px_-8px_rgba(197,184,168,0.15)]"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <motion.p 
                      className="text-[#6b5d54] font-light text-lg"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✨ 今日三事已成，不负韶华时光
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 待办事项列表 */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </motion.div>

        {/* 输入框 */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <TodoInput
            onAdd={handleAddTodo}
            disabled={!canAddMore}
            remainingCount={remainingCount}
          />
        </motion.div>

        {/* 每日语录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <QuoteDisplay />
        </motion.div>
      </div>

      <HistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
      />
    </div>
  );
}

export default App;