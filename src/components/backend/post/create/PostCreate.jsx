import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {emptyPostMessage, handleChangePostInput, storePostAction} from '../../../../redux/backend/post/PostAction';

const PostCreate = withRouter(({ history, props }) => {
    const { register, handleSubmit, errors, getValues, reset } = useForm();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.post.isLoading);
    const postAddMessage = useSelector((state) => state.post.postAddMessage);
    const postAddStatus = useSelector((state) => state.post.postAddStatus);
    const postData = useSelector((state) => state.post.postData);

    const submitHandler = () => {
        dispatch(storePostAction(postData));
    }

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangePostInput(name, value));
    };

    useEffect(() => {
        if (typeof postAddMessage !== 'undefined' || postAddMessage !== null) {
            if (postAddStatus && postAddMessage.length > 0) {
                // We can push to list OR, make feilds empty.
                dispatch(emptyPostMessage());
                history.push("/posts");
            }
        }
    }, [postAddStatus, postAddMessage, history]);

    return (
        <>
            {/* <!-- Page Header --> */}
                <div className="content bg-gray-lighter">
                    <div className="row items-push">
                        <div className="col-sm-8">
                            <h1 className="page-heading">
                                Create Post
                            </h1>
                        </div>
                        <div className="col-sm-4 text-right hidden-xs">
                            <ol className="breadcrumb push-10-t">
                                <li><a href="http://laravel07-starter.herokuapp.com/administrator/posts">Posts</a></li>
                                <li className="link-effect">Create Post</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {/* <!-- END Page Header --> */}

                {/* <!-- Page Content --> */}
                <div className="content content-narrow">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <!-- Static Labels --> */}
                            <div className="block">
                                <div className="block-content block-content-narrow">
                                    <form className="form-horizontal push-10-t add-post-form" onSubmit={handleSubmit(submitHandler)} method="POST">
                                        {/* <input type="hidden" name="_token" value="c8ASC4EeZ1OISPDK9JBxaz85ZfzDrVpnbWtyW9DB" /> */}

                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <div className="form-material form-material-primary">
                                                    <label htmlFor="post-title">Title</label>
                                                    <input className="form-control"
                                                        type="text" id="post-title"
                                                        name="title"
                                                        placeholder="Post Title"
                                                        required=""
                                                        aria-required="true"
                                                        ref={register({
                                                            required: 'Please give post title'
                                                        })}
                                                        onChange={(e) => handleChangeTextInput('title', e.target.value)}
                                                        value={postData.title}
                                                        autoComplete="name"
                                                    />
                                                    {
                                                        errors.title &&
                                                        <div className="text-danger text-sm">{errors.title.message}</div>
                                                    }
                                                </div>

                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-sm-12">
                                                <div className="form-material form-material-primary">
                                                    <label htmlFor="post-body">Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        type="text"
                                                        id="post-body"
                                                        name="body"
                                                        placeholder="Post Description"
                                                        required=""
                                                        aria-required="true"
                                                        ref={register({
                                                            required: 'Please give post description'
                                                        })}
                                                        onChange={(e) => handleChangeTextInput('body', e.target.value)}
                                                        value={postData.body}
                                                    ></textarea>
                                                    {
                                                        errors.body &&
                                                        <div className="text-danger text-sm">{errors.body.message}</div>
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
                                            }                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* <!-- END Static Labels --> */}
                        </div>
                    </div>
                </div>
                {/* <!-- END Page Content --> */}
        </>
     );
})

export default PostCreate;
