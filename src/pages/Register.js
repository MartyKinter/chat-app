import React from "react";
import {Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import { registerRoute } from "../ApiRoutes";

function Register(){
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    async function handleSubmit(evt){
        evt.preventDefault();
        if(handleValidation()){
            const {username, email, password} = values;
            const {data} = await axios.post(registerRoute, {username, email, password});
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    }

    function handleValidation(){
        const {password, confirmPassword, username, email} = values;
        if(password !== confirmPassword){
            alert("password and confirm password should match");
            return false;
        }else if(username.length<=3){
            alert("Username should be more than 3 characters");
            return false;
        }else if(password.length<8){
            alert("Password should be more than or equal to 8 characters");
            return false;
        }else if(email === ""){
            alert("Email is required");
            return false;
        }
        return true;
    }

    function handleChange(evt){
        setValues({...values, [evt.target.name]:evt.target.value});
    }

    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={(evt) => handleSubmit(evt)}>

                <input 
                value={values.username} 
                onChange={evt => handleChange(evt)} 
                type="text" placeholder="Username" 
                name="username"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <input 
                value={values.email} 
                onChange={evt => handleChange(evt)} 
                type="email" placeholder="Email" 
                name="email"
                className="block w-full rounded-sm p-2 mb-2 border"/>
                
                <input 
                value={values.password}
                onChange={evt => handleChange(evt)} 
                type="password" placeholder="Password" 
                name="password"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <input 
                value={values.confirmPassword}
                onChange={evt => handleChange(evt)} 
                type="password" placeholder="Confirm Password" 
                name="confirmPassword"
                className="block w-full rounded-sm p-2 mb-2 border"/>

                <button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    Create User
                </button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )

}

export default Register;