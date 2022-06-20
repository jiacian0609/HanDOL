import { PostWrapper, PostImg, PostContent } from './Post-style.js';

export default function Post({post}) {
    const imgUrl = 'http://localhost:3000/' + post.image;

    return (
        <PostWrapper>
            <PostImg src={imgUrl} />
            <div>{post.user_id}</div>
            <div>{post.time}</div>
            <PostContent>{post.content}</PostContent>
        </PostWrapper>
    )
}

// style={{ border: isDragging ? 'solid 3px red' : 'none'}}