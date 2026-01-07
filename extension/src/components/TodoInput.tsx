import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TodoInputProps {
  onAdd: (text: string) => void;
  disabled: boolean;
  remainingCount: number;
}

export function TodoInput({ onAdd, disabled, remainingCount }: TodoInputProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#c9b8a8]/5 via-[#b5a092]/10 to-[#c9b8a8]/5 rounded-[20px] blur-xl opacity-0 transition-opacity duration-500"
          style={{ opacity: isFocused ? 1 : 0 }}
        />
        <div className="relative flex gap-3">
          <div className="relative flex-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={disabled ? "今日三事已满额" : "记录今日要事..."}
              disabled={disabled}
              className="h-16 text-base rounded-[20px] border-[1.5px] border-white/60 bg-white/40 backdrop-blur-2xl focus:border-[#c9b8a8]/40 focus:ring-4 focus:ring-[#c9b8a8]/10 text-[#37352f] placeholder:text-[#b5b3ad] transition-all duration-500 shadow-[0_8px_32px_-8px_rgba(197,184,168,0.1)] focus:shadow-[0_12px_48px_-8px_rgba(197,184,168,0.2)] px-6"
              style={{ fontFamily: "'Crimson Text', serif" }}
            />
          </div>
          <motion.div
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
          >
            <Button
              type="submit"
              disabled={disabled || !text.trim()}
              size="lg"
              className="h-16 px-8 rounded-[20px] bg-gradient-to-br from-[#c9b8a8] via-[#b5a092] to-[#9d8977] hover:from-[#b5a092] hover:to-[#8b7a67] text-white border-0 shadow-[0_8px_32px_-8px_rgba(139,122,103,0.3)] hover:shadow-[0_16px_48px_-8px_rgba(139,122,103,0.4)] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              <Plus className="w-5 h-5 mr-1.5" />
              添加
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {remainingCount > 0 && (
          <motion.p
            className="text-sm text-[#b5a092] text-center font-light tracking-wide"
            style={{ fontFamily: "'Crimson Text', serif" }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            还可添加 <span className="text-[#c9b8a8] font-medium mx-1">{remainingCount}</span> 件要事
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}