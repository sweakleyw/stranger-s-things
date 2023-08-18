import { useEffect, useState } from "react";
import { Link, useOutletContext} from "react-router-dom";


export default function Posts() {
  // const [searchTerm, setSearchTerm] = useState("");
  const {posts, user, setPosts} = useOutletContext();


  // useEffect(() => {
  //   const filteredPosts =
  //     posts.filter((post) =>
  //       post.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );

  //   setPosts(filteredPosts);
    
  // }, [searchTerm]);

  
  async function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }

  if(!posts.length) {
    return <></>
  }

  // console.log(posts)
    return (
    <div>
      <h1 id="header">Posts</h1>
      {/* <form id="search" onSubmit={handleSearch}>
        <input placeholder="Search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}></input>
      </form> */}
      {posts.map((post) => {
        if(!post.isAuthor)
          return (
          <div id="postspg" key={post._id}>
            <Link to={`/posts/${post._id}`}>
            <div id="item-name">{post.title}</div></Link>
            <div id="item-des">Description: {post.description}</div>
            <div id="item-seller">Seller: {post.author.username}</div>
            <div id="item-price">Price: {post.price}</div>
            <div id="item-location">Location: {post.location}</div>
            {user._id && (
            <>
              <Link to={`/posts/${post._id}/messages`} id="msg-btn">Message</Link>
            </>
            )}
          </div>
        )})}   
    </div>
    )
}