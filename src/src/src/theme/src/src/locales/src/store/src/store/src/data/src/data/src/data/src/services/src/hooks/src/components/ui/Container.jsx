import { motion } from 'framer-motion';
import { pageVariants } from '../../theme/animations';

export default function Container({ children, className = '', ...props }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={`min-h-screen w-full bg-cosmic-900 bg-cosmic-gradient relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Animated Cosmic Background Layer */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-transparent to-blue-900" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-neon-purple rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-neon-blue rounded-full blur-3xl opacity-20 animate-pulse-slow delay-1000" />
      </div>

      {/* Safe Area Content */}
      <div className="relative z-10 flex flex-col min-h-screen pt-safe-top pb-safe-bottom">
        {children}
      </div>
    </motion.div>
  );
}
