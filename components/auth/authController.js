const authService = require('./authService');
const bcrypt = require('bcrypt');

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

exports.myAccount = async (req, res) => {
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    else {
        res.redirect('/auth/login');
    }
    try {
        const client = await authService.findUserByID(clientID);
        console.log(client);
        res.render('shop/myAccount',{
            client
        });
    }
    catch(err){
        console.log(err);
    }
} 

exports.updateAccount = async (req, res, next) => {
    console.log("--------- begin update account ---------");
    console.log("--------- image: ", req.body.image);
    console.log("--------- firstname: ", req.body.firstname);
    console.log("--------- lastname: ", req.body.lastname);
    console.log("--------- dob: ", req.body.dob);
    console.log("--------- gender: ", req.body.gender);
    console.log("--------- phone: ", req.body.phone);
    console.log("--------- email: ", req.body.email);
    console.log("--------- pass: ", req.body.pass);
    console.log("--------- newpass: ", req.body.newpass);
    let firstname, lastname, gender, dob, phone, image, email, pass, newpass;
    let clientID;
    if(req.user)
    {
        clientID = req.user.CLIENT_ID;
    }
    else {
        res.redirect('/auth/login');
    }
    if(req.body.firstname)
    {
        console.log("--------update info-------");
        if(req.body.firstname.length > 0 || req.body.lastname.length > 0 || req.body.gender.length > 0 || req.body.dob.length > 0 || req.body.phone.length > 0 || req.body.image.length > 0)
        {
            
            firstname = (req.body.firstname.length > 0) ? req.body.firstname : req.user.FIRSTNAME;
            lastname = (req.body.lastname.length > 0) ? req.body.lastname : req.user.LASTNAME;
            gender = (req.body.gender.length > 0) ? req.body.gender : req.user.GENDER;
            dob = (req.body.dob.length > 0) ? req.body.dob : req.user.DOB;
            phone = (req.body.phone.length > 0) ? req.body.phone : req.user.PHONE;
            image = (req.body.image.length > 0) ? req.body.image : "";
            if(image.length > 0)
            {
                const updateinfo = await authService.updateInfowithFile(clientID,firstname,lastname,dob,gender,phone,image);
                console.log(updateinfo);
            }
            else
            {
                const updateinfo = await authService.updateInfowithoutFile(clientID,firstname,lastname,dob,gender,phone);
                console.log(updateinfo);
            }
            res.redirect('back');
            return;
        }
    }
   
    email = req.body.email;
    pass = req.body.pass;
    newpass = req.body.newpass;
    if(email !== "")
    {
        const updatepemail = await authService.updateEmail(clientID, email);
        console.log("---------updatepemail: ", updatepemail);
        
    }
    const client = await authService.findUserByID(clientID);
    if(pass.length > 0 && newpass.length > 0)
    {
        //const hashNewPassword = await bcrypt.hash(pass, 10);
        const validPassword = await bcrypt.compare(pass, client.PASS);
        
        // console.log("---------pass: ", hashNewPassword);
        // console.log("---------client pass: ", client.PASS);
        if(validPassword)
        {
            const updatepass = await authService.updatePass(clientID, newpass);
            console.log("---------updatepass: ", updatepass);
            res.render('shop/myAccount', {
                client,
                errorCode: -1
            });
        }
        else {
            res.render('shop/myAccount', {
                client,
                errorCode: 2
            });
            return;
        }
        
    }

    if((pass.length === 0 && newpass.length > 0) || (pass.length > 0 && newpass.length === 0))
    {
        res.render('shop/myAccount', {client, errorCode: 1});
        return;
    }

    console.log("--------- end update account ---------");
}