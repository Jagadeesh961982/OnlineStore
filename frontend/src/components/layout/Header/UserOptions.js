import React, { useState } from 'react'
import "./Header.css"
import SpeedDial from '@mui/material/SpeedDial';
import profile from '../../../images/Profile.png';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

const UserOptions = ({user}) => {
    const [open, setOpen] = useState(false)
    console.log(user.avatar)
  return (
    <>
        <SpeedDial 
                ariaLabel='SpeedDial tooltip example'
                sx={{ position: 'absolute', top: 16, right: 16 }}
                onClose={()=>setOpen(false)}
                onOpen={()=>setOpen(true)}
                open={open}
                icon={<img src={user.avatar.url?user.avatar.url:profile} alt={user.name} className='speedDialIcon' /> }
                >
        </SpeedDial>
    </>
  )
}

export default UserOptions