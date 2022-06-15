import axios from 'axios';
import { useState,useEffect  } from 'react';
import './cardList-style.js';
import { CardListWrapper, CardListSelectors, CardListSelectorField, CardListSelectorName, CardListSelector } from './cardList-style.js';

export default function CardList() {
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/cards/groups')
        .then(res => {
            console.log('res:', res);
            setGroups(res.data.groups);
        })
		.catch(err => {
			window.alert(err.response.data.message);
		})
	}, []);

    console.log(groups)

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
                        {groups?.map(group => 
                            <option key={group._id} value={group.name}>{group.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Member</CardListSelectorName>
                    <CardListSelector
                        id='member'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {groups?.map(group => 
                            <option key={group._id} value={group.name}>{group.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Album</CardListSelectorName>
                    <CardListSelector
                        id='album'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {groups?.map(group => 
                            <option key={group._id} value={group.name}>{group.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
                <CardListSelectorField>
                    <CardListSelectorName>Version</CardListSelectorName>
                    <CardListSelector
                        id='version'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(e.target.value)}
                    >
                        <option value='all'>All</option>
                        {groups?.map(group => 
                            <option key={group._id} value={group.name}>{group.name}</option>
                        )}
                    </CardListSelector>
                </CardListSelectorField>
            </CardListSelectors>
        </CardListWrapper>
    )
}