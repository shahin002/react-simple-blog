import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Link, withRouter} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import Select from "react-select";
import {
    emptyUserMessage,
    getPermissionsAction,
    getRolesAction,
    handleChangeUserInput,
    storeUserAction
} from '../../../../redux/backend/user/UserAction';

const UserCreate = withRouter(({history, props}) => {
    const {register, handleSubmit, errors, getValues, reset} = useForm();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.user.isLoading);
    const userAddMessage = useSelector((state) => state.user.userAddMessage);
    const userAddStatus = useSelector((state) => state.user.userAddStatus);
    const userData = useSelector((state) => state.user.userData);
    const all_roles = useSelector((state) => state.user.all_roles);
    const all_permissions = useSelector((state) => state.user.all_permissions);

    const submitHandler = () => {
        dispatch(storeUserAction(userData));
    }

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeUserInput(name, value));
    };

    useEffect(() => {
        dispatch(getRolesAction());
        dispatch(getPermissionsAction());
    }, []);

    useEffect(() => {
        if (typeof userAddMessage !== 'undefined' || userAddMessage !== null) {
            if (userAddStatus && userAddMessage.length > 0) {
                dispatch(emptyUserMessage());
                history.push("/users");
            }
        }
    }, [userAddStatus, userAddMessage, history]);

    return (
        <>
            {/* <!-- Page Header --> */}
            <div className="content bg-gray-lighter">
                <div className="row items-push">
                    <div className="col-sm-8">
                        <h1 className="page-heading">
                            Create User
                        </h1>
                    </div>
                    <div className="col-sm-4 text-right hidden-xs">
                        <ol className="breadcrumb push-10-t">
                            <li><Link to='/users'>Users</Link></li>
                            <li className="link-effect">Create User</li>
                        </ol>
                    </div>
                </div>
            </div>
            {/* <!-- END Page Header --> */}

            {/* <!-- Page Content --> */}


            <div className="content content-narrow">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block">
                            <div className="block-content block-content-narrow">
                                <form className="form-horizontal push-10-t add-user-form"
                                      onSubmit={handleSubmit(submitHandler)}
                                      method="post">

                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material form-material-primary">
                                                <label htmlFor="user-name">Name</label>
                                                <input className="form-control"
                                                       type="text" id="user-name"
                                                       name="name"
                                                       placeholder="User Name"
                                                       required=""
                                                       aria-required="true"
                                                       ref={register({
                                                           required: 'Please give user name'
                                                       })}
                                                       onChange={(e) => handleChangeTextInput('name', e.target.value)}
                                                       value={userData.name}
                                                       autoComplete="name"
                                                />
                                                {
                                                    errors.name &&
                                                    <div className="text-danger text-sm">{errors.name.message}</div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material form-material-primary">
                                                <label htmlFor="user-email">Email</label>
                                                <input className="form-control"
                                                       type="email" id="user-email"
                                                       name="email"
                                                       placeholder="User Email"
                                                       required=""
                                                       aria-required="true"
                                                       ref={register({
                                                           required: 'Please give user email',
                                                           maxLength: 30
                                                       })}
                                                       onChange={(e) => handleChangeTextInput('email', e.target.value)}
                                                       value={userData.email}
                                                       autoComplete="email"
                                                />
                                                {
                                                    errors.email &&
                                                    <div
                                                        className="text-danger text-sm">{errors.email.message}</div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material">
                                                <label htmlFor="roles">Select Role</label>
                                                <Select
                                                    isMulti
                                                    getOptionLabel={option => option.display_name}
                                                    getOptionValue={option => option.id}
                                                    options={all_roles}
                                                    onChange={(e) => handleChangeTextInput('roles', e.map(each=>each.id))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material">
                                                <label htmlFor="permissions">Select Extra Permissions</label>
                                                <Select
                                                    isMulti
                                                    getOptionLabel={option => option.display_name}
                                                    getOptionValue={option => option.id}
                                                    options={all_permissions}
                                                    onChange={(e) => handleChangeTextInput('permissions', e.map(each=>each.id))}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material form-material-primary">
                                                <label htmlFor="user-password">Password</label>
                                                <input type="password"
                                                       className="form-control form-control-alt form-control-lg"
                                                       id="password"
                                                       name="password"
                                                       placeholder="Password"
                                                       ref={register({
                                                           required: 'Please give your password',
                                                           minLength: 6
                                                       })}

                                                       onChange={(e) => handleChangeTextInput('password', e.target.value)}
                                                       value={userData.password}
                                                       autoComplete="current-password"
                                                />
                                                {
                                                    errors.password &&
                                                    <div
                                                        className="text-danger text-sm">{errors.password.message}</div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div className="form-material form-material-primary">
                                                <label htmlFor="user-password_confirmation">Confirm
                                                    Password</label>
                                                <input type="password"
                                                       className="form-control form-control-alt form-control-lg"
                                                       id="confirm_password"
                                                       name="confirm_password"
                                                       placeholder="Confirm Password"
                                                       ref={register({
                                                           required: 'Please confirm your password',
                                                           minLength: 6,
                                                           validate: (value) => value === getValues('password') || "Passwords don't match."
                                                       })}
                                                       autoComplete="confirm-password"
                                                />
                                                {
                                                    errors.confirm_password &&
                                                    <div
                                                        className="text-danger text-sm">{errors.confirm_password.message}</div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-9">
                                            {
                                                !isLoading &&
                                                <button className="btn btn-sm btn-primary" type="submit">
                                                    Submit
                                                </button>
                                            }
                                            {
                                                isLoading &&
                                                <button className="btn btn-sm btn-primary" type="button" disabled>
                                                    Submitting ...
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- END Page Content --> */}
        </>
    );
})

export default UserCreate;
