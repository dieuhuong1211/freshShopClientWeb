const bcrypt = require('bcrypt');
const {models} = require('../../models');

exports.findAccount = async (email) =>{
    const account = await models.clients.findOne({
        where: {
            EMAIL: email,
            ISLOCK: false,
            ISDELETED: false
        }
    });
    console.log(account);
    return account;
}

exports.findUserByID = (clientID) => {
    return models.clients.findOne({
        where: {
            CLIENT_ID: clientID,
            ISLOCK: false,
            
            ISDELETED: false
        },
        raw: true
    });
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
        IMAGE: "/assets/images/clients/no-image.png",
        ISLOCK: false,
        ISDELETED: false
    });
    
}

exports.updateInfowithFile = (clientID, firstname, lastname, dob, gender, phone, image) => {
    return models.clients.update(
        {
            FIRSTNAME: firstname, 
            LASTNAME: lastname, 
            GENDER: gender, 
            DOB: dob, 
            PHONE: phone,
            IMAGE: "/assets/images/clients/" + image,
        },
        {
            where: {
                CLIENT_ID: clientID,
            }
        });
}

exports.updateInfowithoutFile = (clientID, firstname, lastname, dob, gender, phone) => {
    return models.clients.update(
        {
            FIRSTNAME: firstname, 
            LASTNAME: lastname, 
            GENDER: gender, 
            DOB: dob, 
            PHONE: phone,
        },
        {
            where: {
                CLIENT_ID: clientID,
            }
        });
}

exports.updateEmail = (clientID, email) => {
    return models.clients.update(
        {
            EMAIL: email
        },
        {
            where: {
                CLIENT_ID: clientID,
            }
        });
}

exports.updatePass = async (clientID, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return models.clients.update(
        {
            PASS: hashPassword,
        },
        {
            where: {
                CLIENT_ID: clientID,
            }
        });
}