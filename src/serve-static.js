const path = require('path');
const fs = require('fs');

const serveStatic = (req, res) => {
    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
    }
    const ext = path.parse(req.url).ext;
    const filePath = path.join(__dirname, `../public/${req.url}`);

    if(Object.keys(mimeType).includes(ext)) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', mimeType[ext]);
                res.end(data);
            }
        })   
    } else {
        res.status(200);
    }
}

module.exports = serveStatic;