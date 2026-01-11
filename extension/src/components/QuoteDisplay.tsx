import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { FONTS } from "../lib/constants";

const quotes = [
  // 专注与简约
  "专注于最重要的三件事，其他的都是噪音。",
  "简单是终极的复杂。",
  "少即是多，专注创造卓越。",
  "三件事，足以改变一天。",

  // 行动与进步
  "完成胜于完美。",
  "今天的小步，明天的大跃。",
  "每天进步一点点，改变就会发生。",
  "行动是治愈恐惧的良药。",

  // 时间与当下
  "昨日不可追，今日尤可为。",
  "种一棵树最好的时间是十年前，其次是现在。",
  "抓住当下，即是永恒。",
  "此刻即是最好的时机。",

  // 心态与智慧
  "心无旁骛，万事可成。",
  "静水流深，智者无言。",
  "大道至简，衍化至繁。",
  "知止而后有定，定而后能静。",

  // 毅力与坚持
  "不积跬步，无以至千里。",
  "千淘万漉虽辛苦，吹尽狂沙始到金。",
  "行百里者半九十。",
  "锲而不舍，金石可镂。",

  // 生活与哲学
  "人生如茶，空杯以对。",
  "大道至简，大味必淡。",
  "流水不争先，争的是滔滔不绝。",
  "慢工出细活，欲速则不达。",

  // 现代智慧
  "在这个嘈杂的世界里，专注是一种超能力。",
  "质量胜于数量，深度胜于广度。",
  "做对的事情，比把事情做对更重要。",
  "成功不是做得多，而是把对的事做到极致。",

  // 东方智慧
  "一生二，二生三，三生万物。",
  "三思而后行，再思可矣。",
  "三件事，九转功成。",
  "三阳开泰，万物复苏。",
];

export function QuoteDisplay() {
  // 每次渲染都随机选择一个语录
  const quoteIndex = Math.floor(Math.random() * quotes.length);
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
          className="flex-shrink-0 flex items-center justify-center"
          style={{ width: '20px', height: '20px' }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#c9b8a8]/20 rounded-full blur-md" />
            <Sparkles className="w-5 h-5 text-[#c9b8a8] flex-shrink-0 relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>
        <motion.p
          className="text-[#6b5d54] leading-none relative z-10 font-light text-sm flex-1"
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