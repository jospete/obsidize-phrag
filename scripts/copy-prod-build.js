const fs = require('fs');
const path = require('path');
const { mkdirpSync } = require('./utility');

async function main() {

	const cwd = process.cwd();
	const inputDirectory = path.resolve(cwd, 'dist/obsidize-phrag');
	const outputDirectory = path.resolve(cwd, 'docs');

	mkdirpSync(outputDirectory);
	fs.rmSync(outputDirectory, { recursive: true, force: true });
	fs.cpSync(inputDirectory, outputDirectory, { recursive: true });
}

main().catch(console.error);