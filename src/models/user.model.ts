export interface User {
	id: string;
	name: string;
	username: string;
	address: { city: string; street: string };
	createdAt: Date;
}
