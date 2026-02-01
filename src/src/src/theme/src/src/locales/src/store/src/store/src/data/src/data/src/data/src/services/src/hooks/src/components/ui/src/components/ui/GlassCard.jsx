import { motion } from 'framer-motion';
import { fadeInUp } from '../../theme/animations';

export default function GlassCard({ 
  children, 
  className = '', 
  glow = 'blue', // 'blue' | 'purple' | 'none'
  padding = 'p-6',
  onClick 
}) {
  const glowStyle = glow === 'purple' 
    ? 'shadow-neon-purple' 
    : glow === 'blue' 
      ? 'shadow-neon-blue' 
      : '';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        glass-panel rounded-3xl border ${padding}
        ${glowStyle} shadow-glass
        backdrop-blur-xl
        transition-all duration-300
        ${onClick ? 'cursor-pointer active:shadow-inner' : ''}
        ${className}
      `}
      style={{
        background: 'rgba(15, 12, 41, 0.7)',
        borderColor: glow === 'none' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 242, 255, 0.3)',
      }}
    >
      {children}
    </motion.div>
  );
}
