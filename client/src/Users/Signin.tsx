import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "./client";
import * as client from "./client";
import {useSnackbar} from "notistack";


export default function Signin() {
    const [loading, setLoading] = useState<boolean>(true);
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        client.profile()
            .then((user) => {
                if (user.username) {
                    navigate("/Kanbas/Account/Profile");
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const signin = async () => {
        if (credentials.username === "" || credentials.password === "") {
            enqueueSnackbar("Please enter username and password", {
                variant: "error",
                anchorOrigin: {vertical: "top", horizontal: "center"},
                autoHideDuration: 2000
            });
            return;
        }
        try {
            await client.signin(credentials);
            enqueueSnackbar(`Welcome back ${credentials.username}!`, {variant: "success", autoHideDuration: 2000});
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            enqueueSnackbar(err.message, {
                variant: "error",
                anchorOrigin: {vertical: "top", horizontal: "center"},
                autoHideDuration: 3000
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Signin</h1>
            <input value={credentials.username} onChange={(e) =>
                setCredentials({...credentials, username: e.target.value})} placeholder={"Username"}
                   className={"form-control"}/>
            <input value={credentials.password} onChange={(e) =>
                setCredentials({...credentials, password: e.target.value})} placeholder={"Password"}
                   className={"form-control"}/>
            <button onClick={signin} className={"btn btn-primary"}>Sign in</button>

            <div style={{marginTop: 40}}>
                <h2>Don't have an account?</h2>
                <button onClick={() => navigate("/Kanbas/Account/Signup")} className={"btn btn-primary"}>Sign up
                </button>
            </div>
        </div>
    );
}