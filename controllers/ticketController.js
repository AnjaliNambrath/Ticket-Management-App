const ticket = require("../models/ticketModel");
const fs = require("fs");

exports.createTicket = async (req, res) => {
  try {
    console.log(req.body);
    var c = fs.readFileSync("./controllers/count.txt");
    c++;
    fs.writeFileSync("./controllers/count.txt", c.toString());
    console.log(c);
    req.body.ticketID = c;
    const addTicket = await ticket.create(req.body);
    console.log("ticket Added Successfully");
    res.status(200).json(addTicket);
  } catch (error) {
    console.error("Error");
    res.status(500).send("Error");
  }
};


//Get All Ticket
exports.getAllTicket = async (req, res) => {
  try {
    const getticket = await ticket.find({});
    res.send(getticket);
  } catch (err) {
    console.error("Error getting ticket", err);
    res.status(500).send("Error getting ticket");
  }
};

//Search Ticket
exports.getSearchTicket = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const searchRegex = new RegExp(searchTerm, "i");

    const tickt = await ticket.find({
      $or: [
        // { taskID: searchTerm },
        { issue: { $regex: searchRegex } },
        { status: { $regex: searchRegex } },
        { customerName: { $regex: searchRegex } },
        { assignedTo: { $regex: searchRegex } },
        { priority: { $regex: searchRegex } },
      ],
    });

    res.json(tickt);
  } catch (err) {
    console.error("Error getting ticket", err);
    res.status(500).json({ error: "Error getting ticket" });
  }
};

//Delete ticket by ID
exports.deleteTicket = async (req, res) => {
  const tckId = req.params._id;
  try {
    const tckByid = await ticket.findByIdAndDelete(tckId);
    res.send({
      message: "Ticket deleted successfully",
      deleteEmployee: tckByid,
    });
  } catch (err) {
    console.error("Error deleting Ticket", err);
    res.status(500).send("Error deleting Ticket");
  }
};

//Update Ticket Details
exports.updateTicket = async (req, res) => {
  const cId = req.params._id;
  const updatedTicket = req.body;
  try {
    console.log("HIA");
    const updateByid = await ticket.findByIdAndUpdate(cId, updatedTicket);
    res.send({
      message: "ticket Updated successfully",
    });
  } catch (err) {
    console.error("Error updating ticket", err);
    res.status(500).send("Error updating ticket");
  }
};
