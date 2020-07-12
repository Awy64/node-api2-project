import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"
import { Grid } from "@material-ui/core"
import Cards from "./components/Card.js"




function App() {
  const [posts, setPosts] = useState([]);


  const fetchPosts = () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <h1>Addys Posts</h1>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >


        {posts.map((post) => {
          return (
            <div key={post.id}><Cards post={post} /></div>
          )
        })}
      </Grid>
    </div>
  );
}

export default App;
