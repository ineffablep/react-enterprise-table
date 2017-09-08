import React from 'react';
import PropTypes from 'prop-types';
import TableCell from './TableCell';
import uuid from 'uuid';

var TableRow = function TableRow(_ref) {
    var row = _ref.row,
        columns = _ref.columns,
        className = _ref.className,
        style = _ref.style,
        onEdit = _ref.onEdit,
        onDelete = _ref.onDelete;

    return React.createElement(
        'tr',
        { className: 're-tr ' + className, style: style },
        columns.map(function (_) {
            return React.createElement(TableCell, { key: uuid.v4(), id: _.id, row: row });
        }),
        React.createElement(
            'td',
            { className: 're-td-action-btn' },
            React.createElement(
                'button',
                { onClick: function onClick() {
                        return onEdit(row);
                    } },
                ' ',
                React.createElement('i', { className: 'fa fa-edit re-edit', 'aria-hidden': 'true' }),
                ' '
            ),
            React.createElement(
                'button',
                { onClick: function onClick() {
                        return onDelete(row);
                    } },
                ' ',
                React.createElement('i', { className: 'fa fa-close re-delete', 'aria-hidden': 'true' }),
                ' '
            )
        )
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