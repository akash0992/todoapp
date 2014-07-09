/**
 * Created by intelligrape on 7/7/14.
 */
var express = require('express'),
    list = require('./list');

var app = express();

app.configure(function () {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    //app.use(express.bodyParser());
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/list', list.findAll);
app.get('/list/:id', list.findById);
app.post('/list', list.addTask);
app.put('/list/:id', list.updateTask);
app.get('/delete/:id', list.deleteTask);

app.listen(3000);
console.log('Listening on port 3000...');