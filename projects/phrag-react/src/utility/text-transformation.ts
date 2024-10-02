export function capitalize(word: string, start: number = 0, end: number = 1): string {
	let prefix = start > 0 ? word.substring(0, start) : '';
	let change = word.substring(start, end).toUpperCase();
	let suffix = word.substring(end);
	return prefix + change + suffix;
}