import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortFilterPanel from './SortFilterPanel';
class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSortFilterPanel: false
        };
        this.onSortFilterPanelClick = this.onSortFilterPanelClick.bind(this);
    }

    onSortFilterPanelClick(e) {
        e.preventDefault();
        this.setState({ showSortFilterPanel: !this.state.showSortFilterPanel });
    }

    render() {
        const { id, dataType, name, canFilter, canSort, style, className, sortFilterPanelIconClassName, headerTextClassName, data } = this.props;
        return (
            <th style={style} className={'re-th ' + className} data-th-id={id}>
                <span className={'re-th-name ' + headerTextClassName}> {name} </span>
                {(canFilter || canSort) && <a className="re-th-icon"
                    onKeyDown={this.onSortFilterPanelClick}
                    role="button"
                    tabIndex={0}
                    onClick={this.onSortFilterPanelClick}> <i className={sortFilterPanelIconClassName} /> </a>}
                <SortFilterPanel id={id} dataType={dataType} showSortFilterPanel={this.state.showSortFilterPanel} data={data} />
            </th>
        );
    }
}

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
    sortFilterPanelIcon: PropTypes.string,
    ascIcon: PropTypes.string,
    descIcon: PropTypes.string,
    noSortIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    filterAppliedIcon: PropTypes.string
};

TableHeader.defaultProps = {
    sortFilterPanelIconClassName: 'fa fa-arrow-down',
    canFilter: true,
    canSort: true,
    canGroup: true,
    style: {},
    className: '',
    dataType: 'text',
    headerTextClassName: '',
    showSortFilterPanel: false,
    ascIcon: 'fa fa-sort-amount-asc',
    descIcon: 'fa fa-sort-amount-desc',
    noSortIcon: 'fa fa-sort'
};

export default TableHeader;
