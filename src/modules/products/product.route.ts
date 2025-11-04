import { ProductRoute } from '../../common';
import { ProductController } from './product.controller';

export const productRoutes: ProductRoute[] = [
    {
        method: 'get',
        route: '/products',
        controller: ProductController,
        action: 'getProducts',
    },
];
