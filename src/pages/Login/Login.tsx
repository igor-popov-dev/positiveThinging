import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export const Login = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	},[jwt, navigate]);

	const sendLogin = async(email:string, password: string) => {
		dispatch(login({email, password}));
	};

	const submit = async(e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const {email, password}  = target;
		await sendLogin(email.value, password.value);
	};

	return (
		<div className={styles['login']}>
			<Headling>Вход</Headling>
			{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor="email">Ваш email</label>
					<Input id="email" name="email" placeholder='Email'/>
				</div>
				<div className={styles['field']}>
					<label htmlFor="password">Ваш email</label>
					<Input id="password" name="password" type="password"  placeholder='Пароль'/>
				</div>
				<Button appearence='big'>Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<div>
					<Link to="/auth/register" >Зарегистрироваться</Link>
				</div>
			</div>
		</div>
	);
};