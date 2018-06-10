'use strict'

const restify = require('restify')
const { etagger, timestamp, fetchContent } = require('./utils')()
const server = restify.createServer()

server.use(etagger().bind(server))

server.get('/book/first', function(req, res, next) {
    fetchContent(req.url, (err, content) => {
        if (err) return next(err)
        const ts = timestamp()
        req.id(ts.toString())
        res.send(`{"data": ${content}, "url": ${req.url}, "ts": ${ts}}`)
        next()
    })
})

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
})