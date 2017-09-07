import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const FilterPanel = ({ filterData, id, onItemSelect }) => {
    return (
        filterData.map(_ =>
            <div key={uuid.v4()}>
                <input type="checkbox"
                    name={'select_' + id + '_' + _.value}
                    id={'select_' + id + '_' + _.value}
                    className="re-filter-checkbox"
                    checked={_.checked} onChange={(e) => onItemSelect(e, _, id)} />
                <label className="re-filter-paenl-select-text" htmlFor={'select_' + id + '_' + _.value}>
                    {_.value}
                </label>
            </div>
        )

    );
};

FilterPanel.propTypes = {
    onItemSelect: PropTypes.func.isRequired,
    filterData: PropTypes.object.isRequired,
    id: PropTypes.object.isRequired
};


export default FilterPanel;
