export interface Category {
	id: string;
	label: string;
	color: string;
	species: string[];
	ripeningMonths: number[];
	/** Friendly species list shown under the legend label, e.g. "(Choke, Black, Pin)". */
	legend?: string;
}

export const CATEGORIES: Category[] = [
	{
		id: 'apple',
		label: 'Apple',
		color: '#c8334a',
		species: ['Apple', 'Apple, common', 'Apple, wild crab', 'Apple, Siberian'],
		ripeningMonths: [9, 10, 11],
		legend: 'Common, Wild Crab, Siberian'
	},
	{
		id: 'cherry',
		label: 'Cherry',
		color: '#d87090',
		species: [
			'Cherry',
			'Cherry, choke',
			'Cherry, choke Shubert',
			'Cherry, black',
			'Cherry, pin',
			'Cherry, sweet',
			'Cherry, sour'
		],
		ripeningMonths: [6, 7],
		legend: 'Choke, Choke Shubert, Black, Pin, Sweet, Sour'
	},
	{
		id: 'peach',
		label: 'Peach',
		color: '#e89060',
		species: ['Peach'],
		ripeningMonths: [7, 8, 9]
	},
	{
		id: 'pear',
		label: 'Pear',
		color: '#b8c448',
		species: ['Pear'],
		ripeningMonths: [8, 9, 10, 11]
	},
	{
		id: 'plum',
		label: 'Plum',
		color: '#7b5e9e',
		species: ['Plum', 'Plum, Canada'],
		ripeningMonths: [7, 8, 9],
		legend: 'Common, Canada'
	},
	{
		id: 'apricot',
		label: 'Apricot',
		color: '#e5b97a',
		species: ['Apricot'],
		ripeningMonths: [7, 8]
	},
	{
		id: 'berry',
		label: 'Berry',
		color: '#3e6fa8',
		species: [
			'Mulberry',
			'Mulberry, red',
			'Hackberry',
			'Hackberry, Magnifica',
			'Hackberry, Ultra'
		],
		ripeningMonths: [7, 8, 9],
		legend: 'Mulberry, Red Mulberry, Hackberry, Hackberry Magnifica, Hackberry Ultra'
	},
	{
		id: 'nuts',
		label: 'Nuts',
		color: '#735039',
		species: [
			'Walnut, black',
			'Walnut, English',
			'Walnut',
			'Chestnut, American',
			'Chestnut, sweet',
			'Hazel, Turkish',
			'Hazel',
			'Hazel, American',
			'Butternut',
			'Butternut hybrid'
		],
		ripeningMonths: [9, 10, 11],
		legend:
			'Black Walnut, English Walnut, American Chestnut, Sweet Chestnut, Turkish Hazel, American Hazel, Hazel, Butternut, Butternut Hybrid'
	}
];

export const SPECIES_TO_CATEGORY = new Map<string, Category>(
	CATEGORIES.flatMap((c) => c.species.map((s) => [s, c] as const))
);
