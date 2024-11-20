const events = require("../models/events");

const createEvent = (req, res) => {
  const { date, time, description } = req.body;
  if (req.user.role !== "organizer")
    return res.status(403).json({ error: "Access denied" });
  const newEvent = {
    id: events.length + 1,
    date,
    time,
    description,
    participants: [],
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};

const updateEvent = (req, res) => {
  const { id } = req.params;
  const { date, time, description } = req.body;
  const event = events.find((e) => e.id == id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  if (req.user.role !== "organizer")
    return res.status(403).json({ error: "Access denied" });
  event.date = date || event.date;
  event.time = time || event.time;
  event.description = description || event.description;

  res.json(event);
};

const deleteEvent = (req, res) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((e) => e.id == id);
  if (eventIndex === -1)
    return res.status(404).json({ error: "Event not found" });
  if (req.user.role !== "organizer")
    return res.status(403).json({ error: "Access denied" });
  events.splice(eventIndex, 1);
  res.status(204).send();
};

const listEvents = (req, res) => {
  res.json(events);
};

const registerForEvent = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const event = events.find((event) => event.id === parseInt(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.participants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already registered for this event" });
    }
    event.participants.push(userId);
    res.status(200).json({
      message: "Registered successfully",
      event,
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering for the event" });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  registerForEvent,
};
