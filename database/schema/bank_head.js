const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankHeadSchema = new Schema({
    ID:{unique:true,type:String},
    title:{type:String},
    description:[String],
    detailUrl:{type:String},
    router:{type:String},
    time:{type:Number},

    bank:{type:String},
    groupArr:[String],
    commercial:{type:String},
    inputDate:{type:String}
})

mongoose.model('BankHead',bankHeadSchema)