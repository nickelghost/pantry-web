import { type Item } from './Item';

export type Location = {
	id: string;
	name: string;
	items?: Item[];
};
