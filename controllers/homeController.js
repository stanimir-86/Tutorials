const homeController = require('express').Router();


homeController.get('/', (req, res) => {

    if (req.user) {
        //user home page
        res.render('user-home', {
            title: 'Home Page',

        });
    } else {
        //guest home page
        res.render('guest-home', {
            title: 'Home Page',

        });
    }


});

module.exports = homeController;