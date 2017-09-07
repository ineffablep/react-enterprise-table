import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const SortFilterPanel = ({
    dataType,
    id,
    data,
    width,
    onSort,
    onOk,
    onCancel,
    onSelectAllItems,
    onFilterSearch,
    onItemSelect
     }) => {
    let ascIcon = 'fa fa-sort-amount-asc',
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
        }
    }
    console.log(data);
    
    return (
        <div className="re-sfp" style={{ width: width }}>
            <div className="re-sort-panel">
                <button className="re-sort-btn-asc" onClick={() => onSort(id, 'asc')}>
                    <i className={ascIcon} />
                    <span className="re-sort-asc-text"> {ascText} </span>
                </button> <br />
                <button className="re-sort-btn-desc" onClick={() => onSort(id, 'desc')}>
                    <i className={descIcon} />
                    <span className="re-sort-desc-text"> {descText} </span>
                </button>
            </div>
            <div className="re-filter-panel">
                <input type="search" placeholder="Search" onChange={onFilterSearch} className="re-filter-search" />
                <div className="re-filter-select-panel">
                    <input type="checkbox"
                        onChange={onSelectAllItems}
                        className="re-filter-checkbox-selectAll" />
                    <label htmlFor="selectAll" className="re-filter-paenl-selectAll-text">
                        Select All
                    </label>)
                    {data.map(_ =>
                        <div key={uuid.v4()}>
                            <input type="checkbox"
                                name={'select_' + id + '_' + _.value}
                                id={'select_' + id + '_' + _.value}
                                className="re-filter-checkbox"
                                checked={_.checked} onChange={(e) => onItemSelect(e, _)} />
                            <label className="re-filter-paenl-select-text" htmlFor={'select_' + id + '_' + _.value}>
                                {_.value}
                            </label>
                        </div>
                    )}
                </div>
            </div>
            <div className="re-sfp-action-btns">
                <button className="re-sfp-btn-ok" onClick={onOk}> OK </button>
                <button className="re-sfp-btncancel" onClick={onCancel}> Cancel </button>
            </div>
        </div>
    );
};
SortFilterPanel.propTypes = {
    id: PropTypes.string.isRequired,
    dataType: PropTypes.string,
    width: PropTypes.string,
    data: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onFilterSearch:PropTypes.func.isRequired,
    onSelectAllItems: PropTypes.func.isRequired
};
SortFilterPanel.defaultProps = {
    dataType: 'text',
    data: []
};
export default SortFilterPanel;
