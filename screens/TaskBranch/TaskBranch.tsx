import { useState } from "react";
// import styles from "../../shared/styles/Home.module.scss";
import { Select } from "../../components/Select/Select";
import { CasingTypes, SymbolTypes, TaskTypes } from "../../const/TaskTypes";
import { InputWithSymbol } from "../../components/InputWithSymbol/InputWithSymbol";
import { RandomWordSelector } from "../../components/RandomWordSelector/RandomWordSelector";
import styles from "./TaskBranch.module.scss";

export default function TaskBranch() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValue] = useState({
    typeOfTask: "feature/",
    taskDescription: "insertYourTaskDescription",
  });

  console.log(inputValues);
  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handleTypeOfTask = (typeOfTask: string) => {
    setInputValue({ ...inputValues, typeOfTask });
  };

  const handleTaskDescription = (taskDescription: string) => {
    setInputValue({ ...inputValues, taskDescription });
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
        <h2 className={styles.title}>Add Task description</h2>
        <InputWithSymbol
          handleResult={handleTaskDescription}
          name="teamName"
          defaultSymbol={SymbolTypes.HYPHEN}
          defaultValue="insertYourTaskDescription"
        />

        <h2 className={styles.title}>Copy your branch</h2>

        {isLoading ? (
          <p>loading</p>
        ) : (
          <p>
            {inputValues.typeOfTask}
            {inputValues.taskDescription}
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
