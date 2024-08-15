import { Button } from '@mui/material'
import React from 'react'

interface CustomButtonProps {
  text: string;
  toggle?: boolean; 
  onClick?: () => void;
}

const CustomButton :React.FC<CustomButtonProps> = ({ text, toggle = false, onClick })=> {
  return (
   
    <Button
    style={{
      width: "90%",
      backgroundColor: toggle?"white":"black",
     border: toggle?"1px solid #d3d3d3":"",
      color: toggle?"black":"white",
      padding: 12,
      borderRadius: 9,
      textTransform: "none",
      fontWeight: "bolder",
      fontSize: "16px",
      marginBottom: 10
    }}
    onClick={onClick}
  >
    {text}
  </Button>
  )
}

export default CustomButton