#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { mkdirpSync } = require('./utility');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function isValidWord(word) {
	return word.length >= 4 && word.length <= 7 && word[0] !== word[1];
}

function serializeWord(word) {
	return `'${word}'`;
}

function sanitizeInputWord(word) {
	return word.trim().replace(/\s/g, '');
}

function readDictionaryList(inputFile) {
	const input = fs.readFileSync(inputFile).toString();
	return input.split('\n').map(sanitizeInputWord);
}

function generateLetterChunk(letter, wordList, outputFilePath) {
	const serializedWords = wordList.filter(isValidWord).map(serializeWord).join(',');
	const output = `export const ${letter} = [${serializedWords}];`;
	fs.writeFileSync(outputFilePath, output, 'utf8');
}

function sortByFirstLetter(words) {
	const result = {};

	for (const word of words) {
		const firstLetter = word.substring(0, 1);
		let wordsStartingWith = result[firstLetter];

		if (!wordsStartingWith) {
			wordsStartingWith = [];
			result[firstLetter] = wordsStartingWith;
		}

		wordsStartingWith.push(word);
	}

	return result;
}

function generateDictionaryChunks(wordInputFile, outputDirectory) {
	mkdirpSync(outputDirectory);

	const wordsTable = sortByFirstLetter(readDictionaryList(wordInputFile));

	for (const letter of alphabet) {
		const wordList = wordsTable[letter];
		if (wordList) {
			const outputFilePath = path.resolve(outputDirectory, `${letter}.ts`);
			generateLetterChunk(letter, wordList, outputFilePath);
		}
	}
}

function generateDictionaryModule(outputDirectory) {
	const outputFilePath = path.resolve(outputDirectory, `index.ts`);
	let output = `export const chunks = {`;
	for (const letter of alphabet) {
		output += `\n\t${letter}: () => import('./${letter}').then((m) => m.${letter}),`;
	}
	output += `\n};\n`;

	fs.writeFileSync(outputFilePath, output, 'utf8');
}

async function main() {
	const cwd = process.cwd();
	const inputFile = path.resolve(cwd, 'tmp/word-list.txt');
	const outputDirectory = path.resolve(cwd, 'src/app/@generated/dictionary');

	if (fs.existsSync(inputFile)) {
		generateDictionaryChunks(inputFile, outputDirectory);
		generateDictionaryModule(outputDirectory);
	} else {
		return Promise.reject(`input file does not exist -> ${inputFile}`);
	}
}

main().catch(console.error);
