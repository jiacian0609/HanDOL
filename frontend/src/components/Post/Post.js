import { useState } from 'react';
import axios from 'axios';
import { PostWrapper, PostImg, PostButtons, PostButton, PostUsername, PostContent, PostDate, PostContentField, PostCommentField, PostCommentInput } from './Post-style.js';

export default function Post({post, like, liked}) {
    const [showComment, setShowComment] = useState();
    const imgUrl = 'http://localhost:3000/' + post.image;

    function handleComment() {
        const content = document.getElementById('comment').value;
        
        axios.post('http://localhost:3000/users/comment', {
            post_id: post._id,
            content: content
        }, {
			headers: {
			  'Authorization': window.localStorage.getItem('JWT'),
			}
		})
        .then( (res) => {
            // console.log(res.data);
            // window.alert(res.data.message);
            window.location.reload();
		})
		.catch( (err) => {
			window.alert(err.response.data.message);
		})
    }

    return (
        <PostWrapper>
            <PostImg src={imgUrl} />
            <PostButtons>
                <PostButton src='like' onClick={like} active={liked} />
                <PostButton src='comment' onClick={() => setShowComment(!showComment)} />
            </PostButtons>
            <PostContentField>
                <PostUsername>{post.username}</PostUsername>
                <PostContent>{post.content}</PostContent>
                <PostDate>{new Date(post.time).toDateString()}</PostDate>
            </PostContentField>
            <PostCommentField>
                <PostCommentInput id='comment' onKeyPress={(e) => e.key === 'Enter' && handleComment()} />
            </PostCommentField>
        </PostWrapper>
    )
}