import React from 'react';

import { ReactComponent as YoutubeIcon } from '../../../assets/img/svg/youtube.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/img/svg/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/img/svg/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../../assets/img/svg/linkedin.svg';

import './SocialLinks.scss';

export default function SocialLinks() {
    return (
        <div className="social-links">
            <a
                href="/"
                className='youtube'
                target="_blank"
                rel="noopener noreferrer"
            >
                <YoutubeIcon />
            </a>

            <a
                href="/"
                className='twitter'
                target="_blank"
                rel="noopener noreferrer"
            >
                <TwitterIcon />
            </a>

            <a
                href="/"
                className='facebook'
                target="_blank"
                rel="noopener noreferrer"
            >
                <FacebookIcon />
            </a>

            <a
                href="/"
                className='linkedin'
                target="_blank"
                rel="noopener noreferrer"
            >
                <LinkedInIcon />
            </a>
        </div>
    );
}