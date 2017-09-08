import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { CSVLink } from 'react-csv';

var renderBtn = function renderBtn(_ref) {
    var show = _ref.show,
        title = _ref.title,
        icon = _ref.icon,
        text = _ref.text,
        className = _ref.className,
        onClick = _ref.onClick;

    return show && React.createElement(
        'button',
        { key: uuid.v4(), className: 're-tbar-btn ' + className, onClick: onClick,
            title: title },
        ' ',
        React.createElement('i', { className: icon, 'aria-hidden': 'true' }),
        ' ',
        text,
        ' '
    );
};

var ToolbarBtns = function ToolbarBtns(_ref2) {
    var addNewBtn = _ref2.addNewBtn,
        uploadBtn = _ref2.uploadBtn,
        exportBtn = _ref2.exportBtn,
        customBtns = _ref2.customBtns,
        onGlobalSearchChange = _ref2.onGlobalSearchChange,
        showGlobalSearch = _ref2.showGlobalSearch,
        data = _ref2.data;

    return React.createElement(
        'div',
        { className: 're-action-btns' },
        showGlobalSearch && React.createElement(
            'span',
            { className: 're-toolbar-search' },
            React.createElement('i', { className: 'fa fa-search' }),
            React.createElement('input', { type: 'search', className: 're-toolbar-search-input', placeholder: 'Search', onChange: function onChange(e) {
                    return onGlobalSearchChange(e.target.value);
                } })
        ),
        addNewBtn && renderBtn(addNewBtn),
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
            exportBtn && renderBtn(exportBtn)
        ),
        customBtns && customBtns.map(function (_) {
            _.show = true;
            return renderBtn(_);
        })
    );
};

ToolbarBtns.propTypes = {
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
    })),
    showGlobalSearch: PropTypes.bool,
    onGlobalSearchChange: PropTypes.func,
    data: PropTypes.array.isRequired
};

export default ToolbarBtns;