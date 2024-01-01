import React from "react";
import { CasingTypes } from "../const/TaskTypes";

interface IFormatFullNameCasing {
  character: string;
  selectedCasing: string;
  selectedSymbol: string;
}

export const formatFullNameCasing = ({
  character,
  selectedCasing,
  selectedSymbol,
}: IFormatFullNameCasing): string => {
  let formatedFullName: string = "";

  switch (selectedCasing) {
    case CasingTypes.CAMEL:
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName = word.toLowerCase();
        } else {
          formatedFullName +=
            word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
      });
      break;

    case CasingTypes.PASCAL:
      character.split(" ").forEach((word) => {
        formatedFullName += word[0].toUpperCase() + word.slice(1).toLowerCase();
      });
      break;

    case CasingTypes.SNAKE:
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName = word.toLowerCase();
        } else {
          formatedFullName += "_" + word.toLowerCase();
        }
      });
      break;

    case CasingTypes.KEBAB:
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName = word.toLowerCase();
        } else {
          formatedFullName += "-" + word.toLowerCase();
        }
      });
      break;

    case CasingTypes.ALLUPPER:
      formatedFullName = character.replace(/\s+/g, "").toUpperCase();
      break;

    case CasingTypes.LOWER:
      formatedFullName = character.replace(/\s+/g, "").toLowerCase();
      break;

    case CasingTypes.FIRSTUPPER:
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName =
            word[0].toUpperCase() + word.slice(1).toLowerCase();
        } else {
          formatedFullName += word.toLowerCase();
        }
      });
      break;

    default:
      // Handle unexpected values of selectedCasing
      break;
  }

  if (selectedSymbol !== "") {
    formatedFullName += selectedSymbol;
  }

  return formatedFullName;
};
