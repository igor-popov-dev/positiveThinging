import cn from 'classnames';
import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';


const Button: FC<ButtonProps> = ({children, className, appearence = 'small', ...props}) => {
	return (
		<button className={cn(styles['button'],styles['accent'], {
			[styles['big']]: appearence === 'big',
			[styles['small']]: appearence === 'small'
		},className)} {...props}>
			{children}
		</button>
	);
};

export default Button;