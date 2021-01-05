import * as Types from "../Types";

// Initial state
const initialState = {
    userList: [],
    all_roles: [],
    all_permissions: [],
    isLoading: false,

    userAddStatus: false,
    userAddMessage: "",

    userUpdateStatus: false,
    userUpdateMessage: "",

    userDeleteStatus: false,
    userDeleteMessage: "",
    userData: {
        id: 0,
        name: '',
        email: '',
        password: '',
        roles: [],
        permissions: []
    }
};

const UserReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case Types.USER_LIST:
            return {
                ...state,
                userList: action.payload.data,
            };

        case Types.USER_CREATE:
            return {
                ...state,
                userAddStatus: action.payload.status,
                userAddMessage: action.payload.message,
                isLoading: action.payload.isLoading,
            };

        case Types.USER_SHOW:
            return {
                ...state,
                userData: action.payload.data,
            };

        case Types.CHANGE_USER_INPUT:
            const userData = {...state.userData};
            userData[action.payload.name] = action.payload.value;
            return {
                ...state,
                userData
            };

        case Types.EMPTY_USER_MESSAGE:
            return {
                ...state,
                userAddMessage: null,
                userUpdateMessage: null,
                userDeleteMessage: null,
            };

        case Types.USER_DELETE:
            const deletedID = action.payload.data;
            const updatedUserList = state.userList.filter((x) => x.id != deletedID);
            return {
                ...state,
                userList: updatedUserList,
                userDeleteStatus: action.payload.status,
                userDeleteMessage: action.payload.message,
            };

        case Types.USER_UPDATE:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                userData: action.payload.data,
                userUpdateStatus: action.payload.status,
                userUpdateMessage: action.payload.message,
            };

        case Types.GET_USER_ROLES:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                all_roles: action.payload.all_roles,
            };

        case Types.GET_USER_PERMISSIONS:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                all_permissions: action.payload.all_permissions,
            };

        default:
            break;
    }
    return newState;
};

export default UserReducer;
