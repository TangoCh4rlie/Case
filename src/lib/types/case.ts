export type Case = {
	id: string;
	date: Date;
	description: string;
	color: string;
	place: string | null;
	photo: string[];
	people: string[];
	tag: string[];
	userId: string;
};

export enum Color {
	default = 'EBEEEE',
	joy = 'F1E813',
	anger = 'DF4545',
	zen = '39AA3D',
	sadness = '55B4C1',
	lazyness = '3D4998',
	motivated = 'EF8A14',
	love = 'DA48D4',
	anxious = '8652AE'
}
