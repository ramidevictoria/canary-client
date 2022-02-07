import React from 'react';
import Logo from '../../../../assets/img/jpg/logo.svg';

import './MyInfo.scss';

export default function MyInfo() {
    return (
        <div className="my-info">
            <img src={Logo} alt="canary" />
            <div className="my-info__title">Canary</div>
        </div>
    )
}
