import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const onFilterPanelOkClick = () => {

};

const onFilterPanelSortAscClick = () => {

};

const onFilterPanelSortDescClick = () => {

};

const onFilterPanelSelectAllItems = () => {

};

const onFilterPanelCancelClick = () => {

};

const onFilterPanelItemSelect = () => {

};

const SortFilterPanel = ({ showSortFilterPanel, dataType, id, data }) => {
    let ascIcon = 'fa fa-sort-amount-asc',
        descIcon = 'fa fa-sort-amount-desc',
        ascText = 'Sort A to Z',
        descText = 'Sort Z to A',
        colData = data.map(_ => _[id]),
        uniqData = data ? [...new Set(colData)] : [],
        filterData = uniqData.map(_ => {
            return { checked: false, value: _ };
        });

    if (dataType) {
        if (dataType === 'text') {
            ascIcon = 'fa fa-sort-alpha-asc';
            descIcon = 'fa fa-sort-alpha-desc';
        } else if (dataType === 'number') {
            ascIcon = 'fa fa-sort-numeric-asc';
            descIcon = 'fa fa-sort-numeric-desc';
        }
    }
    return showSortFilterPanel ? (
        <div className="re-sfp">
            <div className="re-sort-panel">
                <button className="re-sort-btn-asc" onClick={onFilterPanelSortAscClick}>
                    <i className={ascIcon} />
                    <span className="re-sort-asc-text"> {ascText} </span>
                </button>
                <button className="re-sort-btn-desc" onClick={onFilterPanelSortDescClick}>
                    <i className={descIcon} />
                    <span className="re-sort-desc-text"> {descText} </span>
                </button>
            </div>
            <hr />
            <div className="re-filter-panel">
                <input type="search" placeholder="Search" className="re-filter-search" />
                <div className="re-filter-select-panel">
                    <label htmlFor="selectAll">
                        <input type="checkbox"
                            onChange={onFilterPanelSelectAllItems}
                            className="re-filter-checkbox-selectAll" />
                        <span className="re-filter-paenl-selectAll-text"> Select All</span>
                    </label>)
                    {filterData.map(_ =>
                        <div key={uuid.v4()}>
                            <label htmlFor={'select_' + id + '_' + _.value}>
                                <input type="checkbox"
                                    name={'select_' + id + '_' + _.value}
                                    id={'select_' + id + '_' + _.value}
                                    className="re-filter-checkbox"
                                    checked={_.checked} onChange={onFilterPanelItemSelect} />
                                <span className="re-filter-paenl-select-text"> {_.value} </span>
                            </label>
                        </div>
                    )}
                </div>
            </div>
            <div className="re-sfp-action-btns">
                <button className="re-sfp-btn-ok" onClick={onFilterPanelOkClick}> OK </button>
                <button className="re-sfp-btncancel" onClick={onFilterPanelCancelClick}> Cancel </button>
            </div>
        </div>
    ) : null;
};
SortFilterPanel.propTypes = {
    id: PropTypes.string.isRequired,
    showSortFilterPanel: PropTypes.bool,
    dataType: PropTypes.string,
    data: PropTypes.array.isRequired
};
SortFilterPanel.defaultProps = {
    showSortFilterPanel: false,
    dataType: 'text',
    data: []
};
export default SortFilterPanel;
