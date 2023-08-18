import { Link } from "react-router-dom";


export default function Navbar({ user, setToken, setUser }) {
    function handleLogout() {
        localStorage.removeItem("token");
        setToken("");
        setUser({});
    }
    return (
    <div>
     <nav id="top-nav">
      <span id="logo">Stranger's Things</span>
      {user._id && (
         <>
            <Link to={`/newpost`} id="new-btn">New Post</Link>
            <Link to={`/posts`} id="new-msg">Message</Link> 
         </>
        )}
      </nav>
     <nav>
        <Link to="/">Home</Link>
        <Link to="/posts" >Posts</Link>
        {user._id && (
         <>
            <Link to="/profile" >Profile</Link>
            <Link onClick={handleLogout} to={"/"}>Logout</Link>
         </>
        )}
        {!user._id && (
         <>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
         </>
        )}
     </nav>
    </div>
    )
 }