import { Calendar, Check, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn, getButtonTextClass, iconAlignClass, iconAlignStyle } from "../lib/utils";
import { FONTS } from "../lib/constants";
import { formatDateToChinese, getCompletionRate } from "../lib/date-utils";
import { t } from "../lib/i18n";
import { trackHistoryDownload } from "../lib/analytics";

interface Todo {
  text: string;
  completed: boolean;
}

interface DayHistory {
  date: string;
  todos: Todo[];
}

interface HistoryModalProps {
  open: boolean;
  onClose: () => void;
  history: DayHistory[];
  includeToday?: boolean;
  todayData?: DayHistory;
}

export function HistoryModal({ open, onClose, history, includeToday = true, todayData }: HistoryModalProps) {

  // Export data to CSV
  const downloadCSV = () => {
    const allData = [...history];
    if (includeToday && todayData) {
      allData.push(todayData);
    }

    // Sort by date (newest first)
    const sortedData = allData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const headers = ["日期", "事项", "状态"];
    const rows: string[][] = [];

    sortedData.forEach((day) => {
      day.todos.forEach((todo) => {
        rows.push([
          day.date,
          `"${todo.text.replace(/"/g, '""')}"`, // Escape quotes in CSV
          todo.completed ? "已完成" : "未完成",
        ]);
      });
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Add BOM for proper Chinese character display in Excel
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `3things_历史记录_${new Date().toISOString().split("T")[0]}.csv`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Track download event
    trackHistoryDownload().catch(err => console.error('Analytics error:', err));
  };

  // Total todos count
  const totalTodos = history.reduce((sum, day) => sum + day.todos.length, 0) +
                     (includeToday && todayData ? todayData.todos.length : 0);
  const totalDays = history.length + (includeToday && todayData && todayData.todos.length > 0 ? 1 : 0);
  const hasData = history.length > 0 || (includeToday && todayData && todayData.todos.length > 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-gradient-to-br from-white/95 via-[#faf9f8]/95 to-[#f5f3f0]/95 backdrop-blur-3xl border border-white/60 shadow-[0_32px_64px_-12px_rgba(139,122,103,0.2)] rounded-[28px]">
        {/* Header */}
        <DialogHeader className="border-b border-[#e8e4df]/30 pb-4">
          <DialogTitle
            className="flex items-center gap-3 text-[#37352f]"
            style={{ fontFamily: FONTS.CORMORANT_GARAMOND, fontSize: "1.5rem", fontWeight: 600 }}
          >
            <motion.div
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#c9b8a8]/20 rounded-lg blur-md" />
                <Calendar className="w-6 h-6 text-[#c9b8a8] relative z-10" strokeWidth={1.5} />
              </div>
            </motion.div>
            {t('historyTitle')}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('historyDescription')}
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto flex-1 pr-2 py-4">
          {!hasData ? (
            <motion.div
              className="text-center py-20 text-[#b5b3ad]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="font-light" style={{ fontFamily: FONTS.CRIMSON_TEXT }}>
                {t('emptyHistory')}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {/* Today's data */}
                {includeToday && todayData && todayData.todos.length > 0 && (
                  <DayCard
                    key={todayData.date}
                    day={todayData}
                    getCompletionRate={getCompletionRate}
                    delay={0}
                  />
                )}

                {/* Historical data */}
                {history.map((day, index) => {
                  const baseDelay = includeToday && todayData && todayData.todos.length > 0 ? 0.04 : 0;
                  return (
                    <DayCard
                      key={day.date}
                      day={day}
                      getCompletionRate={getCompletionRate}
                      delay={baseDelay + index * 0.04}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-[#e8e4df]/30">
          <div className="flex items-center gap-3">
            <div
              className="text-xs text-[#b5b3ad] font-light"
              style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            >
              {hasData && `共 ${totalTodos} 条记录 · ${totalDays} 天`}
            </div>

            {hasData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={downloadCSV}
                  className="bg-gradient-to-br from-[#c9b8a8] via-[#b5a092] to-[#9d8977] hover:from-[#b5a092] hover:to-[#8b7a67] text-white border-0 shadow-[0_4px_16px_-4px_rgba(139,122,103,0.25)] hover:shadow-[0_6px_20px_-4px_rgba(139,122,103,0.35)] transition-all duration-500 rounded-full px-5 py-2 text-sm h-9 flex items-center justify-center gap-2"
                  style={{ fontFamily: FONTS.CRIMSON_TEXT }}
                >
                  <Download className={cn("w-4 h-4", iconAlignClass)} strokeWidth={2} style={iconAlignStyle} />
                  <span className={getButtonTextClass('sm')}>{t('download')}</span>
                </Button>
              </motion.div>
            )}
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#d4cdc3]/40 bg-white/40 backdrop-blur-xl text-[#6b5d54] hover:bg-white/60 hover:border-[#c9b8a8]/40 transition-all duration-500 rounded-full px-6 h-9 flex items-center justify-center"
              style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            >
              <span className={getButtonTextClass('sm')}>{t('close')}</span>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Extracted DayCard component for better organization
interface DayCardProps {
  day: DayHistory;
  getCompletionRate: (todos: Todo[]) => number;
  delay: number;
}

function DayCard({ day, getCompletionRate, delay }: DayCardProps) {
  const completionRate = getCompletionRate(day.todos);
  const completedCount = day.todos.filter((t) => t.completed).length;

  return (
    <motion.div
      key={day.date}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-[20px] blur-lg" />
      <div className="relative p-6 bg-white/40 backdrop-blur-xl rounded-[20px] border border-white/50 hover:border-[#c9b8a8]/30 hover:bg-white/50 shadow-[0_4px_24px_-4px_rgba(197,184,168,0.08)] hover:shadow-[0_8px_32px_-4px_rgba(197,184,168,0.12)] transition-all duration-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3
            className="font-medium text-[#37352f] text-lg"
            style={{ fontFamily: FONTS.CORMORANT_GARAMOND }}
          >
            {formatDateToChinese(day.date)}
          </h3>
          <div className="flex items-center gap-4">
            <span
              className="text-sm text-[#9d8977] tabular-nums font-light"
              style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            >
              {completedCount} / {day.todos.length}
            </span>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#ede8e1]/50 to-[#e5ddd3]/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c9b8a8] to-[#b5a092] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>

        {/* Todo list */}
        <div className="space-y-2.5">
          {day.todos.map((todo, todoIndex) => (
            <TodoItem
              key={todoIndex}
              todo={todo}
              index={todoIndex}
              baseDelay={delay}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Extracted TodoItem component
interface TodoItemProps {
  todo: Todo;
  index: number;
  baseDelay: number;
}

function TodoItem({ todo, index, baseDelay }: TodoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: baseDelay + index * 0.03, duration: 0.3 }}
      className="flex items-center gap-3 text-sm p-3 rounded-xl hover:bg-white/40 transition-all duration-300"
    >
      {todo.completed ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: baseDelay + index * 0.03 + 0.1,
            type: "spring",
            stiffness: 200,
          }}
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
        className={cn(
          todo.completed ? "text-[#b5b3ad] line-through font-light" : "text-[#37352f]"
        )}
        style={{ fontFamily: FONTS.CRIMSON_TEXT }}
      >
        {todo.text}
      </span>
    </motion.div>
  );
}
