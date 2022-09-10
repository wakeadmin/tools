const colorType = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'gray'];
const colorLevel = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50, 0];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        white: 'var(--wk-color-gray-0)',
        black: 'var(--wk-color-gray-900)',
        ...colorType.reduce(
          (obj, type) => {
            obj[type] = {
              ...colorLevel.reduce((prev, level) => {
                prev[level] = `var(--wk-color-${type}-${level})`;
                return prev;
              }, {}),
              ...(obj[type] || {}),
            };
            return obj;
          },
          {
            primary: {
              DEFAULT: 'var(--wk-color-primary-900)',
            },
            secondary: {
              DEFAULT: 'var(--wk-color-secondary-900)',
            },
            success: {
              DEFAULT: 'var(--wk-color-success-500)',
            },
            danger: {
              DEFAULT: 'var(--wk-color-danger-600)',
            },
            warning: {
              DEFAULT: 'var(--wk-color-warning-500)',
            },
            info: {
              DEFAULT: 'var(--wk-color-info-500)',
            },
          }
        ),
      },
      textColor: ({ theme }) => ({
        ...theme('color'),
        /* 链接颜色 */
        link: 'var(--wk-color-link)',
        'link-hover': 'var(--wk-color-link-hover)',
        primary: 'var(--wk-color-font-primary)',
        regular: 'var(--wk-color-font-regular)',
        secondary: 'var(--wk-color-font-secondary)',
        placeholder: 'var(--wk-color-font-placeholder)',
        disabled: 'var(--wk-color-font-disabled)',
        inverse: 'var(--wk-color-font-inverse)',
      }),
      borderColor: ({ theme }) => ({
        dark: 'var(--wk-color-border-dark)',
        DEFAULT: 'var(--wk-color-border)',
        light: 'var(--wk-color-border-light)',
        lighter: 'var(--wk-color-border-lighter)',
        'extra-light': 'var(--wk-color-border-extra-light)',
        ...theme('colors'),
      }),

      borderRadius: {
        none: '0px',
        sm: 'var(--wk-border-radius-sm)',
        DEFAULT: 'var(--wk-border-radius-base)',
        base: 'var(--wk-border-radius-base)',
        md: 'var(--wk-border-radius-md)',
        lg: 'var(--wk-border-radius-lg)',
        full: 'var(--wk-border-radius-full)',
      },

      backgroundColor: ({ theme }) => ({
        DEFAULT: 'var(--wk-color-bg)',
        dark: 'var(--wk-color-bg-dark)',
        ...theme('colors'),
      }),
      spacing: {
        xs: 'var(--wk-spacing-xs, 8px)',
        sm: 'var(--wk-spacing-sm, 16px)',
        base: 'var(--wk-spacing-base, 24px)',
        md: 'var(--wk-spacing-md, 32px)',
        lg: 'var(--wk-spacing-lg, 48x)',
        xl: 'var(--wk-spacing-xl, 64px)',
      },
      zIndex: {
        normal: 'var(--wk-z-index-normal,1)',
        dropdown: 'var(--wk-z-index-dropdown,1000)',
        sticky: 'var(--wk-z-index-sticky,1020)',
        fixed: 'var(--wk-z-index-fixed, 1030)',
        modal: 'var(--wk-z-index-modal,1040)',
        tooltip: 'var(--wk-z-index-modal,1050)',
      },
      fontSize: {
        h1: [
          'var(--wk-font-size-h1, 20px)',
          {
            lineHeight: 'var(--wk-font-line-height-h1,32px)',
          },
        ],
        h2: [
          'var(--wk-font-size-h2, 18px)',
          {
            lineHeight: 'var(--wk-font-line-height-h2,28px)',
          },
        ],
        h3: [
          'var(--wk-font-size-h3, 16px)',
          {
            lineHeight: 'var(--wk-font-line-height-h3,26px)',
          },
        ],
        h4: [
          'var(--wk-font-size-h4, 14px)',
          {
            lineHeight: 'var(--wk-font-line-height-h4,32px)',
          },
        ],
        h5: [
          'var(--wk-font-size-h5, 13px)',
          {
            lineHeight: 'var(--wk-font-line-height-h5,21px)',
          },
        ],
        h6: [
          'var(--wk-font-size-h6, 12px)',
          {
            lineHeight: 'var(--wk-font-line-height-h6,20px)',
          },
        ],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
