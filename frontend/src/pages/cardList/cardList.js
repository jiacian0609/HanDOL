import axios from 'axios';
import { useState,useEffect  } from 'react';
import './cardList-style.js';
import { CardListWrapper, CardListSelectors, CardListSelectorField, CardListSelectorName, CardListSelector } from './cardList-style.js';

export default function CardList() {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState();
    const [albums, setAlbums] = useState([]);
    const [album, setAlbum] = useState();
    const [versions, setVersions] = useState([]);
    const [version, setVersion] = useState();

    console.log('groups:', groups, 'group:', group)

    useEffect(() => {
        axios.get('http://localhost:3000/cards/groups')
        .then(res => {
            // console.log('res:', res);
            setGroups(res.data.groups);
            setGroup(res.data.groups[0]);
        })
		.catch(err => {
			console.log(err.response.data.message);
		})
	}, []);

    
    useEffect(() => {
        if (group)
            axios.get('http://localhost:3000/cards/albums/' + group._id)
            .then(res => {
                // console.log('res:', res);
                setAlbums(res.data.albums);
            })
            .catch(err => {
                console.log(err.response.data.message);
            })
	}, [group]);

    return (
        <CardListWrapper>
            <CardListSelectors>
                <CardListSelectorField>
                    <CardListSelectorName>Group</CardListSelectorName>
                    <CardListSelector
                        id='group'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(e.target.value)}
                    >
                        {groups?.map(item => 
                            <option key={item._id} value={item}>{item.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Member</CardListSelectorName>
                    <CardListSelector
                        id='member'
                        defaultValue='all'
                        onChange={e => setMember(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {members?.map(member => 
                            <option key={member._id} value={member.name}>{member.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Album</CardListSelectorName>
                    <CardListSelector
                        id='album'
                        defaultValue='all'
                        onChange={e => setAlbum(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {albums?.map(album => 
                            <option key={album._id} value={album.name}>{album.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Version</CardListSelectorName>
                    <CardListSelector
                        id='version'
                        defaultValue='all'
                        onChange={e => setVersion(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {versions?.map(version => 
                            <option key={version._id} value={version.name}>{version.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
            </CardListSelectors>
        </CardListWrapper>
    )
}