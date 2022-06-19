import axios from 'axios';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { TemplateWrapper, TemplateSelectors, TemplateSelectorField, TemplateSelectorName, TemplateSelector, TemplateListWrapper, TemplateEditor, TemplateEditHeader, TemplateEditField } from './template-style.js';
import SubmitButton from '../../components/SubmitButton';
import Card from '../../components/Card';

const ExportTemplate = forwardRef((props, ref) => (
    <TemplateEditField ref={ref}>
        Hello World
    </TemplateEditField>
));

export default function Template() {
    const componentRef = useRef();

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

    const [template, setTemplate] = useState('exchange');

    // console.log(group);

    /* get group list */
    useEffect(() => {
        axios.get('http://localhost:3000/cards/groups')
        .then(res => {
            // console.log('group res:', res.data.groups);
            // getRecord();
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
            query = {group: group.name, member: member._id, album: album.name, version: version._id};
        else if (member !== undefined) 
            query = {group: group.name, member: member._id, album: album.name};
        else if (version !== undefined) 
            query = {group: group.name, album: album.name, version: version._id};
        else query = {group: group.name, album: album.name};

        // console.log(query);

        axios.post('http://localhost:3000/cards/query', query)
        .then(res => {
            // console.log('res:', res.data.cards);
            setCards(res.data.cards);
            getRecords();
        })
        .catch(err => {
            console.log(err);
        })
	};

    function getRecords() {
        axios.get('http://localhost:3000/users/record', {
			headers: {
			  'Authorization': `${localStorage.getItem('JWT')}`
			}
		})
        .then(res => {
            // console.log('records:', res.data.records);
            setRecords(res.data.records);
        })
		.catch(err => {
			console.log(err);
		})
    };

    function exportTemplate() {
        exportComponentAsPNG(componentRef, { fileName: template + 'Template' })
    };

    return (
        <TemplateWrapper>
            <TemplateSelectors>
                <TemplateSelectorField>
                    <TemplateSelectorName>Group</TemplateSelectorName>
                    <TemplateSelector
                        id='group'
                        defaultValue={groups[0]}
                        onChange={e => setGroup(albums[Number(e.target.value) - 1])}
                    >
                        {groups?.map(item => 
                            <option key={item._id} value={item._id}>{item.name}</option>
                        )}
                    </TemplateSelector>
                </TemplateSelectorField>
                <TemplateSelectorField>
                    <TemplateSelectorName>Member</TemplateSelectorName>
                    <TemplateSelector
                        id='member'
                        defaultValue='all'
                        onChange={e => setMember(members[Number(e.target.value) - 1])}
                    >
                        <option value='all'>All</option>
                        {members?.map(member => 
                            <option key={member._id} value={member._id}>{member.name}</option>
                        )}
                    </TemplateSelector>
                </TemplateSelectorField>
                <TemplateSelectorField>
                    <TemplateSelectorName>Album</TemplateSelectorName>
                    <TemplateSelector
                        id='album'
                        defaultValue={albums[0]}
                        onChange={e => setAlbum(albums[Number(e.target.value) - 1])}
                    >
                        {albums?.map(album => 
                            <option key={album._id} value={album._id}>{album.name}</option>
                        )}
                    </TemplateSelector>
                </TemplateSelectorField>
                <TemplateSelectorField>
                    <TemplateSelectorName>Version</TemplateSelectorName>
                    <TemplateSelector
                        id='version'
                        defaultValue='all'
                        onChange={e => setVersion(versions[Number(e.target.value) - 1])}
                    >
                        <option value='all'>All</option>
                        {versions?.map(version => 
                            <option key={version._id} value={version._id}>{version.name}</option>
                        )}
                    </TemplateSelector>
                </TemplateSelectorField>
                <SubmitButton handleSubmit={getCards}/>
                <TemplateListWrapper>
                    {cards?.map(card =>
                        <Card
                            key={card._id}
                            card={card}
                            active={records.includes(card._id)}
                        />
                    )}
                </TemplateListWrapper>
            </TemplateSelectors>
            <TemplateEditor>
                <TemplateEditHeader>
                    <TemplateSelectorField> 
                        <TemplateSelectorName>Template</TemplateSelectorName>
                        <TemplateSelector
                            id='template'
                            defaultValue='exchange'
                            onChange={e => setTemplate(e.target.value)}
                        >
                            <option value='exchange'>Exchange</option>
                        </TemplateSelector>
                    </TemplateSelectorField>
                    <SubmitButton handleSubmit={exportTemplate} />
                </TemplateEditHeader>
                <ExportTemplate ref={componentRef} />
            </TemplateEditor>
        </TemplateWrapper>
    )
}

/* <ComponentToPrint ref={componentRef} />
            <button onClick={() => exportComponentAsPNG(componentRef, { fileName: 'template'})}>
                Export As PNG
            </button> */