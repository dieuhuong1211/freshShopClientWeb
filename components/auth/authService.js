const bcrypt = require('bcrypt');
const {models} = require('../../models');

exports.findAccount = async (email) =>{
    const account = await models.clients.findOne({where: {EMAIL: email}} );
    console.log(account);
    return account;
}

exports.register = async (email, password, firstname, lastname, dob, gender, phone) => {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    return models.clients.create({
        EMAIL: email, 
        PASS: hashPassword, 
        CLIENT_ID:email,
        FIRSTNAME: firstname,
        LASTNAME: lastname,
        DOB: dob,
        GENDER: gender,
        PHONE: phone,
        ISDELETED: false
    });
    
}