const fileUpload = require('express-fileupload');

const authService = require('./authService');

exports.register = async (req, res) => {
    
    const {email, password, firstname, lastname, dob, gender, phone} = req.body;
    const account = await authService.findAccount(email);
    if(account) {
        res.render('register', {errorCode: true});
        return;
    }
    try {
        if(!email || !password)
            res.render('register', {errorCode: true});
        else
        {
            authService.register(email, password, firstname, lastname, dob, gender, phone);
            console.log('register successed');
            res.redirect('/auth/login');
        }
           
    }catch(error){
        console.log(error);
        res.render('register', {errorCode: true});
    }
}