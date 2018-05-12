var bodyparser = require('body-parser');
var fs = require('fs');

function add( key , value){
    var obj={};
    obj[key]=value;
    obj= JSON.stringify(obj);
  

    var arr=[];
    var all= getAll();
    
    arr=all;
   
    if(all.length>0)
    arr.push(obj);
    else
    arr= obj;

    fs.writeFileSync('file.json',arr,'utf-8',function(error){
        if(error){
            console.log("error");
        }
    });
}

function clear(){
    fs.truncate('file.json', 0, function(){console.log('done')});
}

function getAll(){
    var result =[];
    var t= fs.readFileSync('file.json', 'utf8');
    if(t.length>0)
    result.push(t);
    else
    result=t;
    return result;
}

function getByKey(key){
    var result=[];
    var arr =[];
    var t= fs.readFileSync('file.json', 'utf8');
    if(t.length>0)
    {
        arr.push(t);
        arr=arr[0].split(",");
        
        for (var i=0; i < arr.length; i++) {
            arr[i]=JSON.parse(arr[i]);
            if (arr[i][key]) {
                result.push(arr[i]);  
            }
        }
    }
    return result;
}

function removeByKey(key){
    var result=[];
    var arr =[];
    var t= fs.readFileSync('file.json', 'utf8');
    if(t.length>0)
    {
        arr.push(t);
        arr=arr[0].split(",");
       
        for (var i=0; i < arr.length; i++) {
            arr[i]=JSON.parse(arr[i]);
            if (!arr[i][key]) {
                result.push(JSON.stringify(arr[i]));  
            }
        }
       
    }

    fs.writeFileSync('file.json',result,'utf-8',function(error){
        if(error){
            console.log("error");
        }
    });
    return result;
}

if((process.argv[2])){
    
    var operation = process.argv[2];
    var key = process.argv[3];
    var value = process.argv[4];


    if(operation.toLowerCase()=="add".toLocaleLowerCase()){
        add(key,value);
    }else if (operation.toLowerCase()=="clear".toLocaleLowerCase()){
        clear();           
    }else if (operation.toLowerCase()=="list".toLocaleLowerCase()){
        console.log(getAll());
    }else if (operation.toLowerCase()=="get".toLocaleLowerCase()){
        console.log(getByKey(key));   
    }else if (operation.toLowerCase()=="remove".toLocaleLowerCase()){
        console.log(removeByKey(key));   
    }

}  