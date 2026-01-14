import { useState, useEffect } from "react";
import { History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { QuoteDisplay } from "./components/QuoteDisplay";
import { HistoryModal } from "./components/HistoryModal";
import { Fireworks } from "./components/Fireworks";
import { useTodos } from "./hooks/useTodos";
import { useHistory } from "./hooks/useHistory";
import { FONTS } from "./lib/constants";
import { cn, iconAlignClass, iconAlignStyle, getButtonTextClass } from "./lib/utils";
import { t } from "./lib/i18n";
import { trackNewtabOpen, trackHistoryView, initAnalytics } from "./lib/analytics";
import { VERSION } from "./lib/version";

function App() {
  const [showHistory, setShowHistory] = useState(false);

  // Initialize analytics and track events on mount
  useEffect(() => {
    const init = async () => {
      await initAnalytics(VERSION);

      // Check for pending install/update events from service worker
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.sendMessage({ action: 'getAnalyticsData' }, async (response) => {
          if (response?.analytics_install_pending) {
            await trackNewtabOpen(); // Track as daily active on install
            chrome.runtime.sendMessage({ action: 'clearAnalyticsData' });
          }
        });
      }

      trackNewtabOpen().catch(err => console.error('Analytics error:', err));
    };

    init();
  }, []);

  // Use custom hooks for data management
  const {
    todos,
    loading: todosLoading,
    completedCount,
    remainingCount,
    maxTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  const {
    history,
    todayData,
    loading: historyLoading,
  } = useHistory();

  const handleAddTodo = (text: string) => {
    addTodo(text);
  };

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const allCompleted = todos.length === maxTodos && completedCount === maxTodos;

  return (
    <div className="h-screen bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e1] relative overflow-hidden">
      {/* 优雅的背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#c9b8a8]/10 via-[#b5a092]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#9d8977]/8 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 右上角历史记录入口 */}
      <motion.div
        className="absolute top-6 right-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          onClick={() => {
            setShowHistory(true);
            trackHistoryView(history.length > 0 || (todayData && todayData.todos.length > 0)).catch(err => console.error('Analytics error:', err));
          }}
          className="bg-white/40 backdrop-blur-xl hover:bg-white/60 border-[#d4cdc3]/30 text-[#6b5d54] hover:text-[#4a3f37] shadow-[0_8px_32px_-8px_rgba(197,184,168,0.2)] hover:shadow-[0_12px_40px_-8px_rgba(197,184,168,0.3)] transition-all duration-500 rounded-full px-4 py-2 h-9 flex items-center justify-center gap-2"
        >
          <History className={cn("w-3.5 h-3.5", iconAlignClass)} strokeWidth={2} style={iconAlignStyle} />
          <span className={getButtonTextClass('sm')}>{t('history')}</span>
        </Button>
      </motion.div>

      <div className="container max-w-2xl mx-auto px-5 py-8 relative z-10 h-full flex flex-col">
        {/* Logo 和标题 */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-light mb-2 relative inline-block"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          <motion.p
            className="text-[#9d8977] text-xs tracking-[0.25em] uppercase font-light mt-4"
            style={{ fontFamily: "'Crimson Text', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t('tagline')}
          </motion.p>
        </motion.div>

        {/* 今日进度 */}
        <AnimatePresence>
          {todos.length > 0 && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between text-xs text-[#9d8977] mb-2 px-1">
                <span className="font-light tracking-wider" style={{ fontFamily: "'Crimson Text', serif" }}>{t('todayProgress')}</span>
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
              <div className="relative h-1 bg-gradient-to-r from-[#ede8e1]/50 via-[#e5ddd3]/50 to-[#ede8e1]/50 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4c4b0] via-[#c9b8a8] to-[#b5a092] rounded-full shadow-[0_0_15px_rgba(201,184,168,0.4)]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completedCount / maxTodos) * 100}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <AnimatePresence>
                {allCompleted && (
                  <motion.div
                    className="mt-4 p-4 bg-white/40 backdrop-blur-xl border border-[#d4cdc3]/20 rounded-2xl text-center shadow-[0_8px_32px_-8px_rgba(197,184,168,0.15)]"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <motion.p
                      className="text-[#6b5d54] font-light text-sm"
                      style={{ fontFamily: "'Crimson Text', serif" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t('allCompleted')}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 待办事项列表 - 使用flex-1自动填充空间 */}
        <motion.div
          className="flex-1 mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ minHeight: 0 }}
        >
          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </motion.div>

        {/* 输入框 */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <TodoInput
            onAdd={handleAddTodo}
            disabled={remainingCount === 0}
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
        includeToday={true}
        todayData={todos.length > 0 ? {
          date: new Date().toISOString().split('T')[0],
          todos: todos
        } : todayData}
      />

      {/* 烟花动画 - 完成所有任务时显示 */}
      <AnimatePresence>
        {allCompleted && <Fireworks />}
      </AnimatePresence>
    </div>
  );
}

export default App;