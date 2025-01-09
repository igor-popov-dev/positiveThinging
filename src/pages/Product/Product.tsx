import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { Product as ProductInterface } from '../../interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as ProductInterface;
	return (
		<>
			<Suspense fallback={<div>Loading post...</div>}>
				<Await resolve={data} errorElement={<p>Error loading post!</p>}>
					{(resolvedPost) => (
						<div>
							<h1>Product - {resolvedPost.name}</h1>
						</div>
					)}
				</Await>
			</Suspense>
		</>
	);
}