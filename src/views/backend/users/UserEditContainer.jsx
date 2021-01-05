import React from 'react';
import MainLayout from '../../../components/backend/layouts/base-content/MainLayout';
import UserEdit from "../../../components/backend/users/edit/UserEdit";

const UserEditContainer = () => {
    return (
        <MainLayout>
            <UserEdit />
        </MainLayout>
    );
}

export default UserEditContainer;
