const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const agentController = require("../controllers/agentController");
var userHandlers = require("../controllers/userController.js");
// const ensureRole = userHandlers.roleRequired;

//Login and Registration endpoints
router.get("/profile", userHandlers.loginRequired, userHandlers.profile);
router.post("/auth/agentregister", userHandlers.agentRegister);
router.post("/auth/userregister", userHandlers.customerRegister);
router.post("/auth/sign_in", userHandlers.sign_in);

//Admin Endpoints
router.get("/agent", agentController.getAllUser);
router.delete("/agent/:_id", agentController.deleteEmployee);
router.put("/agent/:_id", agentController.updateAgent);

//Customer Endpoint
router.post("/customer/raiseticket", ticketController.createTicket);
router.get("/customer/getticketbyuser", ticketController.getAllTicket);
router.get("/customer/userById/:_id", userHandlers.getUserById);
router.put("/customer/:_id", userHandlers.updateUser);
router.delete("/ticket/:_id", ticketController.deleteTicket);
router.put("/ticket/:_id", ticketController.updateTicket);

//Agent Endpoint
router.get("/ticket", ticketController.getAllTicket);
router.get("/designations", agentController.getAllDesignation);
router.get("/designations/agents/:designation",agentController.getAgentsByDesignation);

//Search Endpoints
router.get("/ticket/search", ticketController.getSearchTicket);
router.get("/agent/search", agentController.getSearchEmployee);

//Notification Endpoints
router.get("/ticket/notifications/:userName", ticketController.getNotity);

//Endpoints to check data is unique
router.get("/checkagentid", agentController.CheckEmpID);
router.get("/checkemail", userHandlers.CheckEmail);


module.exports = router;
