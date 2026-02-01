import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cosmic-900 overflow-hidden">
      {/* Cosmic Background Pulse */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-purple rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-blue rounded-full blur-3xl"
        />
      </div>

      {/* Main Logo & Title */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "backOut" }}
        className="relative z-10 text-center"
      >
        {/* Crystal Palm Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-8 w-32 h-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-cosmic-900/80 backdrop-blur-xl rounded-full p-6 border-2 border-white/30 shadow-2xl">
            <Sparkles className="w-full h-full text-neon-blue drop-shadow-neon" strokeWidth={2} />
          </div>
        </motion.div>

        {/* App Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-5xl md:text-6xl font-bold font-display bg-gradient-to-r from-neon-blue via-purple-400 to-neon-purple bg-clip-text text-transparent"
        >
          AI Palm Reader
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-4 text-xl text-gray-300 tracking-wider"
        >
          Tarot • Astrology • Spiritual Guidance
        </motion.p>

        {/* Subtle Loading Orbs */}
        <motion.div
          className="flex justify-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="w-3 h-3 bg-neon-blue rounded-full blur-sm"
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
