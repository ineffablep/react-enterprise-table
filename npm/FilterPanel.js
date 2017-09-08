import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

var FilterPanel = function FilterPanel(_ref) {
    var filterData = _ref.filterData,
        id = _ref.id,
        onItemSelect = _ref.onItemSelect;

    return filterData.map(function (_) {
        return React.createElement(
            'div',
            { key: uuid.v4() },
            React.createElement('input', { type: 'checkbox',
                name: 'select_' + id + '_' + _.value,
                id: 'select_' + id + '_' + _.value,
                className: 're-filter-checkbox',
                checked: _.checked, onChange: function onChange(e) {
                    return onItemSelect(e, _, id);
                } }),
            React.createElement(
                'label',
                { className: 're-filter-paenl-select-text', htmlFor: 'select_' + id + '_' + _.value },
                _.value
            )
        );
    });
};

FilterPanel.propTypes = {
    onItemSelect: PropTypes.func.isRequired,
    filterData: PropTypes.object.isRequired,
    id: PropTypes.object.isRequired
};

export default FilterPanel;