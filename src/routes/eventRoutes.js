const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  registerForEvent,
} = require("../controllers/eventController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.get("/", listEvents);
router.post("/:id/register", registerForEvent);

module.exports = router;
