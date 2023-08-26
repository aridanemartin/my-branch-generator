import { CasingTypes } from "../const/TaskTypes";

export const formatCasing = (
  str: string,
  casing: CasingTypes
): string | null => {
  if (!str) return null;
  console.log(str, casing);
  if (casing === CasingTypes.LOWER) {
    return str.toLowerCase();
  } else if (casing === CasingTypes.FIRSTUPPER) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  } else if (casing === CasingTypes.ALLUPPER) {
    return str.toUpperCase();
  }

  return str;
};
