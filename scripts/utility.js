const fs = require('fs');

function mkdirpSync(path) {
	if (!fs.existsSync(path))
		fs.mkdirSync(path, { recursive: true });
}

module.exports.mkdirpSync = mkdirpSync;