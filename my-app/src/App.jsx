import { useEffect, useReducer } from 'react';
import useCommentStore from './commentStore'; // مسیر store
import './App.css'; // اگر CSS داری

// Initial state و reducer برای فرم (مدیریت حالت پیچیده فرم)
const initialFormState = { name: '', body: '' };
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME': return { ...state, name: action.payload };
    case 'UPDATE_BODY': return { ...state, body: action.payload };
    case 'RESET_FORM': return initialFormState;
    default: return state;
  }
};

function App() {
  // Zustand برای لیست کامنت‌ها (async و گلوبال)
  const { comments, loading, error, fetchComments, addComment, deleteComment, clearError } = useCommentStore();

  // useReducer برای فرم محلی
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  useEffect(() => {
    fetchComments(); // Fetch اولیه کامنت‌ها
  }, [fetchComments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.body) return; // اعتبارسنجی ساده
    addComment({ name: formState.name, body: formState.body });
    dispatch({ type: 'RESET_FORM' }); // ریست فرم
  };

  if (loading) return <div className="text-center py-4">در حال بارگذاری...</div>;
  if (error) return (
    <div className="text-center py-4 text-red-500">
      <p>خطا: {error}</p>
      <button onClick={clearError} className="bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-2 focus:ring-red-500 text-white px-4 py-2 rounded">پاک کردن خطا</button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">سیستم نظردهی</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">نام:</label>
          <input
            type="text"
            value={formState.name}
            onChange={(e) => dispatch({ type: 'UPDATE_NAME', payload: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">کامنت:</label>
          <textarea
            value={formState.body}
            onChange={(e) => dispatch({ type: 'UPDATE_BODY', payload: e.target.value })}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-500 text-white px-4 py-2 rounded"
        >
          ارسال کامنت
        </button>
      </form>

      {/* نمایش کامنت‌ها */}
      <h2 className="text-xl font-semibold mb-2">کامنت‌ها:</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">هیچ کامنتی وجود ندارد.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="p-4 bg-gray-100 rounded shadow">
              <p className="font-bold">{comment.name}</p>
              <p>{comment.body}</p>
              <button
                onClick={() => deleteComment(comment.id)}
                className="mt-2 bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-2 focus:ring-red-500 text-white px-2 py-1 rounded text-sm"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;