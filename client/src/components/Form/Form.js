import React, { useState, useEffect } from "react"
import { Button, Typography, Paper } from "@material-ui/core"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"

import { createPost, updatePost } from "../../actions/posts"
import { updateFormId } from "../../actions/currentId"
import useStyles from "./styles"
import FormEntry from "./FormEntry"

const Form = () => {
    const [ postData, setPostData ] = useState({ creator: "", title: "", message: "", tags: "", selectedFile: "" })

    const currentId = useSelector(state => state.currentId)
    const post = useSelector(state => currentId ? state.posts.find(p => p._id === currentId) : null)
    const classes = useStyles()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(updatePost(currentId, postData))    
        } else {
            dispatch(createPost(postData))
        }
        clear()
    }

    const clear = () => {
        dispatch(updateFormId(0))
        setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Edit" : "Create"} a Memory</Typography>
                <FormEntry entryName={"creator"} postData={postData} setPostData={setPostData}/>
                <FormEntry entryName={"title"} postData={postData} setPostData={setPostData}/>
                <FormEntry entryName={"message"} postData={postData} setPostData={setPostData}/>
                <FormEntry entryName={"tags"} postData={postData} setPostData={setPostData}/>
                
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={false} 
                        onDone={({base64}) => setPostData((prev) => {return {...prev, selectedFile: base64}})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form