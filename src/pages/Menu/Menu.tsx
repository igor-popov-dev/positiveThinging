import axios, { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import MenuList from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string | undefined>();

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const getMenu = async (name?: string) => {
		setIsLoading(true);
		try {
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
        			name
      			}
			});
			setProducts(data);
		} catch(e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			return;
		} finally {
			setIsLoading(false);
		}
	};

	const updateFilter = async (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setFilter(inputValue);
	};

	

	const noProducts = products.length === 0 && !isLoading;
	return (
		<>
			<div className={styles['head']}>
				<Headling>Меню</Headling>
				<Search value={filter} onChange={updateFilter} placeholder='Введите блюдо или состав'/ >
			</div>
			<div>
				{noProducts  && <>Не найдено блюд по запросу</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <>Загружаем продукты...</>}
				{error && <>{error}</>}
			</div>
		</>
	);
}

export default Menu;
