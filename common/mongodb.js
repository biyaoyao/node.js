var mongodb = require("mongodb");
var punycode = require('punycode');
 
var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});

 var i=0;
var db = new mongodb.Db("test",server,{safe:false});
 function getData(res,User,user_name,password,phone,cid,province,city){

	 res.charset = 'utf-8';
	
	 
	
	//<meta charset="utf-8"/>
	
	 
	 
	 
	 //连接db
db.open(function(err, db){
    if(!err){
        console.log('connect db');
       
        db.createCollection('user', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //新增数据
                // var tmp1 = {id:'1',title:'hello',number:1};
       //          collection.insert(tmp1,{safe:true},function(err, result){
       //              console.log(result);
       //          }); 
                   //更新数据
                   // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                   //     console.log(result);
                   // });
                  

                // console.log(collection);
                // 查询数据
            
				
				 
                 collection.find({'phone':phone}).toArray(function(err,docs){
					   console.log(JSON.stringify(docs));
             
					if(docs.length==0){
						 collection.find().toArray(function(err,docs){ 
							 
							 var data={'user_name':user_name,
					    user_id:docs.length,
	                    'password':password, 
	                    'phone':phone, 
	                    'cid':cid, 
	                    'province':province,
	                    'city':city}
							 
							 
							 collection.insert(data,{safe:true},function(err, result){
                    var datas=new Object();
						datas.result=true;
						datas.data="注册成功!";
				        res.writeHead(200, {'Content-Type': 'text/plain;charset:utf-8'});
	           res.write(''+JSON.stringify(datas));
	          res.end();
								
					  }); 
						
               }); 
						
			 
			 }
					
					
					
					else{
						var datas=new Object();
						datas.result=true;
						datas.data="您已经注册过!";
				        res.writeHead(200, {'Content-Type': 'text/plain;charset:utf-8'});
	           res.write(''+JSON.stringify(datas));
	          res.end();
					
					}
					 
					 
                  
                   }); 
                  
            }

        });
        // console.log('delete ...');
        // //删除Collection
        // db.dropCollection('mycoll',{safe:true},function(err,result){

  //           if(err){
                
        //         console.log('err:');
        //         console.log(err);
        //     }else{
        //         console.log('ok:');
        //         console.log(result);
        //     }
  //       }); 
    }else{
        console.log(err);
    }
});
 }

function getAllData(res){
db.open(function(err, db){
    if(!err){
       
       
        db.createCollection('user', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                
				   collection.find().toArray(function(err,docs){
					   
                   
					
					 
					 var datas=new Object();
						datas.result=true;
						datas.data=docs;
				        res.writeHead(200, {'Content-Type': 'text/plain;charset:utf-8'});
	           res.write(''+JSON.stringify(datas));
					      res.end();
                  
                   }); 
				
                
                  
            }

        });
       
    }else{
        console.log(err);
    }
});

}
exports.getData=getData;
exports.getAllData=getAllData;