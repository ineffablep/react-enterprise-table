import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
const TableCell = ({ row, column, className, style }) => {
    let cellVal = row[column.id];
    if (column.dataType && (column.dataType === 'date' || column.dataType === 'dateTime')) {
        cellVal = dateformat(cellVal, column.dateFormat || 'dd/mm/yyyy');
    }
    return (
        <td className={'re-tc ' + className} style={style}> {cellVal} </td>
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
