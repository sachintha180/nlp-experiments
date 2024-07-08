import { useRef, useState } from "react";

import Dashboard from "./components/Dashboard";
import { ErrorType } from "./types/error";
import { LucideTrash2 } from "lucide-react";

const App = () => {
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState<ErrorType>({
    message: "",
    type: "success",
  });

  const errorColorMap: { [key: string]: string } = {
    error: "text-rose-400",
    warning: "text-yellow-400",
    success: "text-green-400",
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center bg-gray-800 p-5 text-white">
        <div className="">
          <h1 className="mb-1 text-3xl font-bold">NLP Experiments</h1>
          <p className="text-gray-400">
            By{" "}
            <a
              href="https://www.linkedin.com/in/sachinthasenanayake180/"
              className="underline"
            >
              @sachintha
            </a>
          </p>
        </div>
        <div className="flex flex-grow justify-end">
          <button
            className="rounded-md bg-gray-300 p-4 hover:bg-gray-300/80"
            ref={resetBtnRef}
          >
            <LucideTrash2 className="h-10 w-10 stroke-gray-800" />
          </button>
        </div>
      </header>
      <Dashboard setError={setError} resetBtnRef={resetBtnRef} />
      <section className="output min-h-[20vh] bg-gray-700 text-white">
        <h1 className="bg-gray-800 px-5 py-3 font-bold">Output</h1>
        <pre className={`p-5 text-sm ${errorColorMap[error.type]}`}>
          {error.message}
        </pre>
      </section>
    </div>
  );
};

export default App;
