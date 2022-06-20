import { useDrag } from 'react-dnd';
import { CardImage } from './Card-style.js';

export default function Card({card, handleClick, active}) {
    const imgUrl = 'http://localhost:3000/' + card.image;
    // console.log(card._id, active);

    const [{isDragging}, dragRef] = useDrag(() => (
        {
            type: 'card',
            item: { card: card },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }
    ));

    return (
        <CardImage
            src={imgUrl}
            active={active}
            onClick={handleClick}
            ref={dragRef}
        />
    )
}

// style={{ border: isDragging ? 'solid 3px red' : 'none'}}