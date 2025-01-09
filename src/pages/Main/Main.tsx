import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { feelingsItems3 as feelingsItems } from '../../data/feelings';
import { psyhologyList as lists } from '../../data/lists/psyhologyList';
import styles from './Main.module.css';



export const Main = () => {
	const randomizeFeeling = () => Math.floor(Math.random() * feelings.length);
	const navigate = useNavigate();
	const [phrases, setPhrases] = useState<string[]>([]);
	const [feelings, setFeelings] = useState<string[]>([]);
	const [currentListId, setCurrentListId] = useState<number>(1);
	const [phraseIndex, setPhraseIndex] = useState<number>(0);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const [phraseIndexInput, setPhraseIndexInput] = useState<string>('1');
	const [feelingIndex, setFeelingIndex] = useState<number>(randomizeFeeling());
	const [isListDone, setIsListDone] = useState<boolean>(false);
	const [isActiveFeeling, setIsActiveFeeling] = useState<boolean>(true);
	
	const goToStartList = () => {
		setPhraseIndex(0);
		setPhraseIndexInput('1');
		setFeelingIndex(randomizeFeeling());
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
		setPhraseIndexInput(phraseIndex + 2 + '');
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
	const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target?.value;
		if (!+value && value !== '') {
			return;
		}

		if (+value > phrases.length || value === '0') {
			return;
		}
		setPhraseIndexInput(value);
		if (!value) {
			return;
		}
		setPhraseIndex(+value - 1);
		setFeelingIndex(value => {
			value++;
			return value === feelings.length ? 0 : value;
		});
	};

	useEffect(()=> {
		setPhrases(lists.find(item => item.id === currentListId)?.phrases as string[]);
		setFeelings(feelingsItems.map(item => item.name));
		goToStartList();
	}, [currentListId]);

	useEffect(()=> {
		setQuestionIndex(0);
	}, [phraseIndex]);

	const setRandomFeeling = () => {
		setFeelingIndex(randomizeFeeling());
	};

	const currentQuestions = lists.find(item => item.id === currentListId)?.questions;
	const currentPhrase =  phrases[phraseIndex] ? `${phraseIndex + 1}. ${phrases[phraseIndex]}` : 'тут будет описан момент';
	const currentTitle = currentQuestions?.[questionIndex] ?? 'Вопрос';

	const yes = () => {
		setQuestionIndex( value => {
			value++;
			if (value === currentQuestions?.length) {
				handleClick();
				return 0;
			}
			return value;
		});
	};

	const no = () => {
		handleClick();
		setQuestionIndex(0);
	};
	return (
		<div className={styles.wrapper}>
			{isListDone && <div style={{display: 'block', textAlign: 'center'}}>
				<h1 className={styles.text}>DONE!</h1>
				<Button onClick={goToStartList}>Начать заново</Button>
				<br />
				<br />
				<Button  onClick={() => navigate('/training/final')}>Закончить</Button>
			</div>}
			{!isListDone &&<>
				<select className={styles.select} onChange={handleSelectChange}>
					{lists.map(item => <option value={item.id}>{item.theme}</option>)}
				</select>
				<div className={styles.text}>всего карточек в списке: {phrases.length}</div>
				<input className={styles.input} type="number" pattern="[0-9]*" min="1" max={phrases.length} value={phraseIndexInput} onChange={handleChange}/>
				<input className={styles.input} type="range" min="1" max={phrases.length} step="1" value={phraseIndexInput || 0} onChange={handleChange}></input>
				{/* <h1 className={styles.h1} dangerouslySetInnerHTML={{ __html: currentTitle }}>{currentTitle}</h1> */}
				<h1 className={styles.h1} dangerouslySetInnerHTML={{ __html: currentTitle }} />
				<h2 className={styles.h2}>{currentPhrase}</h2>
				<h3 className={cn(styles.h3, {[styles.activeFeeling]: isActiveFeeling})}>{feelings[feelingIndex]} <span className={styles.randomize} onClick={setRandomFeeling}>🎲</span></h3>
				<p className={styles.defenition}>{feelingsItems[feelingIndex].description}</p>
				{/* <Button appearence="big" onClick={handleClick}>Следущий</Button> */}
				<div className={styles.buttons}>
					<Button appearence="big" onClick={yes}>Да (Что это было?)</Button>
					<Button appearence="big" onClick={no}>Нет</Button>
				</div>
			</>}
			{!isListDone && <div className="footer" style={{marginTop: 'auto', padding: '20px'}}>
				<Button  onClick={() => navigate('/training/final')}>Закончить</Button>
			</div>}
		</div>
	);
};