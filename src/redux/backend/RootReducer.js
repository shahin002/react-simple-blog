import { combineReducers } from "redux";
import AuthReducer from "./auth/AuthReducer";
import PostReducer from "./post/PostReducer";
import UserReducer from "./user/UserReducer";


const RootReducer = combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
});

export default RootReducer;
