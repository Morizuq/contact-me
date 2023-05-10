const router = require("express").Router();

import { create, get } from "./controller";

router.route("/").post(create).get(get);


module.exports = router;