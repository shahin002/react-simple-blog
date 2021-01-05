import * as Types from "../Types";
import axios from "axios";
import {toast} from "react-toastify";

export const getUserAction = () => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };

    dispatch({type: Types.USER_LIST, payload: data});

    await axios
        .get(`http://laravel07-starter.herokuapp.com/api/v1/user-list`)
        .then(async (res) => {
            const response = res.data;
            data.data = res.data.response.users;
            data.message = res.data.response.message;
            if (response.meta.status === 200) {
                data.status = true;
            } else {
                data.status = false;
            }
        })
        .catch((err) => {
            data.message = err.data;
        });

    data.isLoading = false;
    dispatch({type: Types.USER_LIST, payload: data});
};

export const getUserDetailAction = (id) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
    };

    dispatch({type: Types.USER_SHOW, payload: data});

    await axios
        .get(`http://laravel07-starter.herokuapp.com/api/v1/user-info/${id}`)
        .then((res) => {
            const {response} = res.data;
            data.data = response.user;
            data.message = response.message;
            if (response.meta.status === 200) {
                data.status = true;
            } else {
                data.status = false;
            }
        })
        .catch((err) => {
            data.message = err.data;
        });

    data.isLoading = false;
    dispatch({type: Types.USER_SHOW, payload: data});
};


export const handleChangeUserInput = (name, value) => (dispatch) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({type: Types.CHANGE_USER_INPUT, payload: data});
};

export const storeUserAction = (userData) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
    };

    dispatch({type: Types.USER_CREATE, payload: data});

    await axios
        .post(
            `http://laravel07-starter.herokuapp.com/api/v1/administrator/users/create`,
            userData
        )
        .then(async (res) => {
            const {response, meta} = res.data;
            data.message = response.message;
            if (meta.status === 200) {
                data.status = true;
                toast.success(data.message);
            } else {
                data.status = false;
                toast.error(data.message);
            }
        })
        .catch((err) => {
            data.message = err.data;
            toast.error(data.message);
        });

    data.isLoading = false;
    dispatch({type: Types.USER_CREATE, payload: data});
};

export const userUpdateAction = (userData, id) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
        data: userData
    };

    dispatch({type: Types.USER_UPDATE, payload: data});

    await axios
        .put(
            `http://laravel07-starter.herokuapp.com/api/v1/user-list/${id}`,
            userData
        )
        .then((res) => {
            const {response, meta} = res.data;
            data.data = response.user;
            data.message = response.message;
            if (meta.status === 200) {
                data.status = true;
                toast.success(response.message);
            } else {
                data.status = false;
                toast.error(response.message);
            }
        })
        .catch((err) => {
            data.message = err.data;
            toast.error(data.message);
        });

    data.isLoading = false;
    dispatch({type: Types.USER_UPDATE, payload: data});
};

/**
 * getSingle user by id
 *
 * @param {integer} id
 */
export const getSingleUserAction = (id) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };

    dispatch({type: Types.USER_SHOW, payload: data});

    await axios
        .get(
            `http://laravel07-starter.herokuapp.com/api/v1/user-list/${id}`
        )
        .then(async (res) => {
            const response = res.data;
            data.data = res.data.response.user;
            data.message = res.data.response.message;
            if (response.meta.status === 200) {
                data.status = true;
            } else {
                data.status = false;
            }
        })
        .catch((err) => {
            data.message = err.data;
        });

    data.isLoading = false;
    dispatch({type: Types.USER_SHOW, payload: data});
};

/**
 * delete user by id
 *
 * @param {integer} id
 */
export const deleteUserAction = (id) => async (dispatch) => {
    let data = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };

    dispatch({type: Types.USER_DELETE, payload: data});

    await axios
        .delete(
            `http://laravel07-starter.herokuapp.com/api/v1/administrator/users/${id}`
        )
        .then(async (res) => {
            const response = res.data;
            data.data = id;
            data.message = res.data.response.message;
            if (response.meta.status === 200) {
                data.status = true;
                toast.success(data.message);
            } else {
                data.status = false;
                toast.error(data.message);
            }
        })
        .catch((err) => {
            data.message = err.data;
        });

    data.isLoading = false;
    dispatch({type: Types.USER_DELETE, payload: data});
};


export const getRolesAction = () => async (dispatch) => {
    let data = {
        isLoading: true,
        all_roles: []
    };
    dispatch({type: Types.GET_USER_ROLES, payload: data});
    await axios
        .get(`http://laravel07-starter.herokuapp.com/api/v1/roles-list`)
        .then(async (res) => {
            const response = res.data;
            data.all_roles = response.response.roles;
        })
        .catch((err) => {
            console.log(err.data);
        });
    data.isLoading = false;
    dispatch({type: Types.GET_USER_ROLES, payload: data});
};

export const getPermissionsAction = () => async (dispatch) => {
    let data = {
        isLoading: true,
        all_permissions: []
    };
    dispatch({type: Types.GET_USER_PERMISSIONS, payload: data});
    await axios
        .get(`http://laravel07-starter.herokuapp.com/api/v1/permissions-list`)
        .then(async (res) => {
            const response = res.data;
            data.all_permissions = response.response.permissions;
        })
        .catch((err) => {
            console.log(err.data);
        });
    data.isLoading = false;
    dispatch({type: Types.GET_USER_PERMISSIONS, payload: data});
};

export const emptyUserMessage = () => (dispatch) => {
    dispatch({ type: Types.EMPTY_USER_MESSAGE, payload: null });
};
