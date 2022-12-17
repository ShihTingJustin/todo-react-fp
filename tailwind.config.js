/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#007AFF',
          red: '#E9683F'
        },
        black: {
          header: '#1D1D1D',
          body: '#2D3748'
        },
        white: {
          header: '#FFFFFF',
          bg: '#E5E5E5'
        },
        gray: {
          border: '#E6E6E6'
        }
      },
      fontSize: {
        'title-1': [
          '28px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: '600'
          }
        ],
        'title-2': [
          '18px',
          {
            lineHeight: '120%',
            letterSpacing: '-0.02em',
            fontWeight: '600'
          }
        ],
        'content-1': [
          '14px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            fontWeight: '400'
          }
        ],'content-2': [
          '12px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            fontWeight: '400'
          }
        ],
        'button-1': [
          '14px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            fontWeight: '600'
          }
        ]
      }
    }
  },
  plugins: []
};
