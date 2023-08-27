import React, { ChangeEvent, useEffect, useState } from "react";
import { formatCasing } from "../../helpers/formatCasing";
import { CasingTypes } from "../../const/TaskTypes";

interface SelectProps {
  handleResult: (result: string) => void;
  baseClassName: string;
  wordValues: string[];
  defaultName?: string;
  defaultSymbol?: string;
  casingValues?: string[];
  symbolValues?: string[];
}

export const Select = ({
  title,
  handleResult,
  baseClassName,
  wordValues,
  defaultName = "",
  defaultSymbol = "",
  casingValues,
  symbolValues,
}: SelectProps) => {
  const [selectedWord, setSelectedWord] = useState(defaultName);
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol);
  const [selectedCasing, setSelectedCasing] = useState<CasingTypes>(
    CasingTypes.FIRSTUPPER
  );
  const [result, setResult] = useState("");

  useEffect(() => {
    setResult(`${formatCasing(selectedWord, selectedCasing)}${selectedSymbol}`);
  }, [selectedWord, selectedCasing, selectedSymbol]);

  useEffect(() => {
    if (result) {
      handleResult(result);
    }
  }, [result]);

  const handleWord = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedWord(e.target.value);
  };

  const handleCasing = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCasing(e.target.value as CasingTypes);
  };

  const handleSymbol = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  return (
    <>
      <select className={baseClassName} onChange={handleWord}>
        <option value="/">--Please choose an option--</option>
        {wordValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {casingValues && (
        <select
          className={baseClassName}
          onChange={handleCasing}
          value={selectedCasing}
        >
          {casingValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
      {symbolValues && (
        <select
          className={baseClassName}
          onChange={handleSymbol}
          value={selectedSymbol}
        >
          {symbolValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
