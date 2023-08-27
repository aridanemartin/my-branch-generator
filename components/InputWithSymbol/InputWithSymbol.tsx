import React, { useState, ChangeEvent, useEffect } from "react";

interface InputWithSymbolProps {
  name: string;
  handleResult: (result: string) => void;
  defaultValue?: string;
  defaultSymbol?: string;
}

export const InputWithSymbol = ({
  handleResult,
  name,
  defaultValue = "",
  defaultSymbol = "",
}: InputWithSymbolProps) => {
  const [result, setResult] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol);
  const [description, setDescription] = useState(defaultValue);

  const handleSymbol = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setResult(`${description}${selectedSymbol}`);
  }, [description, selectedSymbol]);

  useEffect(() => {
    if (result) {
      handleResult(result);
    }
  }, [result]);

  return (
    <>
      <input
        type="text"
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={handleDescription}
      />
      <select onChange={handleSymbol}>
        <option value="-">-</option>
        <option value="/">/</option>
        <option value="_">_</option>
        <option value=".">.</option>
      </select>
    </>
  );
};
