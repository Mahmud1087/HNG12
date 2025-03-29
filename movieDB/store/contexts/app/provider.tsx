"use client";

import { useState } from "react";
import { AppContext } from "./context";

export type AppContextType = {
  movieId: number | null;
  setMovieId: React.Dispatch<React.SetStateAction<number | null>>;
};

const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [movieId, setMovieId] = useState<number | null>(null);

  return (
    <AppContext.Provider
      value={{
        movieId,
        setMovieId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
