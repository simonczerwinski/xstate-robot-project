import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default Input;
