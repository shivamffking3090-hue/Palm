import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, showBack = true, rightAction }) {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 pt-8 pb-4"
    >
      <div className="flex items-center justify-between">
        {/* Back Button */}
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-neon-blue/30"
          >
            <ArrowLeft className="w-6 h-6 text-neon-blue" />
          </motion.button>
        )}

        {/* Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gradient font-display">
          {title}
        </h1>

        {/* Right Action (optional) */}
        <div className="w-12">{rightAction}</div>
      </div>

      {/* Glowing Accent Line */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
    </motion.header>
  );
}
