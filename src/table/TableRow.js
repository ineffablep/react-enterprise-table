import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import uuid from 'uuid';


const TableRow = ({ row, columns, className, style, onEdit, onDelete }) => {
    return (
        <tr className={'re-tr ' + className} style={style} >
            {columns.map(_ => <TableCell key={uuid.v4()} id={_.id} row={row} />)}
            <td className="re-td-action-btn">
                <button onClick={() => onEdit(row)}> <i className="fa fa-edit re-edit" aria-hidden="true" /> </button>
                <button onClick={() => onDelete(row)}> <i className="fa fa-close re-delete" aria-hidden="true" /> </button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};

TableRow.defaultProps = {
    className: '',
    style: {}
};

export default TableRow;
