const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id: 0,
        name: 'Rebotile Modika'
    },
    {
        id: 1,
        name: 'Malcolm Mutare'
    },
    {
        id: 2,
        name: 'Lethu Skhosana'
    },
]
    
server.on('request', (req, res) => {
    const items = req.url.split('/');
    if (req.method === 'POST' && items[1] === 'friends') {
         req.on('data', (data)=> {
            const friend = data.toString(); 
            console.log('Request:', friend);
            friends.push(JSON.parse(friend))
         })
    }else  if (req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if (items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]))
        } else {
            res.end(JSON.stringify(friends));
        }
    
    } else if (req.method === 'GET' && items[1] === 'messages') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Malcolm</li>')
        res.write('<li>What are your thoughts on AI?</li>');
        res.write('</li>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Listening on port ${3000}...`)
});