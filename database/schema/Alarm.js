const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alarmSchema = new Schema({
    ID:{unique:true,type:String},
    almsequence:{type:String},
    almname:{type:String},
    modulename:{type:String},
    almseverity:{type:String},
    almtype:{type:String},

    starttime:{type:String},
    reason:{type:String},
    advise:{type:String},
    almout:{type:String},
    almstate:{type:Number}
})

mongoose.model('Alarm',alarmSchema)