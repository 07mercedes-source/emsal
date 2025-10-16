// pages/api/personel.js
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"data","personel.json");

function readData(){
  if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  const raw = fs.readFileSync(filePath,"utf8");
  return JSON.parse(raw || "[]");
}
function writeData(d){ fs.writeFileSync(filePath, JSON.stringify(d,null,2)); }

export default function handler(req,res){
  const method = req.method;
  try{
    if(method === "GET"){
      const data = readData();
      return res.status(200).json(data);
    }
    if(method === "POST"){
      const body = req.body;
      const data = readData();
      const id = Date.now();
      const newRec = {...body, id};
      data.push(newRec); writeData(data);
      return res.status(201).json(newRec);
    }
    if(method === "PUT"){
      const updated = req.body;
      const data = readData();
      const index = data.findIndex(x=>x.id === updated.id);
      if(index === -1) return res.status(404).json({message:"Not found"});
      data[index] = updated; writeData(data);
      return res.status(200).json(updated);
    }
    if(method === "DELETE"){
      const id = parseInt(req.query.id,10);
      let data = readData();
      data = data.filter(x=>x.id !== id);
      writeData(data);
      return res.status(200).json({success:true});
    }
    res.status(405).end();
  }catch(err){
    res.status(500).json({error:err.message});
  }
}
