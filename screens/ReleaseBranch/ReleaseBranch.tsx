import { useState } from "react";
// import styles from "../../shared/styles/Home.module.scss";
import { Select } from "../../components/Select/Select";
import { CasingTypes, SymbolTypes, TaskTypes } from "../../const/TaskTypes";
import { InputWithSymbol } from "../../components/InputWithSymbol/InputWithSymbol";
import { RandomWordSelector } from "../../components/RandomWordSelector/RandomWordSelector";
import styles from "./ReleaseBranch.module.scss";

export default function ReleaseBranch() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValue] = useState({
    versionNumber: "1.0.0",
    teamName: "insertYourTeamName-",
    randomWord: "randomWord-",
    randomAdjective: "randomAdjective",
    typeOfTask: "feature/",
  });

  console.log(inputValues);
  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handleRandomAdjective = async () => {
    const response = await fetch(
      "https://random-word-form.repl.co/random/adjective"
    );
    const data = await response.json();
    setInputValue({ ...inputValues, randomAdjective: data[0] });
  };

  const handleTypeOfTask = (typeOfTask: string) => {
    setInputValue({ ...inputValues, typeOfTask });
  };

  const handleTeamName = (teamName: string) => {
    setInputValue({ ...inputValues, teamName });
  };

  const handleVersionNumber = (versionNumber: string) => {
    setInputValue({ ...inputValues, versionNumber });
  };

  const handleRandomWord = (randomWord: string) => {
    setInputValue({ ...inputValues, randomWord });
  };

  return (
    <div className={styles.home}>
      <div className={styles.inputWrapper}>
        <h1 className={styles.mainTitle}>Branch Name generator</h1>

        <h2 className={styles.title}>Type of task</h2>
        <Select
          baseClassName={styles.select}
          handleResult={handleTypeOfTask}
          wordValues={Object.values(TaskTypes)}
          casingValues={[
            CasingTypes.LOWER,
            CasingTypes.FIRSTUPPER,
            CasingTypes.ALLUPPER,
          ]}
          defaultName="feature"
          defaultSymbol={SymbolTypes.SLASH}
          symbolValues={[SymbolTypes.HYPHEN, SymbolTypes.SLASH]}
        />
        <h2 className={styles.title}>Team Name</h2>
        <InputWithSymbol
          handleResult={handleTeamName}
          name="teamName"
          defaultSymbol={SymbolTypes.HYPHEN}
          defaultValue="insertYourTeamName"
        />
        <h2 className={styles.title}>Version Number</h2>
        <InputWithSymbol
          handleResult={handleVersionNumber}
          name="versionNumber"
          defaultSymbol={SymbolTypes.HYPHEN}
          defaultValue="1.0.0"
        />
        <h2 className={styles.title}>Random Adjective</h2>
        <button onClick={handleRandomAdjective}>Random Adjective</button>
        <h2 className={styles.title}>Random Word</h2>
        <RandomWordSelector
          handleResult={handleRandomWord}
          setIsApiCharacterLoading={handleLoading}
          casingValues={[
            CasingTypes.CAMEL,
            CasingTypes.PASCAL,
            CasingTypes.SNAKE,
            CasingTypes.KEBAB,
            CasingTypes.ALLUPPER,
            CasingTypes.FIRSTUPPER,
            CasingTypes.LOWER,
          ]}
          casingDefault={CasingTypes.KEBAB}
          symbolValues={[SymbolTypes.HYPHEN, SymbolTypes.SLASH]}
          symbolDefault={SymbolTypes.SLASH}
        />

        <h2 className={styles.title}>Copy your branch</h2>

        {isLoading ? (
          <p>loading</p>
        ) : (
          <p>
            {inputValues.typeOfTask}
            {inputValues.versionNumber}
            {inputValues.teamName}
            {inputValues.randomWord}
            {inputValues.randomAdjective}
          </p>
        )}
      </div>
    </div>
  );
}

// feature/yoda-do-whatever-you-want
// minor-release/1.0.0-teamName/bug/randomWord
// major-release/1.0.0-teamName/feature/randomWord

// todo / todo - o primera / y resto -
