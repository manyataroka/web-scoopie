const express = require("express");
const{
    getAllEmployee,
    saveAllEmployee,
} = require("../controller/userController");
 
const router = express.Router();
 
router.get("/users", getAllEmployee);
 
module.exports = {router};