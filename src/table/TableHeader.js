import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortFilterPanel from './SortFilterPanel';
class TableHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSortFilterPanel: false,
            fpWidth: '200px',
            filterData: []
        };
        this.onSortFilterPanelClick = this.onSortFilterPanelClick.bind(this);
        this.onFilterCancel = this.onFilterCancel.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.onSelectAllItems = this.onSelectAllItems.bind(this);
        this.onFilterOk = this.onFilterOk.bind(this);
        this.onFilterSearch = this.onFilterSearch.bind(this);
        this.th = null;
    }

    componentDidMount() {
        if (this.th) {
            this.setState({ fpWidth: (this.th.offsetWidth - 18) + 'px' });
        }
        const colData = this.props.data.map(_ => _[this.props.id]),
            uniqData = this.props.data ? [...new Set(colData)] : [],
            fdata = uniqData.map(_ => {
                return { checked: false, value: _ };
            });
        this.setState({
            filterData: fdata,
            fbData: fdata
        });
    }

    onFilterSearch(e) {

        let fd = e.target.value ? this.state.filterData.filter(_ => _.value.toLowerCase().includes(e.target.value.toLowerCase())) : this.state.fbData;
        this.setState({ filterData: fd });
    }

    onSortFilterPanelClick(e) {
        e.preventDefault();
        this.setState({ showSortFilterPanel: !this.state.showSortFilterPanel });
    }

    onFilterOk() {
        const values = this.state.filterData.filter(_ => _.checked).map(_ => _.value);
        this.props.onFilter(this.props.id, values);
        this.setState({ showSortFilterPanel: false });
    }
    onFilterCancel() {
        this.setState({ showSortFilterPanel: false });
    }

    onSelectAllItems(e) {
        let fd = this.state.filterData;
        fd.forEach(_ => _.checked = e.target.checked);
        this.setState({ filterData: fd, fbData: fd });
    }

    onItemSelect(e, item) {
        let fd = this.state.filterData,
            fi = fd.find(_ => _.value === item.value);
        if (fi) {
            fi.checked = e.target.checked;
            this.setState({ filterData: fd, fbData: fd });
        }
    }

    render() {
        const { id, dataType, name, canFilter, canSort, style, className, sortFilterPanelIconClassName, headerTextClassName } = this.props;
        
        return (
            <th style={style} className={'re-th ' + className} data-th-id={id} ref={th => this.th = th}>
                <span className={'re-th-name ' + headerTextClassName}> {name} </span>
                {
                    (canFilter || canSort) && <a className="re-th-icon"
                        onKeyDown={this.onSortFilterPanelClick}
                        role="button"
                        tabIndex={0}
                        onClick={this.onSortFilterPanelClick}> <i className={sortFilterPanelIconClassName} /> </a>
                }
                {this.state.showSortFilterPanel && <SortFilterPanel
                    id={id}
                    width={this.state.fpWidth}
                    dataType={dataType}
                    data={this.state.filterData}
                    onSort={this.props.onSort}
                    onOk={this.onFilterOk}
                    onCancel={this.onFilterCancel}
                    onItemSelect={this.onItemSelect}
                    onFilterSearch={this.onFilterSearch}
                    onSelectAllItems={this.onSelectAllItems}
                />
                }
            </th >
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
    filterAppliedIcon: PropTypes.string,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired
};

TableHeader.defaultProps = {
    sortFilterPanelIconClassName: 'fa fa-sort-desc',
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
