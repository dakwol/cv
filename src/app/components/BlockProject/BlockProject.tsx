import React, { FC, useState } from 'react';
import './styles.scss';

type BlockProjectProps = {
    linkImg?: string;
    title: string;
    text: string;
    date?: Date;
    theme?: 'ui' | 'ux';
}

const BlockProject:FC<BlockProjectProps> = ({
    linkImg,
    title,
    text,
    date,
    theme = 'ux'
}) => {

  const [isHover, setIsHover] = useState<boolean>(false);
  const placeholderImage = `https://placehold.co/600x400/grey/white?text=${title}`;
  
  return (
    <div className='blockProjectContainer' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover((false))}>
        <img src={(theme === 'ux' && !isHover) ? placeholderImage : linkImg} alt={title} className='blockProjectImage'></img>

        <div className='blockProjectContent'>
            <h2 className='blockProjectTitle'>{title}</h2>
            <p className='blockProjectText'>{text}</p>
        </div>
    </div>
  )
}

export default BlockProject;