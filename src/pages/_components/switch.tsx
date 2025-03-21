import { useState } from "react";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) onChange(newChecked);
  };

  return (
    <label className="flex items-center cursor-pointer space-x-3">
      <div
        className={`relative w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
          isChecked ? "bg-purple-500" : "bg-gray-300"
        }`}
        onClick={handleToggle}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
            isChecked ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default Switch;
