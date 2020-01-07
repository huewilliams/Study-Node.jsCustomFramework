const http = require('http');
const path = require('path');
const fs = require('fs');

const Application = () => {
    const server = http.createServer((req, res) => {

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
            fs.readFile(filePath, (err, data)=> {
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
    })

    const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
        server.listen(port, hostname, fn);
    }

    return {
        server,
        listen
    }
}

module.exports = Application;