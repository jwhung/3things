import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export type ToastType = "success" | "error" | "warning";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ message, type, visible, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
  };

  const colors = {
    success: "bg-white/80 border-[#c9b8a8]/30",
    error: "bg-white/80 border-red-300/30",
    warning: "bg-white/80 border-yellow-300/30",
  };

  const textColors = {
    success: "text-[#6b5d54]",
    error: "text-red-600",
    warning: "text-yellow-600",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-lg ${colors[type]}`}
          >
            <div className={textColors[type]}>{icons[type]}</div>
            <p
              className={`text-sm font-medium ${textColors[type]}`}
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              {message}
            </p>
            <button
              onClick={onClose}
              className={`ml-2 ${textColors[type]} hover:opacity-70 transition-opacity`}
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
