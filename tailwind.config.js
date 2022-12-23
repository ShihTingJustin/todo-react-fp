/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0071EB'
        },
        active: {
          blue1: '#004c9f'
        },
        disabled: {
          gray1: '#c4c4c6'
        },
        bg: {
          gray1: '#f5f5f7',
          gray2: '#f2f2f7',
          gray3: '#e9e9ea',
          blue1: '#0a84ff',
          white1: '#fff'
        },
        border: {
          gray1: '#c6c6c8',
          gray2: '#E9E8EA'
        },
        icon: {
          blue1: '#1badf8'
        }
      },
      fontSize: {
        'title-1': [
          '1.3rem',
          {
            letterSpacing: '-0.25px',
            fontWeight: '600'
          }
        ],
        'title-2': [
          '2rem',
          {
            fontWeight: '700'
          }
        ],
        'title-3': [
          '1.0625rem',
          {
            lineHeight: '3.5rem',
            fontWeight: '400'
          }
        ],
        'content-1': [
          '1.0625rem',
          {
            lineHeight: '1.375rem',
            fontWeight: '400'
          }
        ],
        'content-2': [
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
