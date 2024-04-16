export type Item = {
	id: string;
	name: string;
	type: null | string;
	tags: string[];
	boughtAt: Date;
	openedAt: null | Date;
	expiresAt: null | Date;
	lifespan: null | number;
	price: null | number;
	locationId: null | string;
};
