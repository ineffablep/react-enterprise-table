import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

var FilteredBtns = function FilteredBtns(_ref) {
    var filteredKeys = _ref.filteredKeys,
        columns = _ref.columns,
        onFilterRemoveClick = _ref.onFilterRemoveClick;

    return React.createElement(
        'div',
        { className: 're-filtered-btns' },
        filteredKeys.map(function (id) {
            var val = columns.find(function (_) {
                return _.id === id;
            }).name;
            return React.createElement(
                'button',
                { key: uuid.v4(), onClick: function onClick() {
                        return onFilterRemoveClick(id);
                    }, className: 're-tbar-btn' },
                val,
                ' ',
                React.createElement('i', { className: 'fa fa-remove' }),
                '  '
            );
        })
    );
};

FilteredBtns.propTypes = {
    filteredKeys: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    onFilterRemoveClick: PropTypes.func.isRequired
};

export default FilteredBtns;