import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminWrapper, StyledTable } from './admin-style';
import MessageCard from '../../components/MessageCard';

function deleteMessage(id) {
    axios.delete('http://localhost:3000/messages/' + id, {})
    .then((response) => {
        console.log(response);
        if (response.status === 200)
            window.alert('Message deleted!');
        window.location.reload()
    })
    .catch((error) => console.log(error))
}

const TableMarkup = ({ titles, data }) => (
  <StyledTable>
    <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
    </colgroup>
    <thead>
        <tr>
            {titles.map((title, index) => (
            <th key={index}>{title}</th>
            ))}
        </tr>
    </thead>
    <tbody>
        {data.map((item, index) => (
            <tr key={index}>
                <td>{item['id']}</td>
                <td>{new Date(item['timestamp']).toString()}</td>
                <td>{item['name']}</td>
                <td>{item['email']}</td>
                <td>{item['message']}</td>
                <td>
                    <button onClick={() => deleteMessage(item['id'])}>X</button>
                </td>
            </tr>
        ))}
    </tbody>
    {/* <tfoot>
      <tr>
        {titles.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </tr>
    </tfoot> */}
  </StyledTable>
);


export default function Admin() {
    const [messages, setMessages] = useState([]);
    const titles = ['id', 'timestamp', 'name', 'email', 'message', 'delete']

    useEffect(() => {
		axios.get('http://localhost:3000/messages', {})
		.then((response) => setMessages(response.data))
		.catch((error) => console.log(error))
	}, []);

    // console.log(messages);

    return (
        <AdminWrapper>
            <TableMarkup titles={titles} data={messages} />
        </AdminWrapper>
    )
}

// {messages?.map(message => <MessageCard message={message} key={message.id} />)}