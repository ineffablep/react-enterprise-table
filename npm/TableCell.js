import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
var TableCell = function TableCell(_ref) {
    var row = _ref.row,
        column = _ref.column,
        className = _ref.className,
        style = _ref.style;

    var cellVal = row[column.id];
    if (column.dataType && (column.dataType === 'date' || column.dataType === 'dateTime')) {
        cellVal = dateformat(cellVal, column.dateFormat || 'dd/mm/yyyy');
    }
    return React.createElement(
        'td',
        { className: 're-tc ' + className, style: style },
        ' ',
        cellVal,
        ' '
    );
};

TableCell.propTypes = {
    row: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

TableCell.defaultProps = {
    className: '',
    style: {}
};
export default TableCell;