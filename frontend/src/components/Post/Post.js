import { useState, useEffect } from 'react';
import axios from 'axios';
import { PostWrapper, PostImg, PostButtons, PostButton, PostUsername, PostContent, PostDate, PostContentField, PostCommentField, PostComment, PostCommentInput } from './Post-style.js';
import { api } from '../../api.js';

export default function Post({post, like, liked}) {
    const [showComment, setShowComment] = useState();
    const [comments, setComments] = useState([]);

    const imgUrl = 'http://52.37.140.157:3000/' + post.image;

    useEffect(() => {
    }, [comments]);

    async function handleClickComment() {
        if (!showComment)
            await api.getComments(post._id)
            .then(res => setComments(res));
        setShowComment(!showComment)
    }

    function handleComment(e) {
        const content = document.getElementById('comment').value;
        
        api.comment(post._id, content)
        .then(res => {
            api.getComments(post._id)
            .then(res => setComments(res));
            e.target.value = '';
        });
    }

    // console.log(comments);

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