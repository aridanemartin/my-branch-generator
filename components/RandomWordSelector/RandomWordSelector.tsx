import React, { useState, useEffect } from "react";
import { useFetchCharacter } from "../../hooks/useFetchCharacter";
import { getRandomArbitrary } from "../../helpers/getRandomArbitrary";

import styles from "../../shared/styles/Home.module.scss";
import { formatFullNameCasing } from "../../helpers/formatFullNameCasing";

interface RandomWordSelectorProps {
  handleResult: (result: string) => void;
  setIsApiCharacterLoading: (isLoading: boolean) => void;
  symbolValues?: string[];
  casingValues?: string[];
  casingDefault?: string;
  symbolDefault?: string;
}

export const RandomWordSelector = ({
  handleResult,
  setIsApiCharacterLoading,
  casingValues,
  casingDefault = "",
  symbolValues,
  symbolDefault = "",
}: RandomWordSelectorProps) => {
  const [selectedUrl, setSelectedUrl] = useState("");
  const [limitOfResults, setLimitOfResults] = useState(0);
  const [apiCharacterSelected, setApiCharacterSelected] = useState("");
  const [selectedCasing, setSelectedCasing] = useState(casingDefault);
  const [selectedSymbol, setSelectedSymbol] = useState(symbolDefault);

  const handleRandomAPIWordSelector = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (e.target.value) {
      case "rickAndMorty":
        setSelectedUrl("https://rickandmortyapi.com/api/character/");
        setLimitOfResults(getRandomArbitrary(1, 52));
        refetch({});
        character && handleResult(character);

        break;
      case "starWars":
        setSelectedUrl("https://swapi.dev/api/people/");
        setLimitOfResults(getRandomArbitrary(1, 82));
        refetch({});
        {
          character && handleResult(character);
        }
        break;
      case "pokemon":
        setSelectedUrl("https://pokeapi.co/api/v2/pokemon/");
        setLimitOfResults(getRandomArbitrary(1, 500));
        refetch({});
        {
          character && handleResult(character);
        }
        break;
      default:
        break;
    }
  };

  const handleCasing = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCasing(e.target.value);
  };

  const handleSymbol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target.value);
  };

  const { character, isLoading, refetch } = useFetchCharacter(
    selectedUrl,
    limitOfResults
  );

  useEffect(() => {
    setIsApiCharacterLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (character) {
      const formatedCharacter = formatFullNameCasing({
        character,
        selectedCasing,
        selectedSymbol,
      });
      handleResult(formatedCharacter);
    }
  }, [character, selectedCasing, selectedSymbol]);

  return (
    <>
      <select
        placeholder="--Please choose an option--"
        className={styles.select}
        onChange={handleRandomAPIWordSelector}
      >
        <option value="">--Please choose an option--</option>
        <option
          value="rickAndMorty"
          onSelect={() => setApiCharacterSelected("rickAndMorty")}
        >
          Rick And Morty
        </option>
        <option
          value="starWars"
          onSelect={() => setApiCharacterSelected("starWars")}
        >
          Star Wars
        </option>
        <option
          onSelect={() => setApiCharacterSelected("pokemon")}
          value="pokemon"
        >
          Pokemon
        </option>
      </select>
      {casingValues && (
        <select
          className={styles.select}
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
          className={styles.select}
          onChange={handleSymbol}
          value={selectedSymbol}
        >
          {symbolValues.map((value) => (
            <option
              key={value}
              value={value}
              selected={value === symbolDefault}
            >
              {value}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
