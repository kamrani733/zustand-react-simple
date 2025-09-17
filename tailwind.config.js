/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // مسیر فایل‌های پروژه که Tailwind باید اسکن کنه
  ],
  theme: {
    extend: {
      // می‌تونید تم سفارشی اضافه کنید
      colors: {
        primary: '#1e40af', // رنگ دلخواه برای پروژه
        secondary: '#7c3aed',
      },
      spacing: {
        '128': '32rem', // فاصله دلخواه
      },
    },
  },
  plugins: [], // پلاگین‌های اضافی مثل forms یا typography
};