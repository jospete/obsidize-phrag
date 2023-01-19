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

async function main() {

	const cwd = process.cwd();
	const inputFile = path.resolve(cwd, 'tmp/word-list.txt');

	if (!fs.existsSync(inputFile))
		return Promise.reject(`input file does not exist -> ${inputFile}`);

	const outputDirectory = path.resolve(cwd, 'src/app/@generated');
	const outputFile = path.resolve(outputDirectory, 'dictionary.ts');

	mkdirpSync(outputDirectory);

	const input = fs.readFileSync(inputFile).toString();
	const outputList = input.split('\n').map(v => v.trim().replace(/\s/g, ''));
	const outputBytes = new Uint8Array(Buffer.from(JSON.stringify(outputList), 'utf-8').buffer);
	const compressedContent = Buffer.from(gzip(outputBytes)).toString('base64');
	const output = createModuleOutput({ compressedContent });

	fs.writeFileSync(outputFile, output, 'utf-8');
}

main().catch(console.error);