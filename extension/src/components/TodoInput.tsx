import { useState, FormEvent } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "./ui/input";
import { cn } from "./ui/utils";
import { FONTS } from "../lib/constants";
import { iconAlignClass, iconAlignStyle, getButtonTextClass } from "../lib/utils";

interface TodoInputProps {
  onAdd: (text: string) => void;
  disabled: boolean;
  remainingCount: number;
  compact?: boolean;
}

export function TodoInput({ onAdd, disabled, remainingCount, compact = false }: TodoInputProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onAdd(text.trim());
      setText("");
    }
  };

  const inputClassName =
    `text-base rounded-[16px] border-[1.5px] border-white/60 ` +
    `bg-white/40 backdrop-blur-2xl focus:border-[#c9b8a8]/40 focus:ring-4 ` +
    `focus:ring-[#c9b8a8]/10 text-[#37352f] placeholder:text-[#b5b3ad] ` +
    `transition-all duration-500 shadow-sm focus:shadow-md px-4 ` +
    `${compact ? 'h-10 text-sm' : 'h-14 text-base'}`;

  const buttonClassName =
    `rounded-[16px] ` +
    `bg-gradient-to-br from-[#c9b8a8] via-[#b5a092] to-[#9d8977] ` +
    `hover:from-[#b5a092] hover:to-[#8b7a67] text-white border-0 ` +
    `shadow-lg hover:shadow-xl ` +
    `transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed ` +
    `disabled:shadow-none flex items-center justify-center gap-2 ` +
    `${compact ? 'h-10 px-5 text-sm' : 'h-14 px-7 text-base'}`;

  return (
    <form onSubmit={handleSubmit} className={compact ? '' : 'space-y-4'} style={{ fontFamily: FONTS.CRIMSON_TEXT }}>
      <motion.div
        className="relative"
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Glow effect on focus */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-[#c9b8a8]/5 via-[#b5a092]/10 to-[#c9b8a8]/5",
            `rounded-[16px] blur-xl transition-opacity duration-500`,
            isFocused ? "opacity-100" : "opacity-0"
          )}
        />

        <div className={cn("relative flex gap-2", compact ? 'gap-2' : 'gap-3')}>
          {/* Input field */}
          <div className="relative flex-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={disabled ? "今日三事已满额" : compact ? "记录今日要事..." : "记录今日要事..."}
              disabled={disabled}
              className={inputClassName}
              style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            />
          </div>

          {/* Submit button */}
          <motion.div
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.97 }}
          >
            <button
              type="submit"
              disabled={disabled || !text.trim()}
              className={buttonClassName}
              style={{ fontFamily: FONTS.CRIMSON_TEXT }}
            >
              <Plus className={cn(compact ? "w-4 h-4" : "w-5 h-5", iconAlignClass)} strokeWidth={2.5} style={iconAlignStyle} />
              {!compact && <span className={getButtonTextClass('md')}>添加</span>}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Remaining count indicator */}
      {!compact && (
        <AnimatePresence>
          {remainingCount > 0 && (
            <motion.p
              className="text-sm text-[#b5a092] text-center font-light tracking-wide"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              还可添加 <span className="text-[#c9b8a8] font-medium mx-1">{remainingCount}</span> 件要事
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </form>
  );
}
