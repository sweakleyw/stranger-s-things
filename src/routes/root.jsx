import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api";



export default function Root() {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});


    async function fetchPosts() {
        try {
          const response = await fetch(`${BASE_URL}/posts`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
            
          const result = await response.json();
          const info = result.data.posts;
          // console.log(info);
          setPosts(info)
        } catch (err) {
          console.error(err);
        }
      }

      useEffect(() => {

        async function fetchUser() {
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
            if(result.success) {
              setUser(result.data);
            }
          }
        }
        fetchUser();
       
      }, [token]);
      
      useEffect(() => {
        fetchPosts();
      }, [token]);

    return (
    <div>
        <Navbar user={user} setUser={setUser} setToken={setToken} />
        <Outlet context={{ posts, setToken, user, setPosts, token }} />
    </div>
  );
}