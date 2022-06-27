import { useState, useEffect } from 'react';
import axios from 'axios';
import { PostWrapper, PostImg, PostButtons, PostButton, PostUsername, PostContent, PostDate, PostContentField, PostCommentField, PostComment, PostCommentInput } from './Post-style.js';

export default function Post({post, like, liked}) {
    const [showComment, setShowComment] = useState();
    const [comments, setComments] = useState([]);

    const imgUrl = 'http://localhost:3000/' + post.image;

    useEffect(() => {
    }, [comments]);

    async function handleClickComment() {
        if (!showComment) await getComments();
        setShowComment(!showComment)
    }

    async function getComments() {
        axios.get('http://localhost:3000/posts/comment/' + post._id)
        .then(res => {
            setComments(res.data.comments);
        })
		.catch(err => {
			console.log(err);
		})
    }

    function handleComment(e) {
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
            getComments();
            e.target.value = '';
		})
		.catch( (err) => {
			window.alert(err.response.data.message);
		})
    }

    console.log(comments);

    return (
        <PostWrapper>
            <PostImg src={imgUrl} />
            <PostButtons>
                <PostButton src='like' onClick={like} active={liked} />
                <PostButton src='comment' onClick={() => handleClickComment()} />
            </PostButtons>
            <PostContentField>
                <PostUsername>{post.username}</PostUsername>
                <PostContent>{post.content}</PostContent>
                <PostDate>{new Date(post.time).toDateString()}</PostDate>
            </PostContentField>
            {showComment &&
                <PostCommentField>
                    {comments?.map(comment => 
                        <PostComment key={comment._id}>
                            <PostUsername>{comment.username}</PostUsername>
                            <PostContent>{comment.content}</PostContent>
                        </PostComment>
                    )}
                    <PostCommentInput id='comment' onKeyPress={(e) => e.key === 'Enter' && handleComment(e)} />
                </PostCommentField>
            }
        </PostWrapper>
    )
}