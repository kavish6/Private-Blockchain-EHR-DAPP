const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const { main, getAll, readRecord, createRecord, deleteRecord, addNewVisit } = require('./app');
const app = express();
const port = 3001;
const fs=require('fs-extra');
var contract,gateway;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',async (req, res) => {
    console.log('request made');
    const data=await getAll(contract);
    console.log(data);
    res.json(data);
});
app.listen(port,async () => 
{console.log(`Hello world app listening on port ${port}!`)
   fs.removeSync('./wallet');
   const data = await main();
   contract=data.contract;
   gateway=data.gateway;
})
app.post('/',async(req,res)=>{
const data=req.body;
console.log(data);
const dt=await createRecord(contract,data);
res.json(data);
})
app.get('/record/:id',async(req,res)=>{
    console.log('request made to get a single record')
    const id=req.params.id;
    const data=await readRecord(contract,id);
    console.log(data);
    res.json(data);
})
app.delete('/record/:id',async(req,res)=>{
    console.log('delete from index.js')
    const id =req.params.id;
    await deleteRecord(contract,id);
    res.json(id);
})
app.post('/record',async(req,res)=>{
    console.log('add new medical visit')
    const data=req.body;
    console.log(data);
    const dt=await addNewVisit(contract,data);
    res.json(data);
})