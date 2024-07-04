const { execSync } = require("child_process");
const { error } = require("console");

function deploy (req, res) {
    console.log("Coucou");
    const commands = [
        { cmd: "git add ." },
        { cmd: "git reset --hard" },
        { cmd: "git pull" },
        { cmd: "npm start" },
    ];

    try {
        for (const command of commands) {
            if(command.cmd === 'npm start') {
                res.status(200).json("The deployment successfully happened")
            }
            execSync(command.cmd, { cwd: process.cwd() })
        }
    } catch (e) {
        error(e)
        res.status(500).json({ information: "Something went wrong ! You need to inspect what's going on !" })
    };
}

module.exports = deploy;