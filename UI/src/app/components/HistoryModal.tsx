import { X, Calendar, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface DayHistory {
  date: string;
  todos: Array<{
    text: string;
    completed: boolean;
  }>;
}

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  history: DayHistory[];
}

export function HistoryModal({ open, onClose, history }: HistoryModalProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "今天";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "昨天";
    } else {
      return date.toLocaleDateString("zh-CN", {
        month: "long",
        day: "numeric",
      });
    }
  };

  const getCompletionRate = (todos: DayHistory["todos"]) => {
    if (todos.length === 0) return 0;
    const completed = todos.filter((t) => t.completed).length;
    return Math.round((completed / todos.length) * 100);
  };

  const downloadCSV = () => {
    // 创建CSV内容
    const headers = ["日期", "事项", "状态"];
    const rows: string[][] = [];

    // 按日期排序(最新的在前)
    const sortedHistory = [...history].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    sortedHistory.forEach((day) => {
      day.todos.forEach((todo) => {
        rows.push([
          day.date,
          `"${todo.text.replace(/"/g, '""')}"`, // 转义CSV中的引号
          todo.completed ? "已完成" : "未完成",
        ]);
      });
    });

    // 组合CSV
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // 添加BOM以支持Excel正确显示中文
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `3things_历史记录_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-gradient-to-br from-white/95 via-[#faf9f8]/95 to-[#f5f3f0]/95 backdrop-blur-3xl border border-white/60 shadow-[0_32px_64px_-12px_rgba(139,122,103,0.2)] rounded-[28px]">
        <DialogHeader className="border-b border-[#e8e4df]/30 pb-4">
          <DialogTitle className="flex items-center justify-between text-[#37352f]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600 }}>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#c9b8a8]/20 rounded-lg blur-md" />
                  <Calendar className="w-6 h-6 text-[#c9b8a8] relative z-10" strokeWidth={1.5} />
                </div>
              </motion.div>
              历史记录
            </div>

            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={downloadCSV}
                  className="gap-2 bg-gradient-to-br from-[#c9b8a8] via-[#b5a092] to-[#9d8977] hover:from-[#b5a092] hover:to-[#8b7a67] text-white border-0 shadow-[0_4px_16px_-4px_rgba(139,122,103,0.25)] hover:shadow-[0_6px_20px_-4px_rgba(139,122,103,0.35)] transition-all duration-500 rounded-full px-5 py-2 text-sm"
                  style={{ fontFamily: "'Crimson Text', serif" }}
                >
                  <Download className="w-4 h-4" />
                  导出CSV
                </Button>
              </motion.div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-2 py-4">
          {history.length === 0 ? (
            <motion.div
              className="text-center py-20 text-[#b5b3ad]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="font-light" style={{ fontFamily: "'Crimson Text', serif" }}>暂无历史记录</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {history.map((day, dayIndex) => {
                  const completionRate = getCompletionRate(day.todos);
                  const completedCount = day.todos.filter(
                    (t) => t.completed
                  ).length;

                  return (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.04, duration: 0.4 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-[20px] blur-lg" />
                      <div className="relative p-6 bg-white/40 backdrop-blur-xl rounded-[20px] border border-white/50 hover:border-[#c9b8a8]/30 hover:bg-white/50 shadow-[0_4px_24px_-4px_rgba(197,184,168,0.08)] hover:shadow-[0_8px_32px_-4px_rgba(197,184,168,0.12)] transition-all duration-500">
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-medium text-[#37352f] text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {formatDate(day.date)}
                          </h3>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-[#9d8977] tabular-nums font-light" style={{ fontFamily: "'Crimson Text', serif" }}>
                              {completedCount} / {day.todos.length}
                            </span>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-[#ede8e1]/50 to-[#e5ddd3]/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#c9b8a8] to-[#b5a092] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${completionRate}%` }}
                                transition={{ duration: 0.8, delay: dayIndex * 0.04 + 0.2, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2.5">
                          {day.todos.map((todo, todoIndex) => (
                            <motion.div
                              key={todoIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dayIndex * 0.04 + todoIndex * 0.03, duration: 0.3 }}
                              className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/40 transition-all duration-300"
                            >
                              {todo.completed ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: dayIndex * 0.04 + todoIndex * 0.03 + 0.1, type: "spring", stiffness: 200 }}
                                  className="flex-shrink-0"
                                >
                                  <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-[#c9b8a8] to-[#9d8977] flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                  </div>
                                </motion.div>
                              ) : (
                                <div className="w-5 h-5 rounded-lg border-[1.5px] border-[#d3d1cb] bg-white/60 flex-shrink-0" />
                              )}
                              <span
                                className={
                                  todo.completed
                                    ? "text-[#b5b3ad] line-through font-light"
                                    : "text-[#37352f]"
                                }
                                style={{ fontFamily: "'Crimson Text', serif" }}
                              >
                                {todo.text}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#e8e4df]/30">
          <div className="text-xs text-[#b5b3ad] font-light" style={{ fontFamily: "'Crimson Text', serif" }}>
            {history.length > 0 && `共 ${history.length} 天记录`}
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#d4cdc3]/40 bg-white/40 backdrop-blur-xl text-[#6b5d54] hover:bg-white/60 hover:border-[#c9b8a8]/40 transition-all duration-500 rounded-full px-6"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              关闭
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
