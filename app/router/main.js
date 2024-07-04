const router = require("express").Router()
const deploy = require('..//tools/deployment')

router.get("/refresh", deploy)

module.exports = router