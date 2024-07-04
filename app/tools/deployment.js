const { execSync } = require("child_process");
const { error } = require("console");

function deploy (req, res) {
    console.log("Coucou");
    const commands = [
        { cmd: "git add ." },
        { cmd: "git reset --hard" },
        { cmd: "git pull" },
        { cmd: "docker compose -f deployment.yml up --build -d" },
    ];

    try {
        for (const command of commands) {
            execSync(command.cmd, { cwd: process.cwd() })
        }
        res.status(200).json({ information: "The depployment successfully happend" })
    } catch (e) {
        error(e)
        res.status(500).json({ information: "Something went wrong ! You need to inspect what's going on !" })
    };
}

module.exports = deploy;