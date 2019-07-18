let data = require('../config/data.json');
let fs = require('fs');
var path = require("path");

class methods
{
    constructor()
    {

    }

    home(req,res)
    {
        // res.json(data);
        console.log(__dirname);
        // res.sendFile(path.join(__dirname+'client/index.html'));
        // res.render(path.join(__dirname,'../client/index.html'));
        // res.sendFile('index.html');
        // res.send(res.sendFile(path.join(__dirname+'client/index.html')));
        res.render(path.join(__dirname,'../client/index.html'));
    }

    async getSystems(req,res)
    {  
        let data = await this.getData();
        res.header("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(data);
        res.end();
    }

    addSystem(req,res)
    {
        this.append('config/data.json',req.body);
        res.send(200);
    }

    async deleteSystem(req,res)
    {
        let index = req.body.index;
        let data = await this.getData();
        data = JSON.parse(data);
        data.splice(index,1);
        await this.forceWriteData('config/data.json',JSON.stringify(data));
        res.send(200);
    }

    async getData()
    {
        // fs.readFile('config/data.json','utf8', (err,data)=>
        // {
        //     if(err)
        //         console.log(err);
        //     else
        //     {
        //         return data;
        //     }
        // }); 
        let data = fs.readFileSync('config/data.json','utf8');
        return data;
    }

    append(where,message)
    {
        fs.readFile(where,'utf8', (err,data)=>
        {
            if(err)
                console.log(err);
            else
            {
                console.log(data);
                let obj = JSON.parse(data);
                console.log(obj);
                obj.push(message)
                console.log(message);
                let str = JSON.stringify(obj);
                fs.writeFile(where,str,'utf8',(err)=>{ if(err) console.log(err)});
            }
        }); 
    }

    async forceWriteData(where,data)
    {
        // fs.writeFile(where,data,'utf8',(err)=>{ if(err) console.log(err)});
        fs.writeFileSync(where,data,'utf8');
    }
}

module.exports = methods;