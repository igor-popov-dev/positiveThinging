import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

const CartItem = (props: CartItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.add(props.id));
	};
	const decrease = () => {
		dispatch(cartActions.decrease(props.id));
	};
	const remove = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button onClick={decrease} className={styles['minus']}>
					<img src="/minus-icon.svg" alt="Удалить из корзины" />
				</button>
				<div className={styles['number']}>{props.count}</div>
				<button onClick={increase} className={styles['plus']}>
					<img src="/plus-icon.svg" alt="Добавить в корзину" />
				</button>
				<button onClick={remove} className={styles['remove']}>
					<img src="/delete-icon.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
		
	);
};

export default CartItem;