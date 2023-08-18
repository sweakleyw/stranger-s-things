import { useState } from "react"
import { BASE_URL } from "../api";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const { setToken } = useOutletContext();

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault()
        // console.log(username, password, confirm);

        if (password !== confirm) {
         setError("Password needs to match!");
         return;
        }

        const response = await fetch(
            `${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password,
              }
            })
          });
          const result = await response.json();
        //   console.log(result)
          if (!result.success) {
            setError(result.error.message);
            return;
          }

          setToken(result.data.token);
          localStorage.setItem("token", result.data.token)
          navigate("/profile");
    }

    return (
    <div>
        <h1 id="header">Register</h1>
        <form onSubmit={handleRegister} id="registration">
            <input placeholder="username" onChange={(event) => setUsername(event.target.value)} value={username}
            />
            <input placeholder="password" type="password" onChange={(event) => setPassword(event.target.value)} value={password}
            />
            <input placeholder="confirm" type="password" onChange={(event) => setConfirm(event.target.value)} value={confirm}
            />
            <div id="reg-err">{error}</div>
            <button id="reg-btn">Register</button>
        </form>
    </div> 

    )
}