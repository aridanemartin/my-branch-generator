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
}: IFormatFullNameCasing) => {
  let formatedFullName: string;
  switch (selectedCasing) {
    case CasingTypes.CAMEL:
      formatedFullName = "";
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
      formatedFullName = "";
      character.split(" ").forEach((word) => {
        formatedFullName += word[0].toUpperCase() + word.slice(1).toLowerCase();
      });
      break;
    case CasingTypes.SNAKE:
      formatedFullName = "";
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName = word.toLowerCase();
        } else {
          formatedFullName += "_" + word.toLowerCase();
        }
      });
      break;
    case CasingTypes.KEBAB:
      formatedFullName = "";
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName = word.toLowerCase();
        } else {
          formatedFullName += "-" + word.toLowerCase();
        }
      });
      break;
    case CasingTypes.ALLUPPER:
      formatedFullName = "";
      formatedFullName = character.replace(/\s+/g, "").toUpperCase();
      break;
    case CasingTypes.LOWER:
      formatedFullName = "";
      formatedFullName = character.replace(/\s+/g, "").toLowerCase();
      break;
    case CasingTypes.FIRSTUPPER:
      formatedFullName = "";
      character.split(" ").forEach((word, index) => {
        if (index === 0) {
          formatedFullName =
            word[0].toUpperCase() + word.slice(1).toLowerCase();
        } else {
          console.log(word.toLowerCase());
          formatedFullName += word.toLowerCase();
        }
      });
  }
  console.log("==============>", formatedFullName);
  if (selectedSymbol !== "") {
    formatedFullName += selectedSymbol;
  }

  return formatedFullName;
};
