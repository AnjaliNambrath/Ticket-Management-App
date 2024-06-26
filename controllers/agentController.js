const user = require("../models/agentModel");

//To Check whether AgenntId is Unique
exports.CheckEmpID = async (req, res) => {
  try {
    console.log(req.query.AgentID);
    const AgId = req.query.AgentID;
    const foundAgent = await user.findOne({ agentID: AgId });
    console.log(foundAgent);
    res.json({ unique: foundAgent });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "Error" });
  }
};


//Get All the Agents from DB
exports.getAllUser = async (req, res) => {
  try {
    const getUser = await user.find({});
    res.send(getUser);
  } catch (err) {
    console.error("Error getting Users", err);
    res.status(500).send("Error getting Users");
  }
};


//Delete agent by ID
exports.deleteEmployee = async (req, res) => {
  const agtId = req.params._id;
  try {
    const agtByid = await user.findByIdAndDelete(agtId);
    res.send({
      message: "Employee deleted successfully",
      deleteEmployee: agtByid,
    });
  } catch (err) {
    console.error("Error deleting Employee", err);
    res.status(500).send("Error deleting Employee");
  }
};

//Search Agent
exports.getSearchEmployee = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const searchRegex = new RegExp(searchTerm, "i");

    const tasks = await user.find({
      $or: [
        { designation: { $regex: searchRegex } },
        { agentName: { $regex: searchRegex } },
      ],
    });

    res.json(tasks);
  } catch (err) {
    console.error("Error getting employee", err);
    res.status(500).json({ error: "Error getting employee" });
  }
};

//Update Agent Details
exports.updateAgent = async (req, res) => {
  const cId = req.params._id;
  const updatedAgent = req.body;
  console.log(req.body);
  try {
    const updateByid = await user.findByIdAndUpdate(cId, updatedAgent);
    res.send({
      message: "Agent Updated successfully",
    });
  } catch (err) {
    console.error("Error updating Agent", err);
    res.status(500).send("Error updating Agent");
  }
};


//Get All Desgnations from DB
exports.getAllDesignation = async (req, res) => {
  try {
    const agents = await user.find({});
    const designations = [];
    for (let agent of agents) {
      if (!designations.includes(agent.designation)) {
        designations.push(agent.designation);
      }
    }

    res.status(200).json(designations);
  } catch (err) {
    console.error("Error getting designation", err);
    res.status(500).send("Error getting designation");
  }
};

// Get agents by designation
exports.getAgentsByDesignation = async (req, res) => {
    const designation = req.params.designation;
    try {
        const agents = await user.find({ designation: designation });
        console.log(agents);
        res.status(200).json(agents);
    } catch (err) {
        console.error("Error fetching agents", err);
        res.status(500).send({ message: "Error fetching agents" });
    }
};

