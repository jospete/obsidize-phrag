#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { gzip } = require('pako');
const { mkdirpSync } = require('./utility');

function createModuleOutput(options) {
	return `// AUTO-GENERATED, DO NOT MODIFY
import { inflateJson } from '../utility/compression';

export const getAllWords = (): string[] => inflateJson(\`${options.compressedContent}\`);`;
}

function readDictionaryList(inputFile) {
	const input = fs.readFileSync(inputFile).toString();
	return input.split('\n').map(v => v.trim().replace(/\s/g, ''));
}

function compressAndSerializeObject(value) {
	const outputBytes = new Uint8Array(Buffer.from(JSON.stringify(value), 'utf-8').buffer);
	return Buffer.from(gzip(outputBytes)).toString('base64');
}

async function main() {

	const cwd = process.cwd();
	const inputFile = path.resolve(cwd, 'tmp/word-list.txt');

	if (!fs.existsSync(inputFile))
		return Promise.reject(`input file does not exist -> ${inputFile}`);

	const outputDirectory = path.resolve(cwd, 'src/app/@generated');
	const outputFile = path.resolve(outputDirectory, 'dictionary.ts');

	mkdirpSync(outputDirectory);

	const compressedContent = compressAndSerializeObject(readDictionaryList(inputFile));
	const output = createModuleOutput({ compressedContent });

	fs.writeFileSync(outputFile, output, 'utf-8');
}

main().catch(console.error);