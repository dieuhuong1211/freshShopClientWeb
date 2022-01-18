const authService = require('./authService');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    
    const {email, password, firstname, lastname, dob, gender, phone} = req.body;
    
    let account
    try{
         account = await authService.findAccount(email);

    }
    catch(err){
        console.log(err);
    }
    if(account) {
        res.render('register', {errorCode: true});
        return;
    }
    try {
        if(!email || !password)
            res.render('register', {errorCode: true});
        else
        {
            try {
                await authService.register(email, password, firstname, lastname, dob, gender, phone);
            }
            catch(err)
            {
                console.log(err);
            }
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

        console.log("--------update info-------");
        if(req.body.firstname || req.body.lastname || req.body.gender || req.body.dob || req.body.phone || req.file)
        {
            firstname = (req.body.firstname) ? req.body.firstname : req.user.FIRSTNAME;
            lastname = (req.body.lastname) ? req.body.lastname : req.user.LASTNAME;
            gender = (req.body.gender) ? req.body.gender : req.user.GENDER;
            dob = (req.body.dob) ? req.body.dob : req.user.DOB;
            phone = (req.body.phone) ? req.body.phone : req.user.PHONE;
            image = (req.file) ? req.file.filename : "";
            console.log("image----------------:", image);
            try{
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
            catch(err){
                console.log(err);
            }
            
        }
    email = req.body.email;
    pass = req.body.pass;
    newpass = req.body.newpass;
    if(email && email !== "")
    {
        try{
            const updatepemail = await authService.updateEmail(clientID, email);
            console.log("---------updatepemail: ", updatepemail);
        }
        catch(err){
                console.log(err);
            }
    }
    let client
    try{
        client = await authService.findUserByID(clientID);
    }
    catch(err){
        console.log(err);
    }
    
    if(pass || newpass)
    {
        try{
            if(pass !== "" && newpass !== "")
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
        }
        catch(err){
            console.log(err);
        }
        
    }
    
    res.redirect('back');
    console.log("--------- end update account ---------");
}