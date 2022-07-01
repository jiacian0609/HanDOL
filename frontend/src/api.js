import axios from 'axios';

const hostname = 'http://52.37.140.157:3000';
export const api = {
    getGroups() {
        return (
            axios.get(hostname + '/cards/groups')
            .then(res => res.data.groups)
            .catch(err => console.log(err))
        )
    },
    getMembers(group_id) {
        return (
            axios.get(hostname + '/cards/members/' + group_id)
            .then(res => res.data.members)
            .catch(err => console.log(err))
        )
    },
    getAlbums(group_id) {
        return(
            axios.get(hostname + '/cards/albums/' + group_id)
            .then(res => res.data.albums)
            .catch(err => console.log(err))
        )
    },
    getVersions(album_id) {
        return (
            axios.get(hostname + '/cards/versions/' + album_id)
            .then(res => res.data.versions)
            .catch(err => console.log(err))
        )
    },
    getCards(query) {
        return (
            axios.post(hostname + '/cards/query', query)
            .then(res => res.data.cards)
            .catch(err => console.log(err))
        )
    },
    getRecords() {
        return(
            axios.get(hostname + '/users/record', {
                headers: {
                    Authorization: window.localStorage.getItem('JWT')
                }
            })
            .then(res => res.data.records)
            .catch(err => console.log(err))
        )
    },
    record(card) {
        return (
            axios.post(hostname + '/users/record', { card_id: card._id }, {
                headers: {
                    Authorization: window.localStorage.getItem('JWT')
                }
            })
            .catch(err => console.log(err))
        )
    },
    post(content, image) {
        return (
            axios.post(hostname + '/users/post', {
                content: content,
                image: image
            }, {
                headers: {
                'Authorization': window.localStorage.getItem('JWT'),
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data.message)
        )
    },
    feedback(title, type, content, image) {
        return (
            axios.post(hostname + '/users/feedback', {
                title: title,
                type: type,
                content: content,
                image: image
            }, {
                headers: {
                'Authorization': window.localStorage.getItem('JWT'),
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data.message)
        )
    },
    getPost() {
        return (
            axios.get(hostname + '/posts')
            .then(res => res.data.posts)
            .catch(err => console.log(err))
        )
    },
    like(post_id) {
        return (
            axios.post(hostname + '/users/like', { post_id: post_id }, {
                headers: {
                    'Authorization': window.localStorage.getItem('JWT')
                }
            })
            .then(res => res)
            .catch(err => console.log(err))
        )
    },
    getLikes() {
        return (
            axios.get(hostname + '/users/like', {
                headers: {
                    'Authorization': window.localStorage.getItem('JWT')
                }
            })
            .then(res => res.data.likes)
            .catch(err => console.log(err))
        )
    },
    signIn(account, password) {
        return (
            axios.post(hostname + '/users/signin', {
                'account': account,
                'password': password
            })
            .then(res => {
                // console.log(res.data);
                // window.alert(res.data.message);
                window.localStorage.setItem('JWT', res.data.token);
                window.location.href = '/home';
            })
            .catch(err => {
                window.alert(err.response.data.message);
            })
        )
    },
    signUp(username, email, password) {
        return (
            axios.post(hostname + '/users/signup', {
                'username': username,
                'email': email,
                'password': password
            })
            .then(res => {
                window.alert(res.data.message);
                window.localStorage.setItem('JWT', res.data.JWT)
                // window.location.href = "/home"
            })
            .catch(err => {
                window.alert(err.response.data.message);
            })
        )
    },
    getUserInfo() {
        return (
            axios.get(hostname + '/users/userInfo', {
                headers: {
                    'Authorization': window.localStorage.getItem('JWT')
                }
            })
            .then(res => res.data.info)
            .catch(err => console.log(err))
        )
    },
    getPersonalPosts() {
        return (
            axios.get(hostname + '/posts/personal', {
                headers: {
                    'Authorization': window.localStorage.getItem('JWT')
                }
            })
            .then(res => res.data.posts)
            .catch(err => console.log(err))
        )
    },
    profileImg(image) {
        // console.log(image);
        return (
            axios.post(hostname + '/users/profileImg', {
                image: image
            }, {
                headers: {
                'Authorization': window.localStorage.getItem('JWT'),
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data.message)
        )
    },
    getComments(post_id) {
        return(
            axios.get(hostname + '/posts/comment/' + post_id)
            .then(res => res.data.comments)
            .catch(err => console.log(err))
        )
    },
    comment(post_id, content) {
        return (
            axios.post(hostname + '/users/comment', {
                post_id: post_id,
                content: content
            }, {
                headers: {
                    'Authorization': window.localStorage.getItem('JWT'),
                }
            })
            .then(res => res)
            .catch(err => {
                window.alert(err.response.data.message);
            })
        )
    }
};
  