import { Dispatch, SetStateAction } from "react";

import { DataType } from "../types/api";
import { ErrorType } from "../types/error";
import { SERVER_BASE_URL } from "../lib/helpers";
import { clickEventHandler } from "../lib/helpers";

type ClickEventHandlerFactoryType = (
  setData: Dispatch<SetStateAction<DataType>>,
  setDataLoaded: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<ErrorType>>,
) => { [key: string]: () => Promise<void> };

const clickEventHandlerFactory: ClickEventHandlerFactoryType = (
  setData,
  setDataLoaded,
  setError,
) => ({
  "To lowercase": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Converting documents into lowercase...",
        success: "All documents converted to lowercase.",
        error: "Couldn't convert to lowercase",
      },
      url: `${SERVER_BASE_URL}/preprocess`,
      searchParams: {
        do: "lowercase",
      },
    });
  },
  "Remove punctuation": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Removing punctuation from documents...",
        success: "Removed punctuation from all documents.",
        error: "Couldn't remove punctuation",
      },
      url: `${SERVER_BASE_URL}/preprocess`,
      searchParams: {
        do: "punctuation",
      },
    });
  },
  Lemmatization: async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Lemmatizing all documents...",
        success: "Lemmatized all documents.",
        error: "Couldn't lemmatize documents",
      },
      url: `${SERVER_BASE_URL}/preprocess`,
      searchParams: {
        do: "lemmatize",
      },
    });
  },
  "Porter Stemmer": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Stemming all documents...",
        success: "Stemmed all documents.",
        error: "Couldn't stem documents",
      },
      url: `${SERVER_BASE_URL}/preprocess`,
      searchParams: {
        do: "stem",
      },
    });
  },
  "By whitespace": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Tokenizing by whitespace...",
        success: "All documents tokenized by whitespace.",
        error: "Couldn't tokenize documents",
      },
      url: `${SERVER_BASE_URL}/tokenize`,
      searchParams: {
        do: "whitespace",
      },
    });
  },
  "Named Entity Recognition (NER)": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Recognizing named entities in all documents...",
        success: "The named entities are now highlighted.",
        error: "Couldn't identify named entities",
      },
      url: `${SERVER_BASE_URL}/process`,
      searchParams: {
        do: "ner",
      },
    });
  },
  "Parts-of-Speech (POS) Tagging": async () => {
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Recognizing parts of speech in all documents...",
        success: "Parts of speech identified.",
        error: "Couldn't identify parts of speech",
      },
      url: `${SERVER_BASE_URL}/process`,
      searchParams: {
        do: "tag",
      },
    });
  },
});

export { clickEventHandlerFactory };
