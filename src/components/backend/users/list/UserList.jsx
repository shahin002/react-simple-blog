import React, { useEffect }  from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2'
import { getUserAction, deleteUserAction } from '../../../../redux/backend/user/UserAction';

const UserList = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);
    const userList = useSelector((state) => state.user.userList);

    useEffect(() => {
        dispatch(getUserAction());
    }, []);

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'Yes, Delete',
            showCancelButton: true,
            cancelButtonText: 'No'
          }).then((isConfirm)=>{
            if (isConfirm){
                dispatch(deleteUserAction(id));
            }
        });
    }

    return (
        <>
        {
            isLoading &&
            <div>
                <i className="fa fa-spinner"></i>
            </div>
        }
        {
            !isLoading &&
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Extra Permission</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((user, index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{Array.prototype.map.call(user.roles, s => s.display_name).join(", ")}</td>
                                <td>{Array.prototype.map.call(user.extra_permissions, s => s.display_name).join(", ")}</td>
                                <td>
                                    <button className="btn" onClick={() => deleteUser(user.id)}>
                                        <i className="fa fa-trash text-danger"></i>
                                    </button>
                                    <Link to={`/users/edit/${user.id}`} className="btn ml-1">
                                        <i className="fa fa-edit text-success"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        }
        </>
     );
}

export default UserList;
