var Helpers = require('../helpers');
var path = require('path');

var configuration = Helpers.Config.getConfiguration();

var homePage = function(req, res) {
  
    if(configuration.production) {
      res.sendFile(path.join(__dirname, '../../client', 'index.html'));
    } else {
      res.sendFile(path.join(__dirname, '../../client', 'indexdev.html'));
    }
};

var adminPage = function(req, res) {
  
    res.sendFile(path.join(__dirname, '../../client', 'admin.html'));
};

var wheelAdminPage = function(req, res) {
  
    res.sendFile(path.join(__dirname, '../../client', 'wheelAdmin.html'));
};


module.exports.homePage = homePage;
module.exports.adminPage = adminPage;
module.exports.wheelAdminPage = wheelAdminPage;