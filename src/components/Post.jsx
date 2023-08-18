import { useNavigate, useOutletContext, useParams} from "react-router-dom"
import { BASE_URL } from "../api";

export default function Post() {
    const { postId } = useParams();
    const { posts, token } = useOutletContext();

    const navigate = useNavigate();

    async function handleDelete(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/posts/${postId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
            .then(() => {
              navigate("/profile");
            })
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
        {!post.isAuthor && (
            <>
            <h4 id="post-seller">{post.author.username}</h4>
          </>
        )}
        {post.isAuthor && (
            <>
              {/* <button>Edit</button> */}
              <button className="delete" onClick={handleDelete}>Delete</button>
            </>
            )}
            
        </div>
    )
}
