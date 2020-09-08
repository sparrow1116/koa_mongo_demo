const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lldpSchema = new Schema({
    ID:{unique:true,type:String},
    num:{type:Number},
    lldpmsg:[
        {
            localport:String,
            remotesysmac:String,
            remotesysname:String,
            remotesysdescr:String,
            remoteportid:String,
            
            remoteportdescr:String,
            remotemgmtip:String,
            capabilitystatus:String,
            uptime:String
        }
    ],
    lldpcfg:{
        hostname:String,
        platform:String,
        description:String,
        bond_slave_src_mac_type:String,
        interface_pattern:String,
        
        interface_description:Boolean,
        interface_promiscuous:Boolean
    }
})

mongoose.model('Lldp',lldpSchema)