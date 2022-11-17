import React, {FC} from 'react';
import {IPost} from "../models/IPost";

interface PostItemProps {
    post: IPost;
    remove: (post: IPost) => void;
    update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, remove, update}) => {
    const handleUpdate = async () => {
        const title = prompt('Enter new post title here...')
        await update({...post, title} as IPost);
    }

    const handleRemove = async (event: React.MouseEvent) => {
        event.stopPropagation()
        await remove(post)
    }

    return (
        <div onClick={handleUpdate}>
            {post.id}. {post.title}
            <button onClick={handleRemove}>Delete</button>
        </div>
    );
};

export default PostItem;