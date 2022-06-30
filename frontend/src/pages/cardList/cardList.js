import { useState, useEffect  } from 'react';
import { api } from '../../api.js';
import { CardListWrapper, CardListSelectors, CardListSelectorField, CardListSelectorName, CardListSelector, CardListListContainer, CardListListWrapper } from './cardList-style.js';
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

    // console.log(records);

    useEffect(() => {
        if (!group)
            api.getGroups()
            .then(res => {
                setGroups(res);
                setGroup(res[0]);
            });
	}, []);

    useEffect(() => {
        if (group)
            api.getMembers(group._id)
            .then(res => {
                setMembers(res);
                setMember('all');
            });
    }, [group]);

    useEffect(() => {
        if (member)
            api.getAlbums(group._id)
            .then(res => {
                setAlbums(res);
                setAlbum(res[0]);
            });
    }, [member]);

    useEffect(() => {
        if (album)
            api.getVersions(album._id)
            .then(res => {
                setVersions(res);
                setVersion('all');
            });
    }, [album]);

    function getCards() {
        let query;
        if (member !== undefined && version !== undefined)
            query = {group: group.name, member: member._id, album: album.name, version: version._id};
        else if (member !== undefined) 
            query = {group: group.name, member: member._id, album: album.name};
        else if (version !== undefined) 
            query = {group: group.name, album: album.name, version: version._id};
        else query = {group: group.name, album: album.name};

        api.getCards(query)
        .then(res => {
            setCards(res);
            
            api.getRecords()
            .then(res => setRecords(res));
        })
	};

    // console.log(records);

    function record(card) {
        // console.log(card._id)
        if (!records.includes(card._id))
            setRecords([...records, card._id]);
        else setRecords(records.filter(post => post !== card._id));

        api.record(card);
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
            <CardListListContainer>
                <CardListListWrapper>
                    {cards?.map(card =>
                        <Card
                            key={card._id}
                            card={card}
                            handleClick={() => record(card)}
                            active={records.includes(card._id)}
                        />
                    )}
                </CardListListWrapper>
            </CardListListContainer>
        </CardListWrapper>
    )
}