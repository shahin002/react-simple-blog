import React from 'react';
import MainLayout from '../../../components/backend/layouts/base-content/MainLayout';
import UserList from "../../../components/backend/users/list/UserList";
import {Link} from "react-router-dom";

const UserListContainer = () => {
    return (
    <MainLayout>
        <>
            <div className="block">
                <div className="block-content">
                    <div className="block-header">
                        <h3 className="block-title col-md-6">User List</h3>
                        <Link to="/users/create" className="pull-right btn btn-primary btn-rounded">Add
                            User
                        </Link>
                    </div>
                    <UserList />
                </div>
            </div>
        </>

    </MainLayout>
    );
}

export default UserListContainer;
