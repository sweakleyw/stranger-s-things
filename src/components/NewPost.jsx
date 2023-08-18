import { useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api";
import { useState } from "react";

export default function NewPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);

    const { setPosts, posts, token } = useOutletContext();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault()
        try {
          const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title,
                description,
                price,
                location,
                willDeliver
              }
            })
          });
          const result = await response.json();
          setPosts([result.data.post, ...posts]);
          setTitle("");
          setDescription("");
          setPrice("");
          setLocation("");
          setWillDeliver(false);
          navigate("/profile");
        } catch (err) {
          console.error(err);
        }
      }

    return(
     <div>
      <h1 id="header">New Post</h1>
        <form onSubmit={handleSubmit} id="new-post">
            <input placeholder="Title" onChange={(event) => setTitle(event.target.value)} value={title}></input>
            <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} value={description}></input>
            <input placeholder="Price" onChange={(event) => setPrice(event.target.value)} value={price}></input>
            <input placeholder="Location" onChange={(event) => setLocation(event.target.value)} value={location}></input>
            <label id="deliver">Delivery?</label>
            <input type="checkbox" onChange={() => setWillDeliver(!willDeliver)} value={willDeliver}></input>
            <button id="create-post">Create Post</button>
        </form>
     </div>
    )
}