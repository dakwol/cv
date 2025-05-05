import classNames from 'classnames';
import React, { FC } from 'react';
import './styles.scss';

type ButtonProps = {
    label: string,
    type?: 'submit' | 'reset' | 'button';
    onClick: () => void,
}

const Button:FC<ButtonProps> = ({
    label,
    type,
    onClick
}) => {
  return (
    <button className={classNames('buttonContainer')} onClick={() => onClick()} type={type}>{label}</button>
  )
}

export default Button;