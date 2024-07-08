import { ButtonType } from "../types/button";

type ControlGroupProps = {
  groupTitle: string;
  buttons: ButtonType[];
};

const ControlGroup = ({ groupTitle, buttons }: ControlGroupProps) => {
  return (
    <div className="control-group mb-5 border-b pb-5">
      <h1 className="mb-3 text-xl font-bold">{groupTitle}</h1>
      <div className="control-group-buttons flex flex-row flex-wrap gap-4">
        {buttons.map((button, index) => (
          <button
            key={`control-group-btn-${index}`}
            className={`text-nowrap rounded ${button.disabled ? "bg-gray-100" : "bg-gray-300"} ${button.disabled && "text-gray-300"} px-4 py-2 ${!button.disabled && "hover:bg-gray-300/80"}`}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ControlGroup;
