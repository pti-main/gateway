const gateway = require('fast-gateway'),
    port = 8080,
    routes = [{
            prefix: '/discord',
            target: 'http://127.0.0.1:3003'
        },
        {
            prefix: '/sql',
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
        routes: routes,

        middlewares: [(req, res, next) => {

            // przekazywanie przekierowanego ip do headera
            req.headers['x-forwarded-from'] = req.connection.remoteAddress;
            
            // w tym miejscu mozna dodawac headery przez proxy
            res.setHeader('x-powered-by', 'pti-main');
            res.setHeader('x-forwarded-for', req.connection.remoteAddress);
            return next();
        }]

    });
 
server.start(port);
console.log("gateway: fast-gateway working on port " + port);