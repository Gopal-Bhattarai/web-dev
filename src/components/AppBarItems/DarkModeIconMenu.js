import { IconButton, useTheme } from '@mui/material'
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DarkModeIconMenu = ({setMode}) => {
  const theme = useTheme();

  return (
    <IconButton
          onClick={() => setMode((e) => !e)}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
    </IconButton>
  )
}

export default DarkModeIconMenu
