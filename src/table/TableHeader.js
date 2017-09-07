import React from 'react';
import PropTypes from 'prop-types';
import SortFilterPanel from './SortFilterPanel';
import uuid from 'uuid';
const TableHeader = ({ id, dataType, name, canFilter, canSort, canExport, style, className, sortFilterPanelIconClassName, onSortFilterPanelClick, headerTextClassName, data }) => {
    let showSortFilterPanel = false;
    return (
        <th style={style} className={"re-th " + className} data-th-id={id}>
            <span className={"re-th-name " + headerTextClassName}> {name} </span>
            {(canFilter || canSort) && <span className="re-th-icon" onClick={onSortFilterPanelClick}> <i className={sortFilterPanelIconClassName} /> </span>}
            <SortFilterPanel id={id} dataType={dataType} showSortFilterPanel={showSortFilterPanel} data={data} />
        </th>
    )
};

TableHeader.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataType: PropTypes.string,
    name: PropTypes.string,
    canFilter: PropTypes.bool,
    canSort: PropTypes.bool,
    canGroup: PropTypes.bool,
    sortFilterPanelIconClassName: PropTypes.string,
    className: PropTypes.string,
    headerTextClassName: PropTypes.string,
    style: PropTypes.object,
    onSortFilterPanelClick: PropTypes.func
};

TableHeader.defaultProps = {
    sortFilterPanelIconClassName: 'fa fa-arrow-down',
    canFilter: true,
    canSort: true,
    canGroup: true,
    style: {},
    className: '',
    dataType: 'text',
    headerTextClassName: ''
};

export default TableHeader
