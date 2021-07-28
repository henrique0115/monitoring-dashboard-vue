const fs = require("fs");
const {sleep} = require("./util");
const {R} = require("redbean-node");
const {setSetting, setting} = require("./util-server");


class Database {

    static templatePath = "./db/kuma.db"
    static path = "./data/kuma.db";
    static latestVersion = 4;
    static noReject = true;

    static async patch() {
        let version = parseInt(await setting("database_version"));

        if (! version) {
            version = 0;
        }

        console.info("Your database version: " + version);
        console.info("Latest database version: " + this.latestVersion);

        if (version === this.latestVersion) {
            console.info("Database no need to patch");
        } else {
            console.info("Database patch is needed")

            console.info("Backup the db")
            const backupPath = "./data/kuma.db.bak" + version;
            fs.copyFileSync(Database.path, backupPath);

            // Try catch anything here, if gone wrong, restore the backup
            try {
                for (let i = version + 1; i <= this.latestVersion; i++) {
                    const sqlFile = `./db/patch${i}.sql`;
                    console.info(`Patching ${sqlFile}`);
                    await Database.importSQLFile(sqlFile);
                    console.info(`Patched ${sqlFile}`);
                    await setSetting("database_version", i);
                }
                console.log("Database Patched Successfully");
            } catch (ex) {
                await Database.close();
                console.error("Patch db failed!!! Restoring the backup")
                fs.copyFileSync(backupPath, Database.path);
                console.error(ex)

                console.error("Start Uptime-Kuma failed due to patch db failed")
                console.error("Please submit the bug report if you still encounter the problem after restart: https://github.com/louislam/uptime-kuma/issues")
                process.exit(1);
            }
        }
    }

    /**
     * Sadly, multi sql statements is not supported by many sqlite libraries, I have to implement it myself
     * @param filename
     * @returns {Promise<void>}
     */
    static async importSQLFile(filename) {

        await R.getCell("SELECT 1");

        let text = fs.readFileSync(filename).toString();

        // Remove all comments (--)
        let lines = text.split("\n");
        lines = lines.filter((line) => {
            return ! line.startsWith("--")
        });

        // Split statements by semicolon
        // Filter out empty line
        text = lines.join("\n")

        let statements = text.split(";")
            .map((statement) => {
                return statement.trim();
            })
            .filter((statement) => {
                return statement !== "";
            })

        for (let statement of statements) {
            await R.exec(statement);
        }
    }

    /**
     * Special handle, because tarn.js throw a promise reject that cannot be caught
     * @returns {Promise<void>}
     */
    static async close() {
        const listener = (reason, p) => {
            Database.noReject = false;
        };
        process.addListener('unhandledRejection', listener);

        console.log("Closing DB")

        while (true) {
            Database.noReject = true;
            await R.close()
            await sleep(2000)

            if (Database.noReject) {
                break;
            } else {
                console.log("Waiting to close the db")
            }
        }
        console.log("SQLite closed")

        process.removeListener('unhandledRejection', listener);
    }
}

module.exports = Database;
