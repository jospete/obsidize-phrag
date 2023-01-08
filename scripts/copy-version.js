const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

function replaceFileText(filePath, pattern, replacer) {
	const content = fs.readFileSync(filePath, 'utf-8');
	const updated = content.replace(pattern, replacer);
	fs.writeFileSync(filePath, updated, 'utf-8');
}

async function main() {

	const cwd = process.cwd();

	replaceFileText(
		path.resolve(cwd, 'src/environments/environment.common.ts'),
		/(version:? \')([\d\.]+)(\')/,
		`$1${version}$3`
	);
}

main().catch(console.error);