const fs = require('fs');
const path = require('path');
const { mkdirpSync } = require('./utility');

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
	const output = `export const getAllWords = (): string[] => JSON.parse(\`${JSON.stringify(outputList)}\`);`;

	fs.writeFileSync(outputFile, output, 'utf-8');
}

main().catch(console.error);