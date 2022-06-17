import { CardImage } from './Card-style.js';

export default function Card({card, record}) {
    const imgUrl = 'http://localhost:3000/' + card.image;

    return (
        <div onClick={() => record(card)}>
            <CardImage src={imgUrl} />
        </div>
    )
}