import { useEffect, useRef, useState } from "react";
import { useFetchCharacter } from "../hooks/useFetchCharacter";
import styles from "../shared/styles/Home.module.scss";
import { Select } from "../components/Select/Select";
import { CasingTypes, SymbolTypes, TaskTypes } from "../const/TaskTypes";
import { formatCasing } from "../helpers/formatCasing";

export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default function Home() {
  console.log("render home");
  const [apiCharacterSelected, setApiCharacterSelected] = useState("");
  const [selectedUrl, setSelectedUrl] = useState("");
  const [limitOfResults, setLimitOfResults] = useState(0);
  const [inputValues, setInputValue] = useState({
    versionNumber: "",
    teamName: "",
    randomWord: "",
    randomAdjective: "",
    typeOfTask: "",
  });

  const teamNameInput = useRef();

  const { character, isLoading, refetch } = useFetchCharacter(
    selectedUrl,
    limitOfResults
  );

  useEffect(() => {
    if (character) {
      setInputValue({ ...inputValues, randomWord: character });
    }
  }, [character]);

  const handleRandomAPIWordSelector = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (e.target.value) {
      case "rickAndMorty":
        setSelectedUrl("https://rickandmortyapi.com/api/character/");
        setLimitOfResults(getRandomArbitrary(1, 52));
        refetch({});
        console.log(character);
        character && setInputValue({ ...inputValues, randomWord: character });

        break;
      case "starWars":
        setSelectedUrl("https://swapi.dev/api/people/");
        setLimitOfResults(getRandomArbitrary(1, 82));
        refetch({});
        {
          character && setInputValue({ ...inputValues, randomWord: character });
        }
        break;
      case "pokemon":
        setSelectedUrl("https://pokeapi.co/api/v2/pokemon/");
        setLimitOfResults(getRandomArbitrary(1, 500));
        refetch({});
        {
          character && setInputValue({ ...inputValues, randomWord: character });
        }
        break;
      default:
        break;
    }
  };

  const handleRandomAdjective = async () => {
    const response = await fetch(
      "https://random-word-form.repl.co/random/adjective"
    );
    const data = await response.json();
    setInputValue({ ...inputValues, randomAdjective: data[0] });
  };

  const handleTypeOfTask = (typeOfTaskFormatted: string) => {
    setInputValue({ ...inputValues, typeOfTask: typeOfTaskFormatted });
  };

  return (
    <div className={styles.home}>
      <div className={styles.inputWrapper}>
        <p>Branch Name generator</p>

        <Select
          baseClassName={styles.select}
          handleResult={handleTypeOfTask}
          title="Type of Task"
          wordValues={Object.values(TaskTypes)}
          casingValues={[
            CasingTypes.LOWER,
            CasingTypes.FIRSTUPPER,
            CasingTypes.ALLUPPER,
          ]}
          symbolValues={[SymbolTypes.DASH, SymbolTypes.SLASH]}
        />

        <p>Team Name</p>
        <input
          type="text"
          name="teamName"
          id="teamName"
          onChange={(e) =>
            setInputValue({ ...inputValues, teamName: e.target.value })
          }
        />
        <p>Version Number</p>
        <input
          type="text"
          name="versionNumber"
          id="versionNumber"
          onChange={(e) =>
            setInputValue({ ...inputValues, versionNumber: e.target.value })
          }
        />
        <p>Random Adjective</p>
        <button onClick={handleRandomAdjective}>Random Adjective</button>
        <p>Random Word</p>
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

        {isLoading ? (
          <p>loading</p>
        ) : (
          <p>
            {inputValues.typeOfTask}

            {/* /{inputValues.teamName}-{inputValues.randomWord}-
            {inputValues.randomAdjective} */}
          </p>
        )}
      </div>
    </div>
  );
}

// minor-release/1.0.0-teamName/bug/randomWord
// major-release/1.0.0-teamName/feature/randomWord

// todo / todo - o primera / y resto -
