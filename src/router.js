//import the controller folder (automatically calls the index.js file)

var controllers = require('./controllers');

var router = function(app) {

    app.get('/', controllers.Home.homePage);    
    app.get('/admin', controllers.Home.adminPage);
    app.get('/wheelAdmin', controllers.Home.wheelAdminPage);    
};

module.exports = router;
