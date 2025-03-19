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

},{
    timestamps:true
})
const Blogs=mongoose.model('Blog', blogsSchema);

export default Blogs;
