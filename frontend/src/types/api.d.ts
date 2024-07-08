type DataType = {
  documents: string[];
  tokens: string[][];
  tags: [string, string, (string | null)][][];
};

type ApiResponse = {
  data: DataType;
  error: string;
};

export type { DataType, ApiResponse };
