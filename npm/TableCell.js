import React from 'react';
import PropTypes from 'prop-types';

var TableCell = function TableCell(_ref) {
    var row = _ref.row,
        id = _ref.id,
        className = _ref.className,
        style = _ref.style;

    return React.createElement(
        'td',
        { className: 're-tc ' + className, style: style },
        ' ',
        row[id],
        ' '
    );
};

TableCell.propTypes = {
    row: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

TableCell.defaultProps = {
    className: '',
    style: {}
};
export default TableCell;