import { motion } from 'framer-motion';

export default function Loader({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-900/95 backdrop-blur-sm"
    >
      {/* Main Crystal Orb */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative w-32 h-32"
      >
        {/* Inner Glow */}
        <div className="absolute inset-4 bg-neon-blue rounded-full blur-xl opacity-60 animate-pulse" />
        
        {/* Crystal Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-purple-500/30 to-neon-purple/20 rounded-full border-4 border-white/30 shadow-2xl shadow-neon-blue" />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20],
              x: [0, Math.sin(i) * 30],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            className="absolute top-1/2 left-1/2 w-3 h-3 bg-neon-blue rounded-full blur-sm"
            style={{
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'center'
            }}
          />
        ))}
      </motion.div>

      {/* Mystical Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-2xl font-display text-gradient mb-3">
          {message || "Consulting the stars..."}
        </p>
        <p className="text-sm text-gray-400 opacity-80">
          Aligning cosmic energies
        </p>
      </motion.div>
    </motion.div>
  );
}
