import axios from 'axios';
import { useState,useEffect  } from 'react';
import './cardList-style.js';
import { CardListWrapper, CardListSelectors, CardListSelectorField, CardListSelectorName, CardListSelector, CardListListWrapper } from './cardList-style.js';
import SubmitButton from '../../components/SubmitButton';
import Card from '../../components/Card';

export default function CardList() {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState();
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState();
    const [versions, setVersions] = useState([]);
    const [version, setVersion] = useState();
    const [cards, setCards] = useState([]);
    const [records, setRecords] = useState([]);

    // console.log(group);

    /* get group list */
    useEffect(() => {
        axios.get('http://localhost:3000/cards/groups')
        .then(res => {
            // console.log('group res:', res.data.groups);
            setGroups(res.data.groups);
            setGroup(res.data.groups[0]);
        })
		.catch(err => {
			console.log(err);
		})
	}, []);

    /* get member & album list */
    useEffect(() => async function () {
        // console.log('group:', group);
        if (group) {
            /* get member list */
            await axios.get('http://localhost:3000/cards/members/' + group._id)
            .then(res => {
                // console.log('res:', res);
                setMembers(res.data.members);
                setMember('all');
            })
            .catch(err => {
                console.log(err);
            })

            /* get album list */
            await axios.get('http://localhost:3000/cards/albums/' + group._id)
            .then(res => {
                // console.log('res:', res);
                setAlbums(res.data.albums);
                setAlbum(res.data.albums[0]);
            })
            .catch(err => {
                console.log(err);
            })
        }       
	}, [group]);

    /* get version list */
    useEffect(() => {
        // console.log(album)
        if (album)
            axios.get('http://localhost:3000/cards/versions/' + album._id)
            .then(res => {
                // console.log('res:', res);
                setVersions(res.data.versions);
                setVersion('all');
            })
            .catch(err => {
                console.log(err);
            })
	}, [album]);

    /* get card list */
    function getCards() {
        let query;
        // console.log(group, member, album, version)
        if (member !== undefined && version !== undefined)
            query = {group: group.name, member: member.name, album: album.name, version: version.name};
        else if (member !== undefined) 
            query = {group: group.name, member: member.name, album: album.name};
        else if (version !== undefined) 
            query = {group: group.name, album: album.name, version: version.name};
        else query = {group: group.name, album: album.name};

        // console.log(query);

        axios.post('http://localhost:3000/cards/query', query)
        .then(res => {
            // console.log('res:', res.data.cards);
            setCards(res.data.cards);
            getRecord();
        })
        .catch(err => {
            console.log(err);
        })
	};

    function getRecord() {
        axios.get('http://localhost:3000/users/record', {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
        .then(res => {
            console.log('records:', res.data.records);
            setRecords(res.data.records);
        })
		.catch(err => {
			console.log(err);
		})
    }

    function record(card) {
        // console.log('click', card._id);

        axios.post('http://localhost:3000/users/record', { card_id: card._id }, {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
        .then(res => {
            console.log('res:', res.data);
            window.alert(res.data.message);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <CardListWrapper>
            <CardListSelectors>
                <CardListSelectorField>
                    <CardListSelectorName>Group</CardListSelectorName>
                    <CardListSelector
                        id='group'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(albums[Number(e.target.value) - 1])}
                    >
                        {groups?.map(item => 
                            <option key={item._id} value={item._id}>{item.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Member</CardListSelectorName>
                    <CardListSelector
                        id='member'
                        defaultValue='all'
                        onChange={e => setMember(members[Number(e.target.value) - 1])}
                    >
                        <option value='all'>All</option>
                        {members?.map(member => 
                            <option key={member._id} value={member._id}>{member.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Album</CardListSelectorName>
                    <CardListSelector
                        id='album'
                        defaultValue={albums[0]}
                        onChange={e => setAlbum(albums[Number(e.target.value) - 1])}
                    >
                        {albums?.map(album => 
                            <option key={album._id} value={album._id}>{album.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Version</CardListSelectorName>
                    <CardListSelector
                        id='version'
                        defaultValue='all'
                        onChange={e => setVersion(versions[Number(e.target.value) - 1])}
                    >
                        <option value='all'>All</option>
                        {versions?.map(version => 
                            <option key={version._id} value={version._id}>{version.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <SubmitButton handleSubmit={getCards}/>
            </CardListSelectors>
            <CardListListWrapper>
                {cards?.map(card => <Card key={card._id} card={card} record={record} />)}
            </CardListListWrapper>
        </CardListWrapper>
    )
}