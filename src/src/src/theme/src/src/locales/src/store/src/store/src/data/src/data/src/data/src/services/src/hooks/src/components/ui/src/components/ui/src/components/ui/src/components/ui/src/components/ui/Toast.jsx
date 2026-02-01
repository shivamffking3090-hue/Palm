import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

// Toast Store
export const useToast = create((set) => ({
  message: null,
  type: 'info', // 'success' | 'error' | 'info'
  show: (message, type = 'info') => set({ message, type }),
  hide: () => set({ message: null })
}));

export default function Toast() {
  const { message, type } = useToast();

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-green-400" />,
    error: <XCircle className="w-6 h-6 text-red-400" />,
    info: <AlertCircle className="w-6 h-6 text-neon-blue" />
  };

  const bgColors = {
    success: 'bg-green-900/80',
    error: 'bg-red-900/80',
    info: 'bg-cosmic-800/90'
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ${bgColors[type]} backdrop-blur-xl border border-white/20 rounded-3xl shadow-neon-blue px-8 py-5 flex items-center gap-4`}
        >
          {icons[type]}
          <p className="text-white font-medium text-lg">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
