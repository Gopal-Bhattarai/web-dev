import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const DarkModeContext = createContext();

const DarkModeState = ({children}) => {
  const [mode, setMode] = useLocalStorageState('darkMode', {
    defaultValue: true
  })

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? 'dark' : 'light',
        },
      }),
    [mode]
  );


  


  return (
    <DarkModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default DarkModeState;
