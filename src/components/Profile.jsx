import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom"
import { BASE_URL } from "../api";

export default function Profile() {
    const [myPosts, setMyPosts] = useState([]);
    const [myMessages, setMyMessages] = useState([]);

    const { postId } = useParams();

    const {user, token, setToken, posts} = useOutletContext();
      
    
      useEffect(() => {

        async function myData() {
          const storedToken = localStorage.getItem("token")
          if(storedToken) {
            setToken(storedToken)
            const response = await fetch(`${BASE_URL}/users/me`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
              },
            });
            const result = await response.json();
            // console.log(result)
            setMyPosts(result.data.posts);
            setMyMessages(result.data.messages)
          }
        }
        myData();
      }, [token]);
      
      async function handleDelete(postId) {
        
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            .then(() => {
              setMyPosts([posts]);
            })
          } catch (err) {
            console.error(err);
          }
        }

     
    return (
    <div>
        <h1 id="header">{user.username}'s Profile</h1>
        <h2 className="pro-head">Posts</h2>
        {myPosts.map((post) => {
          if(post.active === true) {
          return (
          <div id="postspg" key={post._id}>
            <Link to={`/posts/${post._id}`}>
            <div id="item-name">{post.title}</div></Link>
            <div id="item-des">Description: {post.description}</div>
            <div id="item-price">Price: {post.price}</div>
            <div id="item-location">Location: {post.location}</div>
            {/* <button className="edit">Edit</button> */}
              <button className="delete" onClick={() => handleDelete(postId)}
              >Delete</button>
              
        </div>
    )}})}
        <div> 
        <h2 className="pro-head">Messages</h2>
        {myMessages.map((message) => {
          return (
          <div id="postspg" key={message._id}>
            <div id="item-name">{message.post.title}</div> 
            <div id="item-des">User: {message.fromUser.username}</div>
            <div id="item-price">Message: {message.content}</div>
        </div>
    )})}
    </div>
    </div>    
   )
}