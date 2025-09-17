import { create } from 'zustand';

const useUserStore = create((set, get) => ({
  users: [],      // لیست کاربران
  loading: false, // وضعیت loading
  error: null,    // خطا

  // Async Action برای fetch کاربران
  fetchUsers: async () => {
    set({ loading: true, error: null }); // شروع loading

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('خطا در fetch داده‌ها');
      
      const data = await response.json();
      set({ users: data, loading: false }); // به‌روزرسانی state با داده‌ها
    } catch (err) {
      set({ error: err.message, loading: false }); // مدیریت خطا
    }
  },

  // Action ساده برای clear error
  clearError: () => set({ error: null }),
}));

export default useUserStore;