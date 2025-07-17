const{DataTypes}=require('sequelize');
const { sequelize } = require('../Database/db');
 
const User=sequelize.define("User",{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});
(async()=>{
    try{
        await User.sync(); //create or updates the table based on the model definition
        console.log("The user table has been created or updated");
    }catch(error){
        console.error("Error syncing the Users model:",error.message);
    }
})();
 
module.exports=User;