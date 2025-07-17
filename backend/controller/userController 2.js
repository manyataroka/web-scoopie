const Users = require('../model/userSchema');
 
const getAllEmployee= async (req, res) => {
    console.log("Get Alls");
    try {
        const users = await Users.findAll();
 
        if (users.length === 0) {
            res
            .status(200)
            .send({data:users, message:"successfully fetched data"});
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json("Error while fetching");
    }
};
 
const saveAllEmployee= async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({where: { email: email } });
 
        if(user === null) {
           await Users.create(req.body);
            return res.status(201).json({message:"User Added successfully"});
        }
        return res.status(500).json({message:"User is already Present"});
}catch (error){
    console.log(error);
}
};
 
module.exports = {getAllEmployee, saveAllEmployee};
 