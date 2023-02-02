const express = require("express");
const {getAll, create, getOne, update, deleteOne}  = require("../controllers/task_v1_cont") 

const router = express.Router();

// router.get("", getAll);
// router.post("", create);
// router.get("/:id", getOne);
// router.patch("/:id", update);
// router.delete("/:id", deleteOne);

router.route("").get(getAll).post(create);
router.route("/:id").get(getOne).patch(update).delete(deleteOne);

module.exports = router;