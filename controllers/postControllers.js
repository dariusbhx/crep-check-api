import PostData from '../models/postModel.js'
import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()

export const getPosts = async(req,res) => {
    try{
        const postMessages = await PostData.find()

        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({message: error})
    }
}

export const createPost = async (req,res) => {
    const {title,description,image,price} = req.body
    const newPost = new PostData({title,description,image,price})
    try {
        await newPost.save()
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message: error})
    }
}

export const updatePost = async (req,res) => {
    const  {id: _id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('no post found with the id specified')
    }

    const updatedPost = await PostData.findByIdAndUpdate(_id, {...post,_id}, {new:true})

    res.json(updatedPost)

}

export const deletePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that Id')
    }
    await PostData.findByIdAndRemove(id)

    res.json({message: 'Post deleted successfully'})
}

export const likePost = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that Id') 
    }

    const post = await PostData.findById(id)
    const updatedPost = await PostData.findByIdAndUpdate(id,{likeCount: post.likeCount +1}, {new: true})

    res.json(updatedPost)
}