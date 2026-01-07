import { motion } from "motion/react";

function Popup() {
  return (
    <div className="w-80 h-60 bg-gradient-to-br from-[#faf8f5] via-[#f5f2ed] to-[#ede8e1] p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1
          className="text-4xl font-light mb-2 bg-gradient-to-br from-[#8b7a67] via-[#a89685] to-[#6b5d54] bg-clip-text text-transparent"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          3things
        </h1>
        <p
          className="text-[#9d8977] text-sm font-light"
          style={{ fontFamily: "'Crimson Text', serif" }}
        >
          打开新标签页开始使用
        </p>
      </motion.div>
    </div>
  );
}

export default Popup;
