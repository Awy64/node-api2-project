import React, { useState } from "react";
import { makeStyles, Card, Button } from "@material-ui/core";
import Axios from "axios";



const useStyles = makeStyles((theme) => ({

  card: {
    height: 140,
    width: 800,
    margin: 20,
    padding: 50
  }
}));



const Cards = ({ post }) => {
  const [deleted, setDeleted] = useState(false);
  const [formData, setFormData] = useState({ title: post.title, contents: post.contents })
  const [editing, setEditing] = useState(false)
  const [postData, setPostData] = useState(post)
  const classes = useStyles();


  const handleDelete = e => {
    e.preventDefault();
    Axios.delete(`http://localhost:4000/api/posts/${post.id}`)
      .then(res => {
        setDeleted(true)
      })
      .catch(err => console.log(err.message))
  }

  const handleUpdate = e => {
    e.preventDefault();

    Axios.put(`http://localhost:4000/api/posts/${post.id}`, formData)
      .then(res => {
        setEditing(false)
        setPostData(res.data)
      })
      .catch(err => console.log(err.message))
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }




  return (
    <div>
      {!deleted && <Card className={classes.card} >

        <h3>{postData.title}</h3>
        <p>{postData.contents}</p>

        <Button onClick={handleDelete}> Delete</Button>
        {!editing && <Button onClick={() => setEditing(true)}>Update</Button>}
        {editing && <form>
          <textarea name="title" onChange={handleChange} value={formData.title} />
          <textarea name="contents" onChange={handleChange} value={formData.contents} />
          <Button onClick={handleUpdate} >Update</Button>
        </form>
        }
      </Card>}
    </div>
  )
}



export default Cards;