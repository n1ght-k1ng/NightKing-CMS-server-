import express from "express";
import { requireSignIn , isAdmin , canCreateRead , canUpdateDeletePost, canDeleteMedia , canUpdateDeleteComment} from "../middlewares";
import formidable from "express-formidable"


const router = express.Router();




// controllers

import {uploadImage ,getNumbers ,comments ,userComments, commentcount,removeComment, UpdateComment, createComment, postCount ,postsforadmin, createPost , posts, uploadImageFile , media, removeMedia , SinglePost , removePost , updatePost , postsbyAuthor} from "../controllers/post"


// router.post("/upload-image", requireSignIn,canCreateRead,uploadImage)
router.post('/post',requireSignIn,canCreateRead,uploadImage)
router.post("/upload-image-file" , formidable(), requireSignIn,canCreateRead,uploadImageFile) 
router.post("/create-post",requireSignIn,canCreateRead, createPost)
router.get("/posts/:page", posts)
router.get('/media' , requireSignIn,canCreateRead,media)
router.get('/post/:slug',SinglePost)
router.get("/posts-for-admin",requireSignIn, isAdmin, postsforadmin)
router.delete("/media/:id" , requireSignIn,canDeleteMedia, removeMedia)
router.delete('/post/:postId', requireSignIn,canUpdateDeletePost, removePost)
router.put(`/edit-post/:postId`, requireSignIn,isAdmin, updatePost)
router.get("/posts-by-author", requireSignIn, postsbyAuthor)
router.get("/post-count", postCount)
// comment 
router.post("/comment/:postId", requireSignIn, createComment)
router.get('/comments/:page' , requireSignIn, isAdmin, comments)
router.get('/comment-count' , commentcount)
router.delete('/comment/:commentId', requireSignIn, canUpdateDeleteComment, removeComment)
router.put('/comment/:commentId', requireSignIn, canUpdateDeleteComment, UpdateComment)
router.get('/user-comments', requireSignIn, userComments)
router.get('/numbers', getNumbers)

export default router