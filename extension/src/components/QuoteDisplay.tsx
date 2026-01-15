import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { FONTS } from "../lib/constants";
import { MeteorShower } from "./MeteorShower";

const quotes = [
  // 专注与简约
  "专注于最重要的三件事，其他的都是噪音。",
  "简单是终极的复杂。",
  "少即是多，专注创造卓越。",
  "三件事，足以改变一天。",
  "专注是通往卓越的唯一捷径。",
  "简化，再简化，直到无可简化。",
  "把一件事做到极致，胜过把一万件事做得平庸。",
  "专注当下，未来自然水到渠成。",

  // 行动与进步
  "完成胜于完美。",
  "今天的小步，明天的大跃。",
  "每天进步一点点，改变就会发生。",
  "行动是治愈恐惧的良药。",
  "知道不等于做到，做到才是王道。",
  "不要等待完美时机，现在就是最好的时候。",
  "想到就做，别让拖延偷走你的梦想。",
  "行动力，拉开人与人差距的根本。",

  // 时间与当下
  "昨日不可追，今日尤可为。",
  "种一棵树最好的时间是十年前，其次是现在。",
  "抓住当下，即是永恒。",
  "此刻即是最好的时机。",
  "时间是公平的，每个人每天都只有24小时。",
  "今日事今日毕，明日不再忙。",
  "把握当下，就是对未来最好的承诺。",
  "你如何度过一天，就如何度过一生。",

  // 心态与智慧
  "心无旁骛，万事可成。",
  "静水流深，智者无言。",
  "大道至简，衍化至繁。",
  "知止而后有定，定而后能静。",
  "内心的平静，是最强大的力量。",
  "修心养性，方能行稳致远。",
  "智者不争，故天下莫能与之争。",
  "心态决定状态，眼界决定境界。",

  // 毅力与坚持
  "不积跬步，无以至千里。",
  "千淘万漉虽辛苦，吹尽狂沙始到金。",
  "行百里者半九十。",
  "锲而不舍，金石可镂。",
  "坚持不是一种力气，而是一种品质。",
  "成功往往就在再坚持一下的努力中。",
  "滴水穿石，不在于力量，而在于坚持。",
  "每天坚持三件事，一年就是一千件。",

  // 生活与哲学
  "人生如茶，空杯以对。",
  "大道至简，大味必淡。",
  "流水不争先，争的是滔滔不绝。",
  "慢工出细活，欲速则不达。",
  "生活不需要太多，只需要刚刚好。",
  "幸福不是拥有得多，而是计较得少。",
  "人生最重要的不是所站的位置，而是所朝的方向。",
  "把时间浪费在美好的事物上。",

  // 现代智慧
  "在这个嘈杂的世界里，专注是一种超能力。",
  "质量胜于数量，深度胜于广度。",
  "做对的事情，比把事情做对更重要。",
  "成功不是做得多，而是把对的事做到极致。",
  "在这个信息过载的时代，少即是多。",
  "选择比努力更重要，专注选择更重要。",
  "忙，不代表效率高；闲，不代表不作为。",
  "真正的自律，是做正确的事，而非做所有事。",

  // 东方智慧
  "一生二，二生三，三生万物。",
  "三思而后行，再思可矣。",
  "三件事，九转功成。",
  "三阳开泰，万物复苏。",
  "上善若水，水利万物而不争。",
  "知者不惑，仁者不忧，勇者不惧。",
  "天行健，君子以自强不息。",
  "君子务本，本立而道生。",

  // 自我成长
  "每天进步1%，一年后你会强大37倍。",
  "最好的投资，是投资自己。",
  "成长不是一蹴而就，而是日积月累。",
  "你的舒适区，就是你的坟墓。",
  "突破自我，从每天三件事开始。",
  "今天的你，是过去所有选择的总和。",
  "不要让昨天的忧虑，占据今天的时间。",
  "改变自己，是改变一切的起点。",

  // 工作与效率
  "重要的事情只有三件，其他都是干扰。",
  "效率不是做得快，而是做得对。",
  "把80%的时间，花在20%最重要的事情上。",
  "会休息的人，才会工作。",
  "工作不是生活的全部，但生活的质量来自工作的质量。",
  "专注一件事，胜过敷衍十件事。",
  "优秀是一种习惯，不是一种行为。",
  "把简单的事情重复做，你就是专家。",

  // 人际与沟通
  "倾听是最好的沟通。",
  "多说不如少说，少说不如不说。",
  "言语是银，沉默是金。",
  "与其争辩，不如行动。",
  "最好的关系，是彼此成就。",
  "少说大话，多做实事。",
  "理解他人，就是善待自己。",
  "真诚，是人与人之间最短的距离。",

  // 学习与思考
  "学而不思则罔，思而不学则殆。",
  "读书破万卷，下笔如有神。",
  "知识就是力量，但思考才是力量的源泉。",
  "学习的敌人是自己的满足。",
  "一日不读书，胸臆无佳想。",
  "思考是人类最大的乐趣。",
  "学而时习之，不亦说乎。",
  "活到老，学到老，还有三分学不了。",

  // 情绪与调节
  "控制情绪，才能控制人生。",
  "愤怒会降低你的智商。",
  "心情不好的时候，就去整理房间。",
  "接纳自己，是改变的开始。",
  "不要让别人的情绪，影响你的心情。",
  "内心强大的人，不为外物所动。",
  "修身养性，从控制情绪开始。",
  "平和的心，是最宝贵的财富。",

  // 目标与梦想
  "没有目标的生活，就像没有罗盘的航行。",
  "梦想是给人生航向的灯塔。",
  "目标是梦想的 deadline。",
  "把大目标分解成小目标，逐一击破。",
  "每天的三件事，就是你的小目标。",
  "不积小流，无以成江海。",
  "千里之行，始于足下。",
  "梦想不会逃跑，会逃跑的永远是自己。",

  // 失败与挫折
  "失败是成功之母。",
  "每次跌倒，都是为了更好地站起来。",
  "不要害怕失败，害怕的应该是从未尝试。",
  "挫折是人生的大学，失败是最好的老师。",
  "真正的失败，是放弃尝试。",
  "从哪里跌倒，就从哪里爬起来。",
  "困难像弹簧，你弱它就强。",
  "经历过风雨，才能见彩虹。",

  // 知足与感恩
  "知足者常乐。",
  "感恩生活中的一切，包括困难。",
  "幸福不是得到更多，而是计较更少。",
  "珍惜拥有的，遗忘没有的。",
  "感恩的心，是幸福的源泉。",
  "与其抱怨不如改变，不如感恩。",
  "知足不辱，知止不殆。",
  "心怀感恩，生活才会更美好。",
];

export function QuoteDisplay() {
  const [starClickCount, setStarClickCount] = useState(0);
  const [showMeteors, setShowMeteors] = useState(false);

  // 只在组件挂载时选择一次语录
  const todayQuote = useMemo(() => {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    return quotes[quoteIndex];
  }, []);

  const handleStarClick = () => {
    const newCount = starClickCount + 1;
    setStarClickCount(newCount);
    console.log('Star clicked:', newCount);

    if (newCount >= 3) {
      console.log('Triggering meteor shower!');
      setShowMeteors(true);
      setStarClickCount(0);

      // Auto hide after 5 seconds
      setTimeout(() => {
        setShowMeteors(false);
      }, 5000);
    }
  };

  return (
    <>
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
            className="flex-shrink-0 flex items-center justify-center cursor-pointer"
            style={{ width: '20px', height: '20px' }}
            onClick={handleStarClick}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#c9b8a8]/20 rounded-full blur-md" />
              <Sparkles className="w-5 h-5 text-[#c9b8a8] flex-shrink-0 relative z-10" strokeWidth={1.5} />
            </div>
          </motion.div>
          <motion.p
            className="text-[#6b5d54] leading-none relative z-10 font-light text-sm flex-1 select-none"
            style={{ fontFamily: FONTS.CRIMSON_TEXT, fontStyle: "italic" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {todayQuote}
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showMeteors && <MeteorShower />}
      </AnimatePresence>
    </>
  );
}