import { Navigate, Route, Routes } from "react-router";

import Signin from "../../Users/Signin";
import Profile from "../../Users/profile";
import UserTable from "../../Users/Table";
import Signup from "../../Users/Signup";

function Account() {
    return (
        <div className={"p-4 content-wrapper"} >
            <h1>Account</h1>
            <Routes>
                <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/Admin/Users" element={<UserTable />} />
            </Routes>
        </div>
    );
}

export default Account;