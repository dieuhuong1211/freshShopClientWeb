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

    if(req.body.firstname !== "" || req.body.lastname !== "" || req.body.gender!== "" || req.body.dob!== "" || req.body.phone!== "" || req.body.image!== "")
    {
        console.log("--------update-------");
        firstname = (req.body.firstname !== "") ? req.body.firstname : req.user.FIRSTNAME;
        lastname = (req.body.lastname !== "") ? req.body.lastname : req.user.LASTNAME;
        gender = (req.body.gender !== "") ? req.body.gender : req.user.GENDER;
        dob = (req.body.dob !== "") ? req.body.dob : req.user.DOB;
        phone = (req.body.phone !== "") ? req.body.phone : req.user.PHONE;
        image = (req.body.image !== "") ? req.body.image : "";
        if(image !== "")
        {
            await authService.updateInfowithFile(clientID,firstname,lastname,dob,gender,phone,image);
            res.redirect('back');
            return;
        }
        else
        {
            await authService.updateInfowithoutFile(clientID,firstname,lastname,dob,gender,phone);
            res.redirect('back');
            return;
        }
    }

    if(email)
    {
        await authService.updateEmail(clientID, email);
        
    }

    if(pass && newpass)
    {
        await authService.updatePass(clientID, newpass);
    }

    if((!pass && newpass) || (pass && !newpass))
    {
        res.render('shop/myAccount', {errorCode: true});
    }
    console.log("--------- end update account ---------");
   
    //res.redirect('back');
    res.render('shop/myAccount');
}