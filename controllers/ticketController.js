const ticket = require("../models/ticketModel");
const Agent = require("../models/agentModel");
const fs = require("fs");

exports.createTicket = async (req, res) => {
  try {
    console.log(req.body);
    var c = fs.readFileSync("./controllers/count.txt",'utf-8').split('\n');
    let agentCount = parseInt(c[1], 10);
    let ticketCount = parseInt(c[0], 10);
    ticketCount++;
    fs.writeFileSync("./controllers/count.txt",`${ticketCount}\n${agentCount}`);
    console.log(ticketCount);
    req.body.ticketID = ticketCount;
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
    const getticket = await ticket
      .find({})
      .populate("customerID", "fullName")
      .populate("assignedTo", "agentName");
    console.log("LL",getticket);
    // console.log("LP", getticket[0].customerID.id);
    res.send(getticket);
  } catch (err) {
    console.error("Error getting ticket", err);
    res.status(500).send("Error getting ticket");
  }
};

//Search Ticket
// exports.getSearchTicket = async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm || "";
//     const searchRegex = new RegExp(searchTerm, "i");

//     const tickets = await ticket
//       .find({
//         $or: [
//           { issue: { $regex: searchRegex } },
//           { status: { $regex: searchRegex } },
//           { priority: { $regex: searchRegex } },
//         ],
//       })
//       .populate("customerID", "fullName")
//       .populate("assignedTo", "agentName")

//     // Filter tickets based on populated fields
//     const filteredTickets = tickets.filter((ticket) => {
//       return (
//         searchRegex.test(ticket.customerID.fullName) ||
//         searchRegex.test(ticket.assignedTo.agentName)
//       );
//     });

//     res.json(filteredTickets);
//   } catch (err) {
//     console.error("Error getting ticket", err);
//     res.status(500).json({ error: "Error getting ticket" });
//   }
// };

exports.getSearchTicket = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const searchRegex = new RegExp(searchTerm, "i");

    // Find tickets based on issue, status, or priority
    const tickets = await ticket.find({
      $or: [
        { issue: { $regex: searchRegex } },
        { status: { $regex: searchRegex } },
        { priority: { $regex: searchRegex } },
      ],
    })
      .populate("customerID", "fullName") // Populate customerID with fullName
      .populate("assignedTo", "agentName"); // Populate assignedTo with agentName

    // Filter tickets based on populated fields
    const filteredTickets = tickets.filter((ticket) => {
      return (
        searchRegex.test(ticket.customerID.fullName) ||
        searchRegex.test(ticket.assignedTo.agentName) ||
        searchRegex.test(ticket.issue) ||
        searchRegex.test(ticket.status) ||
        searchRegex.test(ticket.priority)
      );
    });

    res.json(filteredTickets);
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
  console.log("kk", cId);
  const updatedTicket = req.body;
  console.log(updatedTicket);
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

//Checking for new ticket for particular agent
exports.getNotity = async (req, res) => {
  try {
    // Find the agent by userName
    const userName = req.params.userName;
    const agent = await Agent.findOne({ agentName: userName });
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    }
   
    const newTasks = await ticket.find({
      assignedTo: agent._id,
      New_Notification: true,
    });

    newTasks.forEach(async (ticket) => {
      ticket.New_Notification = false;
      await ticket.save();
    });

    res.json(newTasks);
  } catch (err) {
    console.error("Error getting new ticket", err);
    res.status(500).json({ error: "Error getting new ticket" });
  }
}
