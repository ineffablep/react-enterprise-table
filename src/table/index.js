import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import FilteredBtns from './FilteredBtns';
import './index.css';
import ToolbarBtns from './ToolbarBtns';
import moment from 'moment';

export class Table extends Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilterRemoveClick = this.onFilterRemoveClick.bind(this);
        this.onGlobalSearchChange = this.onGlobalSearchChange.bind(this);
        let filteredData = this.props.filteredData || new Map();
        this.state = {
            data: this.props.data,
            backData: this.props.data,
            filteredData: filteredData,
            sortMap: new Map(),
            filteredKeys: Array.from(filteredData.keys())
        };
    }

    onSort(id, type) {
        if (this.props.serverSideSort) {
            this.props.onSort(id, type);
        } else {
            let col = this.props.columns.find(_ => _.id === id);
            if (col) {
                let sortData = this.sortData(id, col.dataType, type, col.dateFormat || 'DD/MM/YYY');
                this.setState({ data: sortData, backData: sortData });
            }
        }
        let icon = this.props.noSortIcon;
        if (type === 'asc') {
            icon = this.props.ascIcon;
        } else if (type === 'desc') {
            icon = this.props.descIcon;
        }
        let map = this.state.sortMap;
        map.set(id, { type, icon });
        this.setState({ sortMap: map });
    }

    onFilter(id, filteredData) {
        let map = this.state.filteredData;
        map.set(id, filteredData);
        this.setState({ filteredData: map, filteredKeys: Array.from(map.keys()) });
        if (this.props.serverSideFilter) {
            this.props.onFilter(this.state.filteredData);
        } else {
            let dataToFilter = this.state.backData;
            this.state.filteredData.forEach((value, id) => {
                let selectedValues = value.filter(_ => _.checked).map(_ => _.value);
                if (selectedValues && selectedValues.length > 0) {
                    dataToFilter = dataToFilter.filter(_ => selectedValues.includes(_[id]));
                }
            });
            this.setState({ data: dataToFilter });
        }
    }

    onFilterRemoveClick(id) {
        let fmap = this.state.filteredData;
        let fd = fmap.get(id);
        fd.forEach(_ => _.checked = false);
        let keys = this.state.filteredKeys.filter(_ => _ !== id);
        this.onFilter(id, fd);
        this.setState({ filteredKeys: keys });
    }

    onGlobalSearchChange(searchText) {
        if (!searchText) {
            this.setState({ data: this.state.backData });
            return;
        }
        if (this.props.serverSideFilter) {
            this.toolbarBtns.onGlobalSearchChange(searchText);
        } else {
            let searchResults = this.state.data.filter(_ => {
                let res = false;
                Object.values(_).forEach(item => {
                    if (item.toUpperCase().includes(searchText.toUpperCase())) {
                        res = true;
                    }
                });
                return res;
            });
            this.setState({ data: searchResults });
        }

    }

    render() {
        const { columns, data, sortFilterPanelIcon, toolbarBtns, onEdit, onDelete,
            filterIcon, filterAppliedIcon, showRowActionBtns, RowActionBtnHeader } = this.props;
        const colSpan = showRowActionBtns ? columns.length + 1 : columns.length;
        const { onGlobalSearchChange, ...rest } = toolbarBtns;
        return (
            <div className="re-table-container">
                <table className="re-table">
                    <thead className="re-thead">
                        <tr className="re-tbar">
                            <th colSpan={colSpan}>
                                <FilteredBtns
                                    filteredKeys={this.state.filteredKeys}
                                    columns={columns}
                                    onFilterRemoveClick={this.onFilterRemoveClick} />
                                <ToolbarBtns onGlobalSearchChange={this.onGlobalSearchChange} {...rest}
                                    data={this.state.data} />
                            </th>
                        </tr>
                        <tr className="re-thr">
                            {columns.map(_ => <TableHeader {..._} key={uuid.v4()}
                                data={data}
                                filterIcon={filterIcon}
                                filterAppliedIcon={filterAppliedIcon}
                                onFilter={this.onFilter}
                                sortInfo={this.state.sortMap.get(_.id) || { type: 'none', icon: this.props.noSortIcon }}
                                filteredData={this.state.filteredData && this.state.filteredData.get(_.id) ? this.state.filteredData.get(_.id) : []}
                                onSort={this.onSort}
                                sortFilterPanelIconClassName={sortFilterPanelIcon} />)}
                            {showRowActionBtns && <th> {RowActionBtnHeader}</th>}
                        </tr>

                    </thead>
                    <tbody className="re-tobdy">
                        {this.state.data.map(_ => <TableRow key={uuid.v4()}
                            columns={columns}
                            row={_}
                            onEdit={onEdit}
                            onDelete={onDelete} />)}
                    </tbody>
                </table>
            </div>
        );
    }

    sortData(id, dataType, sortType, dateFormat) {
        if (dataType === 'number') {
            if (sortType === 'asc') {
                return this.state.data.sort((a, b) => a[id] - b[id]);
            } else if (sortType === 'desc') {
                return this.state.data.sort((a, b) => b[id] - a[id]);
            }
        } else if (dataType === 'date' || dataType === 'datetime') {
            if (sortType === 'desc') {
                return this.state.data.sort((a, b) => {
                    let momentA = moment(a[id], dateFormat);
                    let momentB = moment(b[id], dateFormat);
                    if (momentA > momentB) {
                        return 1;
                    } else if (momentA < momentB) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            } else if (sortType === 'asc') {
                return this.state.data.sort((a, b) => {
                    let momentA = moment(a[id], dateFormat);
                    let momentB = moment(b[id], dateFormat);
                    if (momentA < momentB) {
                        return 1;
                    } else if (momentA > momentB) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
        } else {
            if (sortType === 'asc') {
                return this.state.data.sort((a, b) => {
                    const nameA = a[id].toUpperCase();
                    const nameB = b[id].toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

            } else if (sortType === 'desc') {
                return this.state.data.sort((a, b) => {
                    const nameA = a[id].toUpperCase();
                    const nameB = b[id].toUpperCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
        return this.props.data;

    }
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataType: PropTypes.string.isRequired,
        name: PropTypes.string,
        canFilter: PropTypes.bool,
        canSort: PropTypes.bool,
        canGroup: PropTypes.bool,
        canExport: PropTypes.bool,
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool,
        isUnBoundColumn: PropTypes.bool,
        isPrimaryKey: PropTypes.bool,
        isRequireFiled: PropTypes.bool,
        className: PropTypes.string,
        dateFormat: PropTypes.string,
        style: PropTypes.object
    })).isRequired,
    data: PropTypes.array.isRequired,
    filteredData: PropTypes.any,
    sortFilterPanelIcon: PropTypes.string,
    ascIcon: PropTypes.string,
    descIcon: PropTypes.string,
    noSortIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    RowActionBtnHeader: PropTypes.string,
    filterAppliedIcon: PropTypes.string,
    serverSideFilter: PropTypes.bool,
    serverSideSort: PropTypes.bool,
    showRowActionBtns: PropTypes.bool,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,

    toolbarBtns: PropTypes.shape({
        onGlobalSearchChange: PropTypes.func,
        showGlobalSearch: PropTypes.bool,
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
        }))
    })
};

Table.defaultProps = {
    data: [],
    serverSideFilter: false,
    serverSideSort: false,
    customToolbarActionBtns: [],
    showRowActionBtns: true,
    RowActionBtnHeader: 'Actions',
    toolbarBtns: {
        showGlobalSearch: true,
        uploadBtn: {
            show: true,
            icon: 'fa fa-upload',
            title: 'Upload Data',
            multiple: true,
            accept: '*'
        },
        exportBtn: {
            show: true,
            icon: 'fa fa-file-excel-o re-green',
            title: 'Export to CSV'
        },
        addNewBtn: {
            show: true,
            icon: 'fa fa-plus-circle',
            title: 'Add New'
        }
    },
    ascIcon: 'fa fa-sort-amount-asc',
    descIcon: 'fa fa-sort-amount-desc',
    noSortIcon: 'fa fa-sort'
};

export default Table;
