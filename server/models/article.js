//rules 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

require('dotenv').config();



const articleSchema = mongoose.Schema({
    title:{

        type:String,
        maxLength: 100,
        required:[true,'you need a title']
    },
    content:{

        type:String,
        required:[true,'you need a content']

    },
    excerpt:{
        type:String,
        maxLength: 500,
        required:[true,'you need a excerpt']


    },
    score:{

        type:Number,
        min: 0,
        max: 100,
        required: true,
        
    },
    director:{

        type:String,
        required:true
    },
    actors:{
        type:[String],
        required: true,
        validate:{
            validator: function(array){
                return array.length >= 2
            },
            message:"You must add three at least"
        }
    
    },
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'draft',
        index:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required:true,
    },
    date:{

        type:Date,
        default: Date.now
    }
})


articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article', articleSchema)
module.exports = { Article }