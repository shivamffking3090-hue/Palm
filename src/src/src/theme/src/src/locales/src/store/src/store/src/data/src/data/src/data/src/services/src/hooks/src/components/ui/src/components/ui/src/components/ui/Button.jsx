import { motion } from 'framer-motion';
import { fadeInUp } from '../../theme/animations';

export default function Button({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost'
  size = 'lg', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  className = ''
}) {
  const baseClasses = 'font-medium tracking-wide transition-all duration-300 font-display flex items-center justify-center gap-3 rounded-full';

  const variants = {
    primary: 'bg-gradient-to-r from-cosmic-500 to-purple-600 text-white shadow-neon-purple hover:shadow-neon-purple/70',
    secondary: 'bg-glass-dark border border-glass-border text-neon-blue shadow-neon-blue hover:shadow-neon-blue/60',
    ghost: 'bg-transparent text-white hover:bg-white/10 backdrop-blur-sm'
  };

  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  return (
    <motion.button
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
