import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { SERVER_BASE_URL, clickEventHandler } from "../lib/helpers";

import ControlGroup from "./ControlGroup";
import DataItem from "./DataItem";
import DataItemSkeleton from "./DataItemSkeleton";
import { DataType } from "../types/api";
import { ErrorType } from "../types/error";
import { buttonData } from "../lib/data";
import { clickEventHandlerFactory } from "../api/clickEvent";

type DashboardProps = {
  setError: Dispatch<SetStateAction<ErrorType>>;
  resetBtnRef: RefObject<HTMLButtonElement>;
};
const MAX_LOAD_DOCUMENTS = 3;

const Dashboard = ({ setError, resetBtnRef }: DashboardProps) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState<DataType>({
    documents: [],
    tokens: [],
    tags: [],
  });

  const clickEventHandlers = clickEventHandlerFactory(
    setData,
    setDataLoaded,
    setError,
  );
  const buttonDataWithHandlers = buttonData.map((group) => ({
    ...group,
    buttons: group.buttons.map((button) => ({
      ...button,
      onClick: clickEventHandlers[button.text],
    })),
  }));

  const loadDocuments = () =>
    clickEventHandler({
      setData,
      setDataLoaded,
      setError,
      errorMessage: {
        loading: "Loading documents...",
        success: "All documents successfully loaded.",
        error: "Failed to load all documents",
      },
      url: `${SERVER_BASE_URL}/documents`,
      searchParams: {
        max: `${MAX_LOAD_DOCUMENTS}`,
      },
    });

  useEffect(() => {
    loadDocuments();
  }, []);

  if (resetBtnRef.current) {
    resetBtnRef.current.onclick = () => {
      loadDocuments();
    };
  }

  return (
    <main className="flex flex-1 flex-row gap-10 overflow-y-auto p-5">
      <section className="document-list flex-1 overflow-y-auto pr-4 pt-4">
        {dataLoaded
          ? [...Array(data.documents.length).keys()].map((i) => (
              <DataItem
                key={`data-${i}`}
                text={data.documents[i]}
                tokens={data.tokens[i]}
                tags={data.tags[i]}
                index={i}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <DataItemSkeleton key={`text-skeleton-${index}`} />
            ))}
      </section>
      <section className="document-controls flex-1">
        {buttonDataWithHandlers.map((group, index) => (
          <ControlGroup
            key={`control-group-${index}`}
            groupTitle={group.groupTitle}
            buttons={group.buttons}
          />
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
