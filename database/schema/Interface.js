const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interfaceSchema = new Schema({
    ID:{unique:true,type:String},
    name:{type:String},
    linkstate:{type:String},
    speed:{type:Number},
    ipv4addr:[String],
    ipv6addr:[String],
    mac:{type:String},

    mtu:{type:Number},
    master:{type:String},
    counter:{
        rxpkts:Number,
        rxbytes:Number,
        rxBps:Number,
        rxutil:Number,
        rxerror:Number,
        
        rxdrop:Number,
        rxover:Number,
        txpkts:Number,
        txbytes:Number,
        txBps:Number,
        
        txutil:Number,
        txerror:Number,
        txdrop:Number,
        txover:Number
    }
})

mongoose.model('Interface',interfaceSchema)