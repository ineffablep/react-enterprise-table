import React from 'react';
import PropTypes from 'prop-types';


const TableCell = ({ row, id, className, style }) => {
    return (
        <td className={'re-tc ' + className} style={style}> {row[id]} </td>
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
