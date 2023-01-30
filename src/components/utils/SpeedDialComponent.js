import { Print, Save, Share } from "@mui/icons-material"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"

const SpeedDialComponent = () => {
  return (
    <SpeedDial ariaLabel='Navigation speed dial'
    sx={{ position: 'absolute', bottom:16, right: 16}}
    icon={<SpeedDialIcon />} >

        <SpeedDialAction icon={<Save />} tooltipTitle='Save' />
        <SpeedDialAction icon={<Print />} tooltipTitle='Print' />
        <SpeedDialAction icon={<Share />} tooltipTitle='Share' />


    </SpeedDial>
  )
}

export default SpeedDialComponent
