import { useState } from "react";
import { useNavigate, useOutletContext, useParams} from "react-router-dom"
import { BASE_URL } from "../api";

export default function Messages() {
    
    const [content, setContent] = useState("");

    const { postId } = useParams();
    const { posts, token } = useOutletContext();

    const navigate = useNavigate();

    async function handleMessageSubmit(event) {
        event.preventDefault()
        try {
          const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                content
              }
            })
          });
          const result = await response.json();
        //   console.log(result);
          setContent(result.data.message)
          navigate("/profile");
        } catch (err) {
          console.error(err);
        }
      }
      const post = posts.find((p) => p._id === postId);
      if (!post) {
          return <></>
      }
      return ( 
      <div id="post">
          <h1 id="post-item">{post.title}</h1>
          <h3 id="post-des">{post.description}</h3>
          <h4 id="post-price">{post.price}</h4>
          <h4 id="post-seller">{post.author.username}</h4>
          
            <form id="msg-form" onSubmit={handleMessageSubmit}>
                <input placeholder="message" onChange={(event) => setContent(event.target.value)} value={content}></input>
                <button id="msg-btn">Send</button>
            </form>
        </div>
     )
    } 