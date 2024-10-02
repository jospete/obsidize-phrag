export function randomUint32(): number {
	const buffer = new Uint32Array(1);
	crypto.getRandomValues(buffer);
	return buffer[0];
}

export function coinflip(): boolean {
	return randomUint32() > randomUint32();
}

export function choose<T>(items: T[]): T {
	return items[randomUint32() % items.length];
}

export function randomRange(minInclusive: number, maxExclusive: number): number {
	return (randomUint32() % (maxExclusive - minInclusive)) + minInclusive;
}

export function combineRandom(a: string, b: string): string {
	return coinflip() ? (a + b) : (b + a);
}