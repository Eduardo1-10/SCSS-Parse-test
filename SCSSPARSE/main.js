var fs = require('fs');
var fileHandler = require('./handlefiles');

(function () {
    const scssFile = 'style.scss';
    const htmlFile = 'index.html';
    const htmlData = fs.readFileSync(htmlFile, 'utf8');
    const scssData = fs.readFileSync(scssFile, 'utf8');
    
    fileHandler(scssData, htmlData);
})();
