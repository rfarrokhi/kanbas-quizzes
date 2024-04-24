import React, {useEffect, useState} from "react";
import * as client from "./client";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const save = async () => {
        await client.updateUser(profile);
        enqueueSnackbar(`Profile successfully updated.`, {variant: "success"});
    };

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };

    useEffect(() => {
        fetchProfile()
            .catch((err) => {
                navigate("/Kanbas/Account/Signin");
            });
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input value={profile.username} onChange={(e) =>
                        setProfile({...profile, username: e.target.value})}
                           className={"form-control"}
                           placeholder={"Username"}/>
                    <input value={profile.password} onChange={(e) =>
                        setProfile({...profile, password: e.target.value})}
                           className={"form-control"}
                           type={"password"}
                           placeholder={"Password"}/>
                    <input value={profile.firstName} onChange={(e) =>
                        setProfile({...profile, firstName: e.target.value})}
                           className={"form-control"}
                           placeholder={"First name"}/>
                    <input value={profile.lastName} onChange={(e) =>
                        setProfile({...profile, lastName: e.target.value})}
                           placeholder={"Last Name"}
                           className={"form-control"}/>
                    <input value={profile.dob} type="date" onChange={(e) =>
                        setProfile({...profile, dob: e.target.value})}
                           className={"form-control"}/>
                    <input value={profile.email} onChange={(e) =>
                        setProfile({...profile, email: e.target.value})}
                           placeholder={"Email"}
                           className={"form-control"}/>
                    <select onChange={(e) =>
                        setProfile({...profile, role: e.target.value})}
                            value={profile.role || "USER"}
                            className={"form-control"}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="STAFF">Staff</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
            )}
            <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-100">
                Users
            </Link>
            <button onClick={save} className={"btn btn-primary"}>
                Save
            </button>
            <button onClick={signout} className={"btn btn-danger"}>
                Sign out
            </button>
        </div>
    );
}