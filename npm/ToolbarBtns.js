import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';

var ToolbarBtns = function ToolbarBtns(_ref) {
    var addNewBtn = _ref.addNewBtn,
        uploadBtn = _ref.uploadBtn,
        exportBtn = _ref.exportBtn,
        customBtns = _ref.customBtns,
        onSearch = _ref.onSearch,
        showGlobalSearch = _ref.showGlobalSearch,
        columnChooser = _ref.columnChooser,
        showSelect = _ref.showSelect,
        columns = _ref.columns,
        data = _ref.data;

    return React.createElement(
        'div',
        { className: 're-action-btns' },
        columnChooser && React.createElement(
            'span',
            { className: 're-column-chooser' },
            React.createElement(RenderBtn, columnChooser),
            showSelect && React.createElement(
                'ul',
                { className: 're-ul-col-chooser' },
                columns && columns.map(function (column) {
                    return React.createElement(
                        'li',
                        { key: uuid.v4() },
                        React.createElement(
                            'button',
                            { className: 're-col-chooser',
                                onClick: function onClick() {
                                    return columnChooser.onColumnSelect(column);
                                } },
                            column.show && React.createElement('i', { className: 'fa fa-check' }),
                            ' ',
                            column.name
                        )
                    );
                })
            )
        ),
        showGlobalSearch && React.createElement(
            'span',
            { className: 're-toolbar-search' },
            React.createElement('i', { className: 'fa fa-search' }),
            React.createElement('input', { type: 'search', className: 're-toolbar-search-input', placeholder: 'Search', onChange: function onChange(e) {
                    return onSearch(e.target.value);
                } })
        ),
        customBtns && customBtns.map(function (_) {
            _.show = true;
            return React.createElement(RenderBtn, Object.assign({}, _, { key: uuid.v4() }));
        }),
        addNewBtn && React.createElement(RenderBtn, addNewBtn),
        uploadBtn && React.createElement(
            'span',
            null,
            React.createElement(
                'label',
                { htmlFor: 're-toolbar-file-input',
                    className: 're-toolbar-file-input ' + uploadBtn.className },
                React.createElement('i', { className: uploadBtn.icon, 'aria-hidden': 'true' }),
                ' ',
                uploadBtn.text
            ),
            uploadBtn.multiple ? React.createElement('input', { type: 'file',
                multiple: true,
                accept: uploadBtn.accept,
                onChange: uploadBtn.onClick,
                id: 're-toolbar-file-input',
                className: 're-toolbar-file-upload' }) : React.createElement('input', { type: 'file',
                accept: uploadBtn.accept,
                onChange: uploadBtn.onClick,
                id: 're-toolbar-file-input',
                className: 're-toolbar-file-upload' })
        ),
        React.createElement(
            CSVLink,
            { data: data },
            '  ',
            exportBtn && React.createElement(RenderBtn, exportBtn)
        )
    );
};

ToolbarBtns.propTypes = {
    showSelect: PropTypes.bool,
    columns: PropTypes.array,
    showGlobalSearch: PropTypes.bool,
    onSearch: PropTypes.func,
    data: PropTypes.array.isRequired,
    columnChooser: PropTypes.shape({
        show: PropTypes.bool,
        icon: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onColumnSelect: PropTypes.func
    }),
    uploadBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        multiple: PropTypes.bool,
        accept: PropTypes.string
    }),
    exportBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    }),
    addNewBtn: PropTypes.shape({
        show: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    }),
    customBtns: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func
    }))
};

export default ToolbarBtns;