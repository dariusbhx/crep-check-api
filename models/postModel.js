import mongoose from 'mongoose';


const postSchema = mongoose.Schema({
    title: String,
    description: String,
    price: String,
    image: String,
    likeCount: {
        type: Number,
        default: 0,
    },
})

postSchema.set('timestamps', true);
const PostData = mongoose.model('PostData',postSchema)

export default PostData