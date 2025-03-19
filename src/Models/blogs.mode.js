import mongoose,{Schema} from 'mongoose';

const blogsSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})
const Blogs=mongoose.model('Blog');

export default Blogs;
