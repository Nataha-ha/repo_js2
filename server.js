const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    // const body = req.url === '/script.js' ?
    //     fs.readFileSync('./public/script.js') :
    //     fs.readFileSync('./public/index.html');
    // res.end(body);

    // let body = '';
    // switch (req.url) {
    //     case '/':
    //         body = fs.readFileSync('./public/index.html');
    //         break;
    //     case '/script.js':
    //         body = fs.readFileSync('./public/script.js');
    //         break;
    //     case '/style.css':
    //         body = fs.readFileSync('./public/style.css');
    //         break;
    // }
    // res.end(body);

    const publicPath = './public';

    let body = null;
    try {
        body = fs.readFileSync(`${publicPath}${req.url}`);
    } catch (e) {
        console.log(e);
        body = fs.readFileSync(`${publicPath}/index.html`);
    }
    res.end(body);
});

const port = process.env.PORT || 3000;
server.listen(port);

console.log(`Server started on port ${port}!`);