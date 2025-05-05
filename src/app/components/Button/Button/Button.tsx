import classNames from 'classnames';
import React, { FC } from 'react';
import './styles.scss';

type ButtonProps = {
  label: string,
  type?: 'submit' | 'reset' | 'button';
  onClick: () => void,
  icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
                                   label,
                                   type = 'button',
                                   onClick,
                                   icon
                                 }) => {
  return (
    <button
      className={classNames('buttonContainer', { 'has-icon': icon })}
      onClick={onClick}
      type={type}
    >
      {icon && (typeof icon === 'string'
        ? <img src={icon} alt="" className="button-icon" />
        : <span className="button-icon">{icon}</span>)}
      {label}
    </button>
  )
}
export default Button;