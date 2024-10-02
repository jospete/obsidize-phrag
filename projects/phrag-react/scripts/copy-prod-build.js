import fs from 'fs';
import path from 'path';

async function main() {
	const cwd = process.cwd();
	const inputDirectory = path.resolve(cwd, 'dist');
	const outputDirectory = path.resolve(cwd, '..', '..', 'docs');
	console.log(`copy build ${inputDirectory} -> ${outputDirectory}`);

	if (!fs.existsSync(outputDirectory)) {
		fs.mkdirSync(outputDirectory, { recursive: true });
	}

	fs.rmSync(outputDirectory, { recursive: true, force: true });
	fs.cpSync(inputDirectory, outputDirectory, { recursive: true });
}

main().catch(console.error);
