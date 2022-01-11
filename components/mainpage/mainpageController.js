const mainpageService = require('./mainpageService');


const item = 24;

exports.list = async (req, res, next) => {

    Promise.all([mainpageService.list(item)])
    .then(([products])=>{
        res.render('index', {
            products,
            });
        
    })
    .catch(err=>{
        console.log(err);
        next();
    });
};