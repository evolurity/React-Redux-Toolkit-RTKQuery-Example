import React, {useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(5);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 10000
    });
    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();


    const handleCreate = async () => {
        const title = prompt('Enter post title here...')
        await createPost({title, body: title} as IPost);
    }

    return (
        <div>
            <div>
                <button onClick={() => setLimit(prevState => prevState + 5)}>SHOW MORE POSTS</button>
                <button onClick={refetch}>REFETCH</button>
                <button onClick={handleCreate}>ADD NEW POST</button>
                {isLoading && <h1>Loading..</h1>}
                {error && <h1>Error</h1>}
                {posts && posts.map(post => <PostItem remove={deletePost} update={updatePost} key={post.id}
                                                      post={post}/>)}
            </div>

        </div>
    );
};

export default PostContainer;


