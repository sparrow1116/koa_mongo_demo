const mongoose = require('mongoose');

const tool = require("../utils/tool")
const { logger } = require('../utils/log_config');

const TAG = "sv::rpc_interface"

function saveData(tabel,data,opration,key){
    console.log(TAG,"saveData::opration::" + opration);
    return new Promise((res,rej)=>{
        let model = mongoose.model(tabel);
        if(opration == "INSERT"){
            data.ID = tool.guid();
            let entity = new model(data);
            entity.save((err)=>{
                if(err){
                    console.log(TAG,"error: " + err.toString());
                    rej({isOK:false})
                }else{
                    console.log(TAG, "save alarm ok");
                    res({isOK:true});

                }
            })
        }else if(opration == "DELETE"){
            model.remove({almsequence:data.almsequence},(err)=>{
                if(err){
                    rej({isOK:false});
                }else{
                    res({isOK:true})
                }
            })
        }else if(opration == "MODIFY"){
            model.findOne({almsequence:data.almsequence},(err,entity)=>{
                let newEntity = Object.assign({},entity,data);
                newEntity.save((err)=>{
                    if(err){
                        rej({isOK:false})
                    }else{
                        res({isOK:true});
                    }
                })
            })
        }else if(opration == "NOTDEFINE"){
            model.findOne({[key]:data[key]},(err,entity)=>{
                console.log(TAG,"NOTDEFINE entity::" + entity);
                if(entity){
                    entity.save(err=>{
                        if(err){
                            rej({isOK:false,type:"MODIFY"})
                        }else{
                            console.log(TAG, "update alarm ok");
                            res({isOK:true,type:"MODIFY"})
                        }
                    })
                }else{
                    console.log(TAG,"go to alarm add");
                    data.ID = tool.guid();
                    console.log(TAG,"alarm new alarm data is::" + JSON.stringify(data));
                    let entity = new model(data);
                    console.log(TAG,"new entity::");
                    console.log(entity);
                    entity.save((err)=>{
                        if(err){
                            console.log(TAG,"error: " + err.toString());
                            rej({isOK:false,type:"INSERT"})
                        }else{
                            console.log(TAG, "save alarm ok");
                            res({isOK:true,type:"INSERT"});

                        }
                    })
                }
            })
        }

    })
}




module.exports = {
    saveData
}
