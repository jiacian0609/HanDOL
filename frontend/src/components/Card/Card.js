import { CardImage } from './Card-style.js';
import axios from 'axios';

export default function Card({card}) {
    const imgUrl = 'http://localhost:3000/' + card.image;

    function record(card) {
        console.log('click', card);

        const query = {};
        axios.post('http://localhost:3000/users/record', card._id, {
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
        <div onClick={() => record(card)}>
            <CardImage src={imgUrl} />
        </div>
    )
}