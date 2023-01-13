export type LeetSpeakMap = Record<string, string[]>;

export const getDefaultLeetSpeakMap = (): LeetSpeakMap => ({
	a: ['4', '@'],
	b: ['13', '8', '18', '6'],
	c: ['(', '<', '['],
	d: [],
	e: ['3'],
	f: ['7'],
	g: ['9', '6'],
	h: ['#', '4', '(-)'],
	i: ['!', '1'],
	j: ['_7', '9'],
	k: ['1<'],
	l: ['1'],
	m: ['44', '^^', '[]V[]', '[V]'],
	n: [],
	o: ['0'],
	p: [],
	q: ['O_', '9', '(,)'],
	r: ['12', 'l2'],
	s: ['5', '$'],
	t: ['7', '+', 'T'],
	u: ['(_)', '[_]'],
	v: [],
	w: ['VV', '2u'],
	x: ['%', '*', '><', '}{', ')('],
	y: [],
	z: ['5', '7_', '>_'],
});