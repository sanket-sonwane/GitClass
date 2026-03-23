export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-2xl p-5 animate-pulse">
      <div className="h-5 bg-gray-700 rounded w-1/3 mb-3" />
      <div className="h-4 bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-700 rounded w-4/5 mb-4" />
      <div className="h-9 bg-gray-700 rounded-lg w-1/3" />
    </div>
  );
}
