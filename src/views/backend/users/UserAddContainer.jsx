import React from 'react';
import MainLayout from '../../../components/backend/layouts/base-content/MainLayout';
import UserCreate from "../../../components/backend/users/create/UserCreate";

const UserAddContainer = () => {
    return (
        <MainLayout>
            <UserCreate />
        </MainLayout>
    );
}

export default UserAddContainer;
