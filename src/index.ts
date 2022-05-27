import { defineModule } from '@directus/extensions-sdk';
import ModuleComponent from './module.vue';

export default defineModule({
	id: 'hourclock',
	name: '$hourclock.module.name',
	icon: 'pie_chart',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
		{
			path: '/hourclock/:id',
			component: ModuleComponent,
		},
	],
});
