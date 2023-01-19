import { ungzip } from 'pako';

const base64ToUint8Array = (value: string): Uint8Array => Uint8Array.from(
	atob(value).split('').map((c: string) => c.charCodeAt(0))
);

const ungzipAscii = (value: Uint8Array): string => Array.from(ungzip(value))
	.map((cc: number) => String.fromCharCode(cc))
	.join('');

export const inflateJson = (value: string): any => JSON.parse(
	ungzipAscii(base64ToUint8Array(value))
);