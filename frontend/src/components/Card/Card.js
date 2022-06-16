import { Link } from 'react-router-dom';
import { CardImage } from './Card-style.js';

export default function Card({card}) {
    const imgUrl = 'http://localhost:3000/' + card.image;

    return (
        <CardImage src={imgUrl} />
    )
}