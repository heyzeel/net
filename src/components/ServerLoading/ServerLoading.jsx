import React, { useEffect, useState } from 'react'
import "./ServerLoading.css"
import { CircularProgress, LinearProgress, Slide } from '@mui/material'

const ServerLoading = () => {

  return (
    <>
    <LinearProgress/>
    <div className='server-loading'>
        <div className='loading-message'>
        <h1>
            Shhh... The server is still snoozing. Waking it up, but it might need a cup of coffee first! It will take 1-2 minutes !
        </h1>
        </div>
    </div>
    </>
  )
}

export default ServerLoading
