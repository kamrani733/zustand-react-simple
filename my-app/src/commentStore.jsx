import { create } from 'zustand';

const useCommentStore = create((set, get) => ({
  comments: [],       // لیست کامنت‌ها
  loading: false,     // وضعیت loading
  error: null,        // خطا

  fetchComments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=5');
      if (!response.ok) throw new Error('خطا در fetch کامنت‌ها');
      const data = await response.json();
      set({ comments: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Action برای اضافه کردن کامنت جدید (local)
  addComment: (newComment) => {
    const { comments } = get();
    set({ comments: [...comments, { ...newComment, id: Date.now() }] });
  },

  // Action برای حذف کامنت
  deleteComment: (id) => {
    const { comments } = get();
    set({ comments: comments.filter((comment) => comment.id !== id) });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useCommentStore;