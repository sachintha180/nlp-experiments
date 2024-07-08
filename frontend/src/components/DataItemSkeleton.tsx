const DataItemSkeleton = () => {
  return (
    <div className="news-item relative mb-6 ml-3 animate-pulse">
      <p className="absolute right-[10px] top-[-15px] min-w-8 rounded-md bg-gray-200 py-1 text-center font-mono text-white">
        &nbsp;
      </p>
      <div className="text-section">
        <h2 className="bg-gray-100 px-4 py-1">&nbsp;</h2>
        <p className="h-[50px] whitespace-pre-line bg-gray-50 p-4 font-serif"></p>
      </div>
      <div className="text-section">
        <h2 className="bg-gray-100 px-4 py-1">&nbsp;</h2>
        <p className="h-[50px] whitespace-pre-line bg-gray-50 p-4 font-serif"></p>
      </div>
      <div className="text-section">
        <h2 className="bg-gray-100 px-4 py-1">&nbsp;</h2>
        <p className="h-[50px] whitespace-pre-line bg-gray-50 p-4 font-serif"></p>
      </div>
    </div>
  );
};

export default DataItemSkeleton;
