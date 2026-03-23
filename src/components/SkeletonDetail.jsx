export default function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-700 rounded w-3/4" />
      <div className="flex gap-4">
        <div className="h-6 bg-gray-700 rounded w-16" />
        <div className="h-6 bg-gray-700 rounded w-16" />
      </div>
      <div className="h-48 bg-gray-700 rounded-xl" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-5 bg-gray-700 rounded w-full" />
        ))}
      </div>
    </div>
  );
}
