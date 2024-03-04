import Room from "../models/room.js";
import { ERROR_STATUS_DESCRIPTION } from "../constants/index.js";

async function roomNew(req, res, next) {
  const room = new Room({
    name: req.body.name,
    message: req.body.message,
    status: req.body.status,
    sender_id: req.body.sender_id,
    participants: req.body.participants,
  });

  try {
    const { id } = await room.save();

    const data = await Room.findById(id);

    res.status(201).json({ message: "room created successfully", room: data });
  } catch (error) {
    res.status(500).json({ message: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR });
  }
}

async function getRooms(req, res, next) {
    try {
      const room = await Room.find();
      res.status(200).json({ data: room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR });
    }
  }
  
  async function getRoom(req, res, next) {
    try {
      const id = req.params.id
      const room = await room.findById(id);

      if (room) {
        res.status(200).json({ data: room, code: SUCCESS_CODE.OK });
      } else {
        res.status(200).json({
          error_desscription: AUTHEN_STATUS_DESCRIPTION.INCORRECT_PASSWORD,
          error: AUTHEN_STATUS_CODE.INCORRECT_PASSWORD,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: ERROR_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR });
    }

    
  }

export { roomNew, getRooms, getRoom };
