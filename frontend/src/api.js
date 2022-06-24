import axios from 'axios';

const hostname = 'http://localhost:3000';
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
            .catch(err => {
                console.log(err);
            })
        )
    }
};
  