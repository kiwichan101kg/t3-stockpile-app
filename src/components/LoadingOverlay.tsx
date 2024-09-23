export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="loader h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-t-transparent"></div>
        <p className="mt-4 text-white">読み込み中...</p>
      </div>
    </div>
  );
};
