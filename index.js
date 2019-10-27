const gateway = require('fast-gateway'),
    port = 8080,
    routes = [{
            prefix: '/module/discord',
            target: 'http://127.0.0.1:3003'
        },
        {
            prefix: '/module/sql',
            target: 'http://127.0.0.1:3002'
        },
        {
            prefix: '/server-list',
            hooks: {
                onRequest: async (req, res) => {
                    res.end(JSON.stringify(routes));
                    return true;
                }
            }
        },
        {
            prefix: "/status",
            hooks: {
                onRequest: async (req, res) => {
                    res.end(JSON.stringify({success: true, online: true, timestamp: new Date().getTime()}));
                    return true;
                }
            }
        }
    ],
    server = gateway({
        routes: routes
    });
 
server.start(port);
console.log("gateway: fast-gateway working on port " + port);