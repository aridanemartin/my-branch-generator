import { useEffect, useState } from "react";

export type PokemonApi = {
  character: string | undefined;
  isLoading: boolean;
};

interface IUseFetchCharacter {
  url: string;
  characterNumber: number;
}

export const useFetchCharacter = (url: string, characterNumber: number) => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldRefetch, refetch] = useState({});

  useEffect(() => {
    console.log("useEffect");
    fetchCharacter();
  }, [shouldRefetch]);

  const fetchCharacter = async () => {
    if (!url) return;

    try {
      setIsLoading(true);

      const response = await fetch(`${url}${characterNumber}`);
      const data = await response.json();
      console.log("===>", data?.name);
      setCharacter(data?.name);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { character, isLoading, refetch };
};
