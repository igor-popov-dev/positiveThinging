import cn from 'classnames';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { feelingsItems3 as feelingsItems } from '../../data/feelings';
import { psyhologyList as lists } from '../../data/lists/psyhologyList';
import styles from './Main.module.css';



export const Main = () => {
	const randomize = (smth: unknown[]) => Math.floor(Math.random() * smth.length);
	// const navigate = useNavigate();
	const [phrases, setPhrases] = useState<string[]>([]);
	const [feelings, setFeelings] = useState<string[]>([]);
	const [currentListId, setCurrentListId] = useState<number>(1);
	const [phraseIndex, setPhraseIndex] = useState<number>(0);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	// const [phraseIndexInput, setPhraseIndexInput] = useState<string>('1');
	const [feelingIndex, setFeelingIndex] = useState<number>(randomize(feelings));
	const [isListDone, setIsListDone] = useState<boolean>(false);
	const [isActiveFeeling, setIsActiveFeeling] = useState<boolean>(true);
	const [isRandomizeList, setIsRandomizeList] = useState<boolean>(false);
	
	const goToStartList = () => {
		setPhraseIndex(0);
		// setPhraseIndexInput('1');
		setFeelingIndex(randomize(feelings));
		setIsListDone(false);
	};

	const handleClick = () => {
		setIsActiveFeeling(false);
		setPhraseIndex(value => {
			value++;
			if (value >= phrases.length) {
				setIsListDone(true);
			}
			return value === phrases.length ? 0 : value;
		});
		setFeelingIndex(value => {
			value++;
			return value === feelings.length ? 0 : value;
		});
		// setPhraseIndexInput(phraseIndex + 2 + '');

		if (isRandomizeList) {	
			setCurrentListId(randomize(lists) + 1);
		}
		setTimeout(()=>{
			setIsActiveFeeling(true);
		},100);
	};

	const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		if (!value) {
			return;
		}
		setCurrentListId(+value);
	};
	// const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
	// 	const value = e.target?.value;
	// 	if (!+value && value !== '') {
	// 		return;
	// 	}

	// 	if (+value > phrases.length || value === '0') {
	// 		return;
	// 	}
	// 	setPhraseIndexInput(value);
	// 	if (!value) {
	// 		return;
	// 	}
	// 	setPhraseIndex(+value - 1);
	// 	setFeelingIndex(value => {
	// 		value++;
	// 		return value === feelings.length ? 0 : value;
	// 	});
	// };

	useEffect(()=> {
		setPhrases(lists.find(item => item.id === currentListId)?.phrases as string[]);
		setFeelings(feelingsItems.map(item => item.name));
		goToStartList();
	}, [currentListId]);

	useEffect(()=> {
		setQuestionIndex(0);
	}, [phraseIndex]);

	const setRandomFeeling = () => {
		setFeelingIndex(randomize(feelings));
	};
	
	const currentList = lists.find(item => item.id === currentListId);
	const currentQuestions = currentList?.questions;
	const currentPhrase =  phrases[phraseIndex] ? `${phrases[phraseIndex]}` : 'тут будет описан вопрос';
	const currentTitle = currentQuestions?.[questionIndex] ?? 'Вопрос';

	// const yes = () => {
	// 	setQuestionIndex( value => {
	// 		value++;
	// 		if (value === currentQuestions?.length) {
	// 			handleClick();
	// 			return 0;
	// 		}
	// 		return value;
	// 	});
	// };

	// const no = () => {
	// 	handleClick();
	// 	setQuestionIndex(0);
	// };

	const toggleRundomize = () => {
		setIsRandomizeList(value => !value);
	};
	return (
		// <> <Header handleSelectChange={handleSelectChange} currentList={currentList} isRandomizeList={isRandomizeList} toggleRundomize={toggleRundomize} />
		<> <Header title={'Выбор темы'}>
			<div className={styles.theme}>
				<select className={styles.select} onChange={handleSelectChange} value={currentList?.id}>
					{lists.map(item => <option value={item.id}>{item.theme}</option>)}
				</select>
				<div className={styles.text}>{currentList?.goal}</div>
				<button className={cn(styles['shuffle-button'],{[styles.active]: isRandomizeList})} onClick={toggleRundomize}>
					<svg fill="#FFF" width="20px" height="20px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
						<g fill-rule="evenodd">
							<path d="M47.813 71.467l36.415-.012c2.211 0 5.129 1.393 6.52 3.118l22.522 27.923-10.972 11.499c-.763.8-1.929.738-2.599-.131L82.43 91.477c-.672-.872-2.112-1.577-3.21-1.575l-29.479.055a1.98 1.98 0 0 1-1.986-1.993l.059-16.497z"/>
							<path d="M49.2 166.329a1.904 1.904 0 0 0-1.958 1.963l.303 14.054a2.092 2.092 0 0 0 2.042 2.034l34.042.55c2.212.035 5.14-1.32 6.544-3.03l74.103-90.29h15.474l-22.104 26.93h19.1c1.66 0 3.902-.988 5.026-2.226l23.499-25.87c4.086-4.497 3.968-11.673-.268-16.033l-22.46-23.115c-1.543-1.587-4.583-2.874-6.796-2.874H160.65c-1.659 0-2.096.977-.964 2.195l20.064 21.587h-19.106c-2.208 0-5.129 1.394-6.523 3.111L81.023 165.38c-.693.854-2.16 1.528-3.255 1.507L49.2 166.33z"/>
							<path d="M140.208 139.822c1.451-1.663 3.72-1.586 5.067.167l19.001 24.754h15.474l-19.973-26.931h16.983c1.651 0 3.877 1.007 4.975 2.253l22.661 25.729c4.017 4.56 3.902 11.835-.271 16.265l-21.626 22.953c-1.518 1.612-4.539 2.918-6.743 2.918h-12.989c-1.65 0-2.144-1.049-1.11-2.331l18.093-22.451h-20.096c-2.213 0-5.153-1.389-6.547-3.08l-22.06-26.75c-.704-.853-.68-2.226.038-3.048l9.123-10.448z"/>
						</g>
					</svg>Переключать темы</button>
				<p className={styles.defenition}>
					- Если переключатель включен, при нажатии кнопки "Следущий вопрос", будет происходить смена темы случайным образом. <br />
					- Если переключатель выключен, будет происходить смена вопросов в рамках выбранной темы.
				</p>
					
			</div>
			{/* <div className={styles.text}>{currentList?.goal}</div> */}
		</Header>
		<div className={styles.wrapper}>
			{isListDone && <div style={{display: 'block', textAlign: 'center'}}>
				<h1 className={styles.text}>DONE!</h1>
				<Button onClick={goToStartList}>Начать заново</Button>
				{/* <Button  onClick={() => navigate('/training/final')}>Закончить</Button> */}
			</div>}
			{!isListDone &&<>
				{/* <div className={styles.theme}>
						<select className={styles.select} onChange={handleSelectChange} value={currentList?.id}>
							{lists.map(item => <option value={item.id}>{item.theme}</option>)}
						</select>
						<button className={cn(styles['shuffle-button'],{[styles.active]: isRandomizeList})} onClick={toggleRundomize}>
							<svg fill="#FFF" width="20px" height="20px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
								<g fill-rule="evenodd">
									<path d="M47.813 71.467l36.415-.012c2.211 0 5.129 1.393 6.52 3.118l22.522 27.923-10.972 11.499c-.763.8-1.929.738-2.599-.131L82.43 91.477c-.672-.872-2.112-1.577-3.21-1.575l-29.479.055a1.98 1.98 0 0 1-1.986-1.993l.059-16.497z"/>
									<path d="M49.2 166.329a1.904 1.904 0 0 0-1.958 1.963l.303 14.054a2.092 2.092 0 0 0 2.042 2.034l34.042.55c2.212.035 5.14-1.32 6.544-3.03l74.103-90.29h15.474l-22.104 26.93h19.1c1.66 0 3.902-.988 5.026-2.226l23.499-25.87c4.086-4.497 3.968-11.673-.268-16.033l-22.46-23.115c-1.543-1.587-4.583-2.874-6.796-2.874H160.65c-1.659 0-2.096.977-.964 2.195l20.064 21.587h-19.106c-2.208 0-5.129 1.394-6.523 3.111L81.023 165.38c-.693.854-2.16 1.528-3.255 1.507L49.2 166.33z"/>
									<path d="M140.208 139.822c1.451-1.663 3.72-1.586 5.067.167l19.001 24.754h15.474l-19.973-26.931h16.983c1.651 0 3.877 1.007 4.975 2.253l22.661 25.729c4.017 4.56 3.902 11.835-.271 16.265l-21.626 22.953c-1.518 1.612-4.539 2.918-6.743 2.918h-12.989c-1.65 0-2.144-1.049-1.11-2.331l18.093-22.451h-20.096c-2.213 0-5.153-1.389-6.547-3.08l-22.06-26.75c-.704-.853-.68-2.226.038-3.048l9.123-10.448z"/>
								</g>
							</svg>Переключать темы</button>
					
					</div>
					<div className={styles.text}>{currentList?.goal}</div> */}
				{/* <div className={styles.text}>всего карточек в списке: {phrases.length}</div> */}
				{/* <input className={styles.input} type="number" pattern="[0-9]*" min="1" max={phrases.length} value={phraseIndexInput} onChange={handleChange}/> */}
				{/* <input className={styles.input} type="range" min="1" max={phrases.length} step="1" value={phraseIndexInput || 0} onChange={handleChange}></input> */}
				{/* <h1 className={styles.h1} dangerouslySetInnerHTML={{ __html: currentTitle }}>{currentTitle}</h1> */}
				<h1 className={styles.h1} dangerouslySetInnerHTML={{ __html: currentTitle }} />
				<h2 className={styles.h2}>{currentPhrase}</h2>
				<h3 className={cn(styles.h3, {[styles.activeFeeling]: isActiveFeeling})}>{feelings[feelingIndex]} <span className={styles.randomize} onClick={setRandomFeeling}>🎲</span></h3>
				<p className={styles.defenition}>{feelingsItems[feelingIndex].description}</p>
				{/* <Button appearence="big" onClick={handleClick}>Следущий</Button> */}
				<div className={styles.buttons}>
					{/* <Button appearence="big" onClick={yes}>Да (Что это было?)</Button> */}
					{/* <Button appearence="big" onClick={no}>Нет</Button> */}
					<Button appearence="big" onClick={handleClick}>Следущий вопрос</Button>
				</div>
			</>}
			{/* {!isListDone && <div className="footer" style={{marginTop: 'auto', padding: '20px'}}>
				<Button  onClick={() => navigate('/training/final')}>Закончить</Button>
			</div>} */}
		</div>
		</>
	);
};