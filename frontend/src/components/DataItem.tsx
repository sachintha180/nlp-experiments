type DataItemProps = {
  text: string;
  tokens: null | string[];
  tags: null | [string, string, string | null][];
  index: number;
};

const DataItem = ({ text, tokens, tags, index }: DataItemProps) => {
  return (
    <div className="news-item relative mb-6 border-2">
      <p className="absolute right-[10px] top-[-15px] min-w-8 rounded-md bg-gray-400 py-1 text-center font-mono text-white">
        {index + 1}
      </p>
      <div className="text-section">
        <h2 className="bg-gray-200 px-4 py-1">Raw Text</h2>
        <p className="whitespace-pre-line p-4 font-serif">
          {tags && tokens
            ? [...Array(tags.length).keys()].map((i) =>
                tags[i][2]?.includes("PERSON") ? (
                  <span className="bg-yellow-400 rounded-md p-1 m-1" key={`ne-key-${i}`}>{tokens[i] + " "}</span>
                ) : (
                  tokens[i] + " "
                ),
              )
            : text}
        </p>
      </div>
      <div className="text-section">
        <h2 className="bg-gray-200 px-4 py-1">Tokens</h2>
        <div className="token-container flex overflow-x-auto py-4">
          {tokens ? (
            tokens.map((token, index) => (
              <p
                key={`token-${index}`}
                className="mx-4 text-nowrap rounded-md bg-gray-300 px-4 py-1 font-serif"
              >
                {token}
              </p>
            ))
          ) : (
            <p className="whitespace-pre-line px-4 font-serif text-gray-500">
              No tokens yet.
            </p>
          )}
        </div>
      </div>
      <div className="text-section">
        <h2 className="bg-gray-200 px-4 py-1">Tags</h2>
        <div className="token-container flex overflow-x-auto py-4">
          {tags ? (
            tags.map((tag, index) => (
              <p
                key={`tag-${index}`}
                className="mx-4 text-nowrap rounded-md bg-gray-300 px-4 py-1 font-serif"
              >
                {tag[0]}
                <span className="ml-2 rounded-sm bg-gray-800 px-2 text-white">
                  {tag[1]}
                </span>
                {tag[2] && (
                  <span className="ml-2 rounded-sm bg-red-800 px-2 text-white">
                    {tag[2]}
                  </span>
                )}
              </p>
            ))
          ) : (
            <p className="whitespace-pre-line px-4 font-serif text-gray-500">
              No tagged tokens yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataItem;
