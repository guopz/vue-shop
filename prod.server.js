var express = require('express');
var path = require('path');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	console.log('index.html');
	req.url = '/index.html';
	next();
});

app.use(router);

// 读取数据
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller',function(req,res){
  // 返回数据
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods',function(req,res){
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings',function(req,res){
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api',apiRoutes);

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, function() {
	console.log('run at ' + port);
});