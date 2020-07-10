import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios"
import {Card, Grid, makeStyles} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  
  card: {
    height: 140,
    width: 800,
    margin: 20,
  }
}));


function App() {
  const [posts, setPosts] = useState();
  const classes = useStyles();

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
      
      {!posts && <h2>Loading, Please Wait</h2>}
      {posts && posts.map((post) => {
        return(
          
          <Card className={classes.card} key={post.id}>
            <div >
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </div>
          </Card>
          
        
      )})}
      </Grid>
    </div>
  );
}

export default App;
