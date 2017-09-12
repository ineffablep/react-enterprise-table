import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
const RenderBtn = ({ id, show, title, icon, text, className, isLink, link, onClick }) => {
    return show ?
        ((isLink && link ?
            <Link to={id ? link + '/' + id : link + '/'}
                title={title}
                className={'re-tbar-btn ' + className}>
                <i className={icon} aria-hidden="true" />
                {text}
            </Link>
            :
            <button key={uuid.v4()}
                className={'re-tbar-btn ' + className}
                onClick={onClick}
                title={title}>
                <i className={icon} aria-hidden="true" />
                {text}
            </button>)) : null;
};

RenderBtn.propTypes = {
    id: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number
    ]),
    show: PropTypes.bool,
    title: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    isLink: PropTypes.bool,
    link: PropTypes.string
};

export default RenderBtn;
