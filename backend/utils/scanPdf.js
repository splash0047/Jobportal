const { execFile } = require('node:child_process');

// ClamAV is required in production. Local development may omit it, but never
// treat a failed or unavailable scan as a clean file.
module.exports = (filePath) => new Promise((resolve, reject) => {
    const command = process.env.CLAMSCAN_COMMAND;
    if (!command) {
        if (process.env.NODE_ENV === 'production') {
            return reject(Object.assign(new Error('Resume scanning is unavailable'), { status: 503 }));
        }
        return resolve();
    }
    execFile(command, ['--no-summary', '--', filePath], { timeout: 30000, maxBuffer: 1024 * 1024 }, (error) => {
        if (!error) return resolve();
        if (error.code === 1) return reject(Object.assign(new Error('PDF failed the malware scan'), { status: 422 }));
        reject(Object.assign(new Error('Resume scanning is unavailable'), { status: 503 }));
    });
});
