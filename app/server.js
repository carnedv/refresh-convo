var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');

var couchdb = require('felix-couchdb'),
    client = couchdb.createClient(5984, 'localhost'),
    db = client.db('refresh-convo');

var server = http.createServer(function(req, res)
{
    res.writeHead(200, { 'Content-type': 'text/html'});

    var file = '/index.html';
    if (req.url !== '/')
    {
		file = req.url;
    }

    try {
    console.log('Sending ' + file);
    res.end(fs.readFileSync(__dirname + file));
	} catch (Error) {
		res.writeHead(404, { 'Content-type': 'text/html'});
		res.end(null);
	}
}).listen(8080, function()
{
    console.log('Listening at: http://localhost:8080');
});

socketio.listen(server).on('connection', function (socket)
{
    socket.on('init', function(nsg)
    {
        db.view('topics', 'all', function (err, result)
        {
            var data = [];

            if (result !== undefined)
            {
                result.rows.forEach(function(row)
                {
                    data.push(row.value);
                });
            }

            socket.emit('init', data);
        });
    });

    socket.on('add:topic', function (msg)
    {
        if (msg.newTopic !== undefined && msg.newTopic)
        {
            msg.newTopic.type = 'topic';
            db.saveDoc(msg.newTopic, function(err, result)
            {
                if (!err)
                {
                    socket.broadcast.emit('added:topic', { topic: msg.newTopic });
                } else {
                    socket.broadcast.emit('added:topic', { err: err });
                }
            });
        }
    });
});