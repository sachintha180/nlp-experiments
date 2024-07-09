import { ApiResponse, DataType } from "../types/api";
import { Dispatch, SetStateAction } from "react";

import { ErrorType } from "../types/error";

const SERVER_BASE_URL = "http://127.0.0.1:5000";
// const SERVER_BASE_URL = "https://nlp-experiments-backend.vercel.app";

type ErrorMessageType = {
  loading: string;
  success: string;
  error: string;
};

type ClickEventHandlerBaseProps = {
  setData: Dispatch<SetStateAction<DataType>>;
  setDataLoaded: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<ErrorType>>;
  errorMessage: ErrorMessageType;
  url: string;
  searchParams: any;
};

const clickEventHandler = async ({
  setData,
  setDataLoaded,
  setError,
  errorMessage,
  url,
  searchParams,
}: ClickEventHandlerBaseProps) => {
  setDataLoaded(false);
  setError({
    message: errorMessage.loading,
    type: "warning",
  });
  try {
    const response = await fetch(
      `${url}?` + new URLSearchParams(searchParams).toString(),
    );
    const result: ApiResponse = await response.json();
    if (result.error) {
      throw Error(result.error);
    }
    setData(result.data);
    setDataLoaded(true);
    setError({
      message: errorMessage.success,
      type: "success",
    });
  } catch (error) {
    setError({
      message: `${errorMessage.error}. ${error}.`,
      type: "error",
    });
  }
};

export { clickEventHandler, SERVER_BASE_URL };
