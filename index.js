'use strict'

const restify = require('restify')
const { etagger, timestamp, fetchContent } = require('./util')
const server = restify.createServer()

server.use(ettager().bind(server))

server.get('/book/first', function(req, res, next) {
    fetchContent(req.url, (err, content) => {
        if (err) return next(err)
        res.send({data: content, url: req.url, ts: timestamp()})
        next()
    })
})

server.listen(8080)