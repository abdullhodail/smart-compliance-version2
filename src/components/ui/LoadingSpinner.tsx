export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-gray-400 font-medium text-sm animate-pulse">جاري تحميل البيانات...</p>
    </div>
  );
}
