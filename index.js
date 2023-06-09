const express = require("express")
const mongoose = require("mongoose");
const app = express();
const Equipe = require("./models/equipe");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',async(req,res)=>{
   try{
    await Equipe.find({}).then(result=>{
        res.send(result)
    })
   }catch(err){
    console.log(err);
   }
});

app.get('/equipe/:id',async (req,res)=>{
    try{
        const equipeId = parseInt(req.params.id);
        const eq = await Equipe.findOne({id:equipeId})
        res.json(eq)
    }catch(err){
        console.log(err)
    }
})
app.post('/create',async (req,res)=>{
    try{
        let nv_equipe = new Equipe({
            nom:req.body.nom,
            country:req.body.country
        });
        await nv_equipe.save();
        res.send("Equipe ete enregistrer")
    }catch(err){
        console.log(err)
    }
})
app.put('/update/:id',async (req,res)=>{
    try{
        await Equipe.findOneAndUpdate({_id:req.params.id},{
            nom: req.body.nom,
            country: req.body.country
        })
        res.send("Equipe ete modifier");
    }catch(err){
        console.log(err)
    }
})
app.delete('/delete/:id',async (req,res)=>{
    try{
        await Equipe.findByIdAndDelete(req.params.id);
        res.send("Equipe ete Supprimer");
    }catch(err){
        console.log(err)
    }
})
mongoose.connect("mongodb://127.0.0.1:27017/dbmonapi",{
    useNewUrlParser:true,useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Base de donnes ete connecte");
    }
})

app.listen(3000,()=>{
    console.log("on port 3000!!")
})