import { useState } from 'react'
import styles from './button.module.css'

interface ButtonProps {
    style?: string;
    text?: string;
  }

function Button(props: ButtonProps) {
    var button_style = styles.default;

    switch(props.style){
        case "square":
            button_style = styles.square;
            break;
        case "colorful":
            button_style = styles.colorful;
            break;
        default:
            button_style = styles.default;
            break;
    };

    return(
        <button className={button_style}>{props.text}</button>
    )
}

export default Button
