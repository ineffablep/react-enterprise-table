import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
var RenderBtn = function RenderBtn(_ref) {
    var id = _ref.id,
        show = _ref.show,
        title = _ref.title,
        icon = _ref.icon,
        text = _ref.text,
        className = _ref.className,
        isLink = _ref.isLink,
        link = _ref.link,
        onClick = _ref.onClick;

    return show ? isLink && link ? React.createElement(
        Link,
        { to: id ? link + '/' + id : link + '/',
            title: title,
            className: 're-tbar-btn ' + className },
        React.createElement('i', { className: icon, 'aria-hidden': 'true' }),
        text
    ) : React.createElement(
        'button',
        { key: uuid.v4(),
            className: 're-tbar-btn ' + className,
            onClick: onClick,
            title: title },
        React.createElement('i', { className: icon, 'aria-hidden': 'true' }),
        text
    ) : null;
};

RenderBtn.propTypes = {
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
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