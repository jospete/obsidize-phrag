import fs from 'fs';
import { execSync } from 'child_process';

function git(cmd) {
	const combinedCmd = `git ${cmd}`;
	console.log(`> ${combinedCmd}`);
	return execSync(combinedCmd, { stdio: 'pipe' });
}

function getCurrentBranch() {
	const output = git(`status`).toString();
	const result = /^On branch (\S+)/.exec(output);
	return result ? result[1] : null;
}

async function main() {
	const currentBranch = getCurrentBranch();
	const {version} = JSON.parse(fs.readFileSync('./package.json'));

	git(`add --all`);
	git(`commit -m "v${version}"`);
	git(`tag ${version}`);
	git(`push -u origin --tags ${currentBranch}`);
}

main().catch(console.error);
