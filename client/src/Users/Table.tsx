import React, {useState, useEffect} from "react";
import {
    BsTrash3Fill,
    BsPlusCircleFill,
    BsFillCheckCircleFill,
    BsPencil,
    //BsArrowRight
} from "react-icons/bs";

import * as client from "./client";
import {User} from "./client";
import {useSnackbar} from "notistack";
//import { useNavigate } from "react-router";
const defaultUser = {
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER"
};

function UserTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User>(defaultUser);
    const [role, setRole] = useState("ALL");

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        client.findAllUsers().then(setUsers);
    }, []);


    const createUser = async () => {
        if (!user.username || !user.password) {
            enqueueSnackbar(`Username and password are required.`, {variant: "error"});
            return;
        }
        try {
            const newUser = await client.createUser(user);
            setUsers([...users, newUser]);
            setUser(defaultUser);
            enqueueSnackbar(`User successfully created.`, {variant: "success"});
        } catch (err) {
            enqueueSnackbar(`Error creating user: ${err}`, {variant: "error"});
            console.log(err);
        }
    };

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
            enqueueSnackbar(`User successfully deleted.`, {variant: "success"});
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user: any) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };


    const updateUser = async () => {
      if (user === defaultUser) {
            enqueueSnackbar(`Select a user to update first.`, {variant: "error"});
            return;
      }
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
            setUser(defaultUser);
            enqueueSnackbar(`User successfully updated.`, {variant: "success"});
        } catch (err) {
            enqueueSnackbar(`Error updating user: ${err}`, {variant: "error"});
            console.log(err);
        }
    };

    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role || "ALL");
        setUsers(users);
    };

    return (
        <div>
            <h1>User List</h1>
            <label htmlFor={"roleFilter"} className="form-label">Filter by Role</label>
            <br/>
            <select
                id={"roleFilter"}
                onChange={(e) => fetchUsersByRole(e.target.value)}
                value={role || "USER"}
                className="form-control w-25"
            >
                <option value="">All</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <br/><br/>
            <table className="table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <td>
                        <input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}/>
                        <input type={"password"} value={user.password}
                               onChange={(e) => setUser({...user, password: e.target.value})}/>
                    </td>
                    <td>
                        <input value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                    </td>
                    <td>
                        <input value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})}/>
                    </td>
                    <td>
                        <select
                            onChange={(e) => setUser({...user, role: e.target.value})}
                            value={user.role || "USER"}
                            className="form-control w-auto"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="STAFF">Staff</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </select>
                    </td>
                    <td>
                        <BsFillCheckCircleFill onClick={updateUser}
                                               className="me-2 text-success fs-1 text"/>
                        <BsPlusCircleFill onClick={createUser}
                                          className="text-success fs-1 text"/>
                    </td>
                </tr>
                </thead>
                <br/>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td className="text-nowrap">
                            <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                <BsTrash3Fill/>
                            </button>
                            <button className="btn btn-warning me-2" onClick={() => selectUser(user)}>
                                <BsPencil/>
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;    