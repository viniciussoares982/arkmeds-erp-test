import { ButtonHTMLAttributes } from 'react';
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button className='cta' {...rest}>
      {title}
    </button>
  )
}

export default Button