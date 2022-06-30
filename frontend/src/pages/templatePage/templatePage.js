import { api } from '../../api.js';
import { useState, useEffect, useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { useDrop } from 'react-dnd';
import { TemplateWrapper, TemplateSelectors, TemplateSelectorField, TemplateSelectorName, TemplateSelector, TemplateListWrapper, TemplateListContainer, TemplateEditor, TemplateEditHeader, TemplateEditContainer, TemplateEditField, TemplateEditTitle, TemplateEditSubtitle, TemplateEditList, TemplateEditSellField, TemplateEditPrice } from './templatePage-style.js';
import SubmitButton from '../../components/SubmitButton';
import Card from '../../components/Card';

function ExchangeTemplate({rmCardFromList, records}) {
    const [haveList, setHaveList] = useState([]);
    const [wantList, setWantList] = useState([]);

    const [{haveListIsOver}, haveDropRef] = useDrop(() => ({
        accept: 'card',
        drop: item => setHaveList(templateList => [...templateList, item.card]),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const [{wantListIsOver}, wantDropRef] = useDrop(() => ({
        accept: 'card',
        drop: item => setWantList(templateList => [...templateList, item.card]),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <>
            <TemplateEditSubtitle>I have...</TemplateEditSubtitle>
            <TemplateEditList ref={haveDropRef}>
                {haveList?.map((card, index) =>
                    <Card
                        key={index}
                        card={card}
                        handleClick={() => rmCardFromList(index, haveList, setHaveList)}
                        active={records.includes(card._id)}
                    />
                )}
            </TemplateEditList>
            <TemplateEditSubtitle>I want...</TemplateEditSubtitle>
            <TemplateEditList ref={wantDropRef}>
                {wantList?.map((card, index) =>
                    <Card
                        key={index}
                        card={card}
                        handleClick={() => rmCardFromList(index, wantList, setWantList)}
                        active={records.includes(card._id)}
                    />
                )}
            </TemplateEditList>
        </>
    )
}

function SellTemplate({rmCardFromList, records}) {
    const [sellList, setSellList] = useState([]);

    const [{sellListIsOver}, sellDropRef] = useDrop(() => ({
        accept: 'card',
        drop: item => setSellList(templateList => [...templateList, item.card]),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <TemplateEditList ref={sellDropRef}>
            {sellList?.map((card, index) =>
                <TemplateEditSellField key={index}>
                    <Card
                        card={card}
                        handleClick={() => rmCardFromList(index, sellList, setSellList)}
                        active={records.includes(card._id)}
                    />
                    <TemplateEditPrice placeholder='$'/>
                </TemplateEditSellField>
            )}
        </TemplateEditList>
    )
}

function BuyTemplate({rmCardFromList, records}) {
    const [buyList, setBuyList] = useState([]);

    const [{buyListIsOver}, buyDropRef] = useDrop(() => ({
        accept: 'card',
        drop: item => setBuyList(templateList => [...templateList, item.card]),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    return (
        <>
            <TemplateEditSubtitle>Want to buy...</TemplateEditSubtitle>
            <TemplateEditList ref={buyDropRef}>
                {buyList?.map((card, index) =>
                    <Card
                        key={index}
                        card={card}
                        handleClick={() => rmCardFromList(index, buyList, setBuyList)}
                        active={records.includes(card._id)}
                    />
                )}
            </TemplateEditList>
        </>
    )
}

export default function Template() {
    /* for card list */
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

    /* for editor */
    const [template, setTemplate] = useState('exchange');

    const componentRef = useRef();

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

    function record(card) {
    };

    function rmCardFromList(index, list, setList) {
        setList(list.filter((item, id) => id !== index))
    }

    function exportTemplate() {
        exportComponentAsPNG(componentRef, { fileName: template + 'Template' })
    };

    // console.log(templateList);

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
                    <TemplateListContainer>
                        {cards?.map(card =>
                            <Card
                                key={card._id}
                                card={card}
                                handleClick={record}
                                active={records.includes(card._id)}
                            />
                        )}
                    </TemplateListContainer>
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
                            <option value='sell'>Sell</option>
                            <option value='buy'>Buy</option>
                        </TemplateSelector>
                    </TemplateSelectorField>
                    <SubmitButton handleSubmit={exportTemplate} />
                </TemplateEditHeader>
                <TemplateEditContainer>
                    <TemplateEditField ref={componentRef}>
                        {group && album && <TemplateEditTitle>{group.name} ▪︎ {album.name}</TemplateEditTitle>}
                        {template === 'exchange' && <ExchangeTemplate rmCardFromList={rmCardFromList} records={records} />}
                        {template === 'sell' && <SellTemplate rmCardFromList={rmCardFromList} records={records} />}
                        {template === 'buy' && <BuyTemplate rmCardFromList={rmCardFromList} records={records} />}
                    </TemplateEditField>
                </TemplateEditContainer>
            </TemplateEditor>
        </TemplateWrapper>
    )
}