import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button className={styles.cta} {...rest}>
      {title}
    </button>
  )
}

export default Button