import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { FONTS } from "../lib/constants";

const quotes = [
  "专注于最重要的三件事，其他的都是噪音。",
  "简单是终极的复杂。",
  "每天进步一点点，改变就会发生。",
  "少即是多，专注创造卓越。",
  "今天的小步，明天的大跃。",
  "完成胜于完美。",
  "三件事，足以改变一天。",
];

export function QuoteDisplay() {
  const today = new Date().toDateString();
  const quoteIndex = Math.abs(today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % quotes.length;
  const todayQuote = quotes[quoteIndex];

  return (
    <motion.div
      className="relative overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-[24px] blur-xl" />
      <div className="relative flex items-center gap-4 p-5 bg-white/30 backdrop-blur-2xl rounded-[24px] border border-white/50 shadow-[0_8px_32px_-8px_rgba(197,184,168,0.08)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c9b8a8]/5 to-transparent rounded-full blur-2xl" />
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex-shrink-0"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#c9b8a8]/20 rounded-full blur-md" />
            <Sparkles className="w-5 h-5 text-[#c9b8a8] flex-shrink-0 relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.p
          className="text-[#6b5d54] leading-relaxed relative z-10 font-light text-sm flex-1"
          style={{ fontFamily: FONTS.CRIMSON_TEXT, fontStyle: "italic" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {todayQuote}
        </motion.p>
      </div>
    </motion.div>
  );
}