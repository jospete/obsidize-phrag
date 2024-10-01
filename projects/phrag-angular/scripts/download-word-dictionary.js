const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { mkdirpSync } = require('./utility');

async function main() {

	const cwd = process.cwd();
	const tempDirectory = path.resolve(cwd, 'tmp');
	const sourceUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
	const downloadPath = path.resolve(tempDirectory, 'word-list.txt');
	const { data } = await axios.get(sourceUrl);

	mkdirpSync(tempDirectory);
	fs.writeFileSync(downloadPath, data, 'utf-8');
}

main().catch(console.error);