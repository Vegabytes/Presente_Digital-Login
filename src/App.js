import React, { useState } from 'react'
import LoginForm from './components/LoginForm';
import { signup, signin } from './components/LoginService';



function App(props) {
  //This will be in a database
  // const adminUser = {
  //   email: "test@test.com",
  //   password: "admin123"
  // }

  console.log(props.location);
  console.log(props.match);
  console.log(props.history);

  const [user, setUser] = useState({ name: "", email: "", token: "", signup: (props.location.pathname === '/signup' || false) });
  const [error, setError] = useState("");


  const Login = async ({ name, email, password }) => {
    if (user.signup) {
      //Estamos registrandonos
      try {
        const res = await signup({ email, password, "username": name });
        if (res.status === 200) {
          setUser({
            name, email, password, token: res.data.token
          });
        } else {
          setError('User already exists!');
        }

      } catch (err) {
        console.log(err);
      }
    }
    //Estamos haciendo login
    else {
      try {
        const res = await signin({ email, password });
        if (res.status === 200) {
          setUser({
            name: res.data.userFound.username, email, password, token: res.data.token
          });
        } else {
          setError('User not found!');
        }

      } catch (err) {
        console.log(err);
      }
    }


    // if (email === adminUser.email && password === adminUser.password) {
    //   setUser({
    //     name, email, password
    //   });
    //   console.log(user);
    // } else {
    //   console.log('Details do not match!');
    //   setError('Details do not match!');
    // }
  }

  const Logout = () => {
    console.log("Logout");
    setUser({ name: "", email: "" });
  }

  return (
    <div className="App">
      {(user.email !== "") ? (
        <div className="welcome">
          <h2>Welcome {!user.signup && <span>Back</span>}, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (<LoginForm Login={Login} error={error} signup={user.signup} />)}
    </div>
  );
}

export default App;
