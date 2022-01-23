module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'blur-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-down': {
          '0%': {
            opacity: 0,
            transform: 'translate(-50%, -3rem)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%, 0)',
          },
        },
      },
    },
  },
  plugins: [],
};
