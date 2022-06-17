import { CardImage } from './Card-style.js';

export default function Card({card, record, active}) {
    const imgUrl = 'http://localhost:3000/' + card.image;
    // console.log(card._id, active);

    return (
        <div onClick={() => record(card)}>
            <CardImage src={imgUrl} active={active}/>
        </div>
    )
}