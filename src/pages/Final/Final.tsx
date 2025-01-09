import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Final.module.css';

export const Final = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<h1 className={styles.h1}>Инструкция по завершению сессии</h1>
				<ol className={styles.ol}>
					<li>Быстро просмотрите мысленно сессию, которую вы только что закончили.</li>
					<li>Мысленно просмотрите ещё раз то, что вы делали, обращая особое внимание на то, как вы сидели.</li>
					<li>Мысленно пройдитесь по сессии от начала до конца, обращая внимание только на то, что вы делали руками, и на вещи в окружающем мире, звуки которых вы слышали во время сессии.</li>
					<li>Задержите ваше внимание на каком-нибудь приятном предметe, находящемся сейчас около вас.</li>
				</ol>

				<p className={styles.note}>
    			Проходите этот список снова и снова, пока вы не почувствуете себя бодрым в отношении вашего непосредственного окружения.
				</p>
			</div>
			<Button  onClick={() => navigate('/training/')}>На главную</Button>
		</div>
	);
};