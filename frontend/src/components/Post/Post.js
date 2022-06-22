import { PostWrapper, PostImg, PostButtons, PostButton, PostUsername, PostContent, PostDate, PostContentField } from './Post-style.js';

export default function Post({post, like, liked}) {
    const imgUrl = 'http://localhost:3000/' + post.image;

    return (
        <PostWrapper>
            <PostImg src={imgUrl} />
            <PostButtons>
                <PostButton src='like' onClick={like} active={liked} />
                <PostButton src='comment' />
            </PostButtons>
            <PostContentField>
                <PostUsername>{post.username}</PostUsername>
                <PostContent>{post.content}</PostContent>
                <PostDate>{new Date(post.time).toDateString()}</PostDate>
            </PostContentField>
        </PostWrapper>
    )
}

// style={{ border: isDragging ? 'solid 3px red' : 'none'}}