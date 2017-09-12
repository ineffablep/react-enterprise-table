import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

var SortFilterPanel = function SortFilterPanel(_ref) {
    var dataType = _ref.dataType,
        id = _ref.id,
        data = _ref.data,
        width = _ref.width,
        onSort = _ref.onSort,
        onOk = _ref.onOk,
        onCancel = _ref.onCancel,
        onSelectAllItems = _ref.onSelectAllItems,
        selectAllChecked = _ref.selectAllChecked,
        onFilterSearch = _ref.onFilterSearch,
        onItemSelect = _ref.onItemSelect;

    var ascIcon = 'fa fa-sort-amount-asc',
        descIcon = 'fa fa-sort-amount-desc',
        ascText = 'Sort A to Z',
        descText = 'Sort Z to A';

    if (dataType) {
        if (dataType === 'text') {
            ascIcon = 'fa fa-sort-alpha-asc';
            descIcon = 'fa fa-sort-alpha-desc';
        } else if (dataType === 'number') {
            ascIcon = 'fa fa-sort-numeric-asc';
            descIcon = 'fa fa-sort-numeric-desc';
            ascText = 'Sort Smallest to Largest';
            descText = 'Sort Largest to Smallest';
        } else if (dataType === 'date' || dataType === 'datetime') {
            ascText = 'Sort Newest to Oldest';
            descText = 'Sort Oldest to Newest';
        }
    }

    return React.createElement(
        'div',
        { className: 're-sfp', style: { width: width + 'px' } },
        React.createElement(
            'div',
            { className: 're-sort-panel' },
            React.createElement(
                'button',
                { className: 're-sort-btn-asc', onClick: function onClick() {
                        return onSort(id, 'asc');
                    } },
                React.createElement('i', { className: ascIcon }),
                React.createElement(
                    'span',
                    { className: 're-sort-asc-text' },
                    ' ',
                    ascText,
                    ' '
                )
            ),
            ' ',
            React.createElement('br', null),
            React.createElement(
                'button',
                { className: 're-sort-btn-desc', onClick: function onClick() {
                        return onSort(id, 'desc');
                    } },
                React.createElement('i', { className: descIcon }),
                React.createElement(
                    'span',
                    { className: 're-sort-desc-text' },
                    ' ',
                    descText,
                    ' '
                )
            )
        ),
        React.createElement(
            'div',
            { className: 're-filter-panel' },
            (dataType !== 'checkbox' || dataType !== 'color' || dataType !== 'file' || dataType !== 'radio' || dataType !== 'range' || dataType !== 'reset' || dataType !== 'submit' || dataType !== 'hidden' || dataType !== 'image') && React.createElement(
                'div',
                { className: 'search' },
                React.createElement('span', { className: 'fa fa-search' }),
                React.createElement('input', { type: 'search',
                    placeholder: 'Search',
                    onChange: onFilterSearch,
                    className: 're-filter-search' })
            ),
            React.createElement(
                'div',
                { className: 're-filter-select-panel' },
                React.createElement('input', { type: 'checkbox',
                    onChange: onSelectAllItems,
                    name: 're-sp-selectAll',
                    id: 're-sp-selectAll',
                    checked: selectAllChecked,
                    className: 're-filter-checkbox-selectAll' }),
                React.createElement(
                    'label',
                    { htmlFor: 're-sp-selectAll',
                        className: 're-filter-paenl-selectAll-text' },
                    'Select All'
                ),
                ')',
                data.map(function (_) {
                    return React.createElement(
                        'div',
                        { key: uuid.v4() },
                        React.createElement('input', { type: 'checkbox',
                            name: 'select_' + id + '_' + _.value,
                            id: 'select_' + id + '_' + _.value,
                            className: 're-filter-checkbox',
                            checked: _.checked, onChange: function onChange(e) {
                                return onItemSelect(e, _);
                            } }),
                        React.createElement(
                            'label',
                            { className: 're-filter-paenl-select-text',
                                htmlFor: 'select_' + id + '_' + _.value },
                            _.value
                        )
                    );
                })
            )
        ),
        React.createElement(
            'div',
            { className: 're-sfp-action-btns' },
            React.createElement(
                'button',
                { className: 're-sfp-btn-ok', onClick: onOk },
                ' OK '
            ),
            React.createElement(
                'button',
                { className: 're-sfp-btncancel', onClick: onCancel },
                ' Cancel '
            )
        )
    );
};
SortFilterPanel.propTypes = {
    id: PropTypes.string.isRequired,
    dataType: PropTypes.string,
    width: PropTypes.number,
    data: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onFilterSearch: PropTypes.func.isRequired,
    selectAllChecked: PropTypes.bool,
    onSelectAllItems: PropTypes.func.isRequired
};
SortFilterPanel.defaultProps = {
    dataType: 'text',
    data: []
};
export default SortFilterPanel;