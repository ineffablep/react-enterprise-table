import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';

var TableRow = function TableRow(_ref) {
    var row = _ref.row,
        columns = _ref.columns,
        className = _ref.className,
        style = _ref.style,
        editBtn = _ref.editBtn,
        deleteBtn = _ref.deleteBtn,
        viewBtn = _ref.viewBtn,
        customBtns = _ref.customBtns,
        showRowActionBtns = _ref.showRowActionBtns,
        showRowSelectionCheckBox = _ref.showRowSelectionCheckBox,
        onRowCheckChange = _ref.onRowCheckChange;

    return React.createElement(
        'tr',
        { className: 're-tr ' + className, style: style, id: row.id },
        showRowSelectionCheckBox && React.createElement(
            'td',
            null,
            ' ',
            React.createElement('input', { type: 'checkbox',
                className: 're-td-checkbox', checked: row.selected,
                onChange: function onChange(e) {
                    return onRowCheckChange(e.target.checked, row);
                } }),
            ' '
        ),
        columns.filter(function (_) {
            return _.show;
        }).map(function (_) {
            return React.createElement(TableCell, { key: uuid.v4(), column: _, row: row });
        }),
        showRowActionBtns && React.createElement(
            'td',
            { className: 're-td-action-btn' },
            viewBtn && viewBtn.show && React.createElement(RenderBtn, Object.assign({}, viewBtn, {
                title: viewBtn.title || 'View Record',
                className: ' no-border ' + viewBtn.className,
                icon: !viewBtn.icon && !viewBtn.text ? 'fa fa-eye' : viewBtn.icon
            })),
            editBtn && editBtn.show && React.createElement(RenderBtn, Object.assign({}, editBtn, {
                className: ' no-border ' + editBtn.className,
                title: editBtn.title || 'Edit Record',
                icon: !editBtn.icon && !editBtn.text ? 'fa fa-edit' : editBtn.icon })),
            deleteBtn && deleteBtn.show && React.createElement(RenderBtn, Object.assign({}, deleteBtn, {
                title: deleteBtn.title || 'Delete Record',
                className: ' no-border ' + deleteBtn.className,
                icon: !deleteBtn.icon && !deleteBtn.text ? 'fa fa-trash' : deleteBtn.icon
            })),
            customBtns && customBtns && customBtns.map(function (_) {
                _.show = true;
                return React.createElement(RenderBtn, Object.assign({}, _, {
                    className: ' no-border ' + _.className,
                    key: uuid.v4() }));
            })
        )
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