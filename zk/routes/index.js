var express = require('express');
var router = express.Router();
var fs=require('fs')

/* GET home page. */

router.post('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*')
	
	console.log(req.body)
	fs.readFile('public/a.txt','utf-8',function(e,data){
		var arr=JSON.parse(data)
		
		res.send({name: arr })
		
	})
	
});


router.post('/a', function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*')
	
	console.log(req.body)
	fs.readFile('public/a.txt','utf-8',function(e,data){
		var arr=JSON.parse(data)
		arr.push({name:req.body.name,message:req.body.message})
		
		console.log(arr)
		
		fs.writeFile("public/a.txt",JSON.stringify(arr),function(e){
			fs.readFile('public/a.txt','utf-8',function(e,aa){
				var data=JSON.parse(aa)
				
				res.send({name: data });
			})
		})
	})
	
});

router.post('/del',function(req, res, next){
	res.header('Access-Control-Allow-Origin','*')

	fs.readFile('public/a.txt','utf-8',function(e,data){
		var arr = JSON.parse(data)
		for(var i in arr){
		var t = arr[i]
		if(t.message == req.body.del){
			arr.splice(i,1)
			fs.writeFile('public/a.txt',JSON.stringify(arr),function(e){
				res.send('删除成功')
			
			});
			
		}
	}
		
	});
	
	
    
})

module.exports = router;
