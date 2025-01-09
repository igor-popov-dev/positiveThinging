import ProductCard from '../../../components/ProductCard/ProductCard';
import styles from './MenuList.module.css';
import { MenuListProps } from './MenuList.props';

const MenuList = ({products}: MenuListProps) => {
	return <div className={styles.wrapper}>
		{products.map(p => (
			<ProductCard 
				key={p.id}
				id={p.id}				
				rating={p.rating}				
				price={p.price}			
				name={p.name}				
				image={p.image}				
				description={p.ingredients.join(', ')}				
			/>
		))}
	</div>;
};

export default MenuList;