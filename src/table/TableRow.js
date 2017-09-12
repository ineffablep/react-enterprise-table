import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';


const TableRow = ({ row, columns, className, style, editBtn, deleteBtn, viewBtn, customBtns, showRowActionBtns, showRowSelectionCheckBox, onRowCheckChange }) => {
    return (
        <tr className={'re-tr ' + className} style={style} id={row.id}>
            {showRowSelectionCheckBox && <td> <input type="checkbox"
                className="re-td-checkbox" checked={row.selected}
                onChange={(e) => onRowCheckChange(e.target.checked, row)} /> </td>}
            {columns.filter(_ => _.show).map(_ => <TableCell key={uuid.v4()} column={_} row={row} />)}
            {showRowActionBtns &&
                <td className="re-td-action-btn">
                    {viewBtn && viewBtn.show &&
                        <RenderBtn
                            {...viewBtn}
                            title={viewBtn.title || 'View Record'}
                            className={' no-border ' + viewBtn.className}
                            icon={(!viewBtn.icon && !viewBtn.text) ? 'fa fa-eye' : viewBtn.icon}
                        />}
                    {editBtn && editBtn.show &&
                        <RenderBtn {...editBtn}
                            className={' no-border ' + editBtn.className}
                            title={editBtn.title || 'Edit Record'}
                            icon={(!editBtn.icon && !editBtn.text) ? 'fa fa-edit' : editBtn.icon} />}
                    {deleteBtn && deleteBtn.show &&
                        <RenderBtn {...deleteBtn}
                            title={deleteBtn.title || 'Delete Record'}
                            className={' no-border ' + deleteBtn.className}
                            icon={(!deleteBtn.icon && !deleteBtn.text) ? 'fa fa-trash' : deleteBtn.icon}
                        />}
                    {customBtns && customBtns && customBtns.map(_ => {
                        _.show = true;
                        return (<RenderBtn {..._}
                            className={' no-border ' + _.className}
                            key={uuid.v4()} />);
                    })}
                </td>}
        </tr>
    );
};

TableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    className: PropTypes.string,
    showRowSelectionCheckBox: PropTypes.bool,
    onRowCheckChange: PropTypes.func,
    showRowActionBtns: PropTypes.bool,
    style: PropTypes.object,
    editBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    viewBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    deleteBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }),
    customBtns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        isLink: PropTypes.bool,
        link: PropTypes.string
    }))
};

TableRow.defaultProps = {
    className: '',
    style: {},
    showRowActionBtns: true
};

export default TableRow;
