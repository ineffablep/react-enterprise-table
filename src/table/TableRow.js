import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import uuid from 'uuid';


const TableRow = ({ row, columns, className, style }) => {
    return (
        <tr className={"re-tr " + className} style={style} >
            {columns.map(_ => <TableCell key={uuid.v4()} id={_.id} row={row} />)}
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

TableRow.defaultProps = {
    className: '',
    style: {}
}

export default TableRow;
