import { FC } from 'react';
import {AuthInputProps} from './AuthInput.props.ts';
// import cn from 'classnames';
import styles from './AuthInput.module.css';

const AuthInput: FC<AuthInputProps> = ({id, label, type, placeholder, ...props}) => {
	return (
		<div>
			<label className={styles['label']} htmlFor={id}>{label}</label>
			<input className={styles['input']} type={type} id={id} placeholder={placeholder} {...props} />
		</div>
	);
};

export default AuthInput;