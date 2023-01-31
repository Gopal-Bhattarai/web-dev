import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
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

      const [toast, setToast] = useState({
        'message': "Task Completed",
        'timeout': 3000,
        'severity': "success",
        'show': false,
      })
  


  return (
    <DarkModeContext.Provider value={{ mode, setMode, toast, setToast }}>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {children}
        </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default DarkModeState;
