import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import FilteredBtns from './FilteredBtns';
import './index.css';
import { searchData, sortData, setOptions } from './Util.js';
import ToolbarBtns from './ToolbarBtns';
import Pagination from './Pagination';

export class Table extends Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
        this.onSort = this.onSort.bind(this);
        this.onFilterRemoveClick = this.onFilterRemoveClick.bind(this);
        this.onGlobalSearchChange = this.onGlobalSearchChange.bind(this);
        this.onColumnChooserClick = this.onColumnChooserClick.bind(this);
        this.onColumnSelect = this.onColumnSelect.bind(this);
        this.onRowCheckChange = this.onRowCheckChange.bind(this);
        this.onSelectAllRowsChange = this.onSelectAllRowsChange.bind(this);
        this.onPaginationClick = this.onPaginationClick.bind(this);
        this.onPageSizeChangeClick = this.onPageSizeChangeClick.bind(this);
        this.dataLastUpdated = new Date();
        this.state = setOptions(props);
    }

    onSort(id, type) {
        const { serverSideSort, onSort } = this.props.sort;
        if (serverSideSort) {
            onSort(id, type);
        } else {
            let col = this.props.columns.find(_ => _.id === id);
            if (col) {
                let sortedData = sortData(this.state.data,
                    this.dataLastUpdated, id, col.dataType, type, col.dateFormat || 'dd/mm/yyyy');
                this.setState({ data: sortedData, dataCache: sortedData });
            }
        }

        this.updateSortIcon(id, type);
    }

    onFilter(id, filteredData) {
        let filter = this.state.filter;
        let map = filter.filteredData;
        map.set(id, filteredData);
        filter.filteredData = map;
        this.setState({ filter: filter, filteredKeys: Array.from(map.keys()) });
        let filterResults = this.state.filter.onFilter(this.state.dataCache, this.state.filter.filteredData);
        this.setState({ data: filterResults });
    }

    onFilterRemoveClick(id) {
        let fmap = this.state.filter.filteredData;
        let fd = fmap.get(id);
        fd.forEach(_ => _.checked = false);
        let keys = this.state.filteredKeys.filter(_ => _ !== id);
        this.onFilter(id, fd);
        this.setState({ filteredKeys: keys });
    }

    onRowCheckChange(checked, row) {
        let data = this.state.data,
            drow = data.find(_ => _.id === row.id),
            selectAllChecked = false;
        drow.selected = checked;
        selectAllChecked = data.every(_ => _.selected);
        this.setState({ data: data, dataCache: data, selectAllChecked: selectAllChecked });
    }

    onSelectAllRowsChange(e) {
        let data = this.state.data;
        data.forEach(_ => _.selected = e.target.checked);
        this.setState({ data: data, dataCache: data, selectAllChecked: e.target.checked });
    }

    onGlobalSearchChange(searchText) {
        if (!searchText) {
            this.setState({ data: this.state.dataCache });
            return;
        }
        if (this.state.toolbar.onGlobalSearchChange) {
            this.state.toolbar.onGlobalSearchChange(searchText);
        } else {
            let searchedData = searchData(searchText, this.state.data, this.state.columns);
            this.setState({ data: searchedData });
        }
    }

    onColumnChooserClick() {
        this.setState({ showSelect: !this.state.showSelect });
    }

    onColumnSelect(col) {
        const columns = this.state.columns;
        const column = columns.find(_ => _.id === col.id);
        column.show = !column.show;
        this.setState({ columns: columns });
    }

    onPaginationClick(pageNo) {
        if (pageNo > 0 || pageNo < this.state.pagination.totalPages) {
            let page = pageNo;
            if (page < 1) {
                page = 1;
            }
            let total = Math.round(this.state.dataCache.length / this.state.pagination.limit);
            if (page > total) {
                page = total;
            }
            let data = this.state.pagination.onPagerClick(this.state.dataCache, page, this.state.pagination.limit);
            let pagination = this.state.pagination;
            pagination.currentPage = page;
            this.setState({ data: data, pagination: pagination });
        }
    }

    onPageSizeChangeClick(selectedPageSize) {
        let data = this.state.pagination.onPagerClick(this.state.dataCache, this.state.pagination.currentPage, selectedPageSize);
        let pagination = this.state.pagination;
        pagination.limit = selectedPageSize;
        this.setState({ data: data, pagination: pagination });
    }



    render() {
        const {
            sortFilterPanelIcon,
            isLoading,
            filter,
            sort,
            showRowSelectionCheckBox,
            rowActionBtnHeader
             } = this.props,

            { showSelect,
                tableRow,
                toolbar,
                columns,
                data,
                filteredKeys,
                pagination,
                sortMap,
                filteredData } = this.state;

        let colSpan = this.showRowActionBtns ? columns.length + 1 : columns.length;
        colSpan = showRowSelectionCheckBox ? colSpan + 1 : colSpan;
        toolbar.columnChooser.onClick = this.onColumnChooserClick;
        toolbar.columnChooser.onColumnSelect = this.onColumnSelect;

        return (
            <div>
                <div className="re-table-container">
                    <table className="re-table">
                        <thead className="re-thead">
                            <tr className="re-tbar">
                                <th colSpan={colSpan}>
                                    <FilteredBtns
                                        filteredKeys={filteredKeys}
                                        columns={columns}
                                        onFilterRemoveClick={this.onFilterRemoveClick} />
                                    <ToolbarBtns
                                        onSearch={this.onGlobalSearchChange}
                                        {...toolbar}
                                        columns={columns}
                                        showSelect={showSelect}
                                        data={data} />
                                </th>
                            </tr>
                            <tr className="re-thr">
                                {showRowSelectionCheckBox &&
                                    <th className="re-th " data-th-id="selectAll" >
                                        <input type="checkbox" checked={this.state.selectAllChecked} onChange={this.onSelectAllRowsChange} /> </th>}
                                {columns.map(_ =>
                                    (<TableHeader {..._} key={uuid.v4()}
                                        {..._}
                                        data={data}
                                        filterIcon={filter.icon}
                                        filterAppliedIcon={filter.appliedIcon}
                                        onFilter={this.onFilter}
                                        sortInfo={sortMap.get(_.id) ||
                                            { type: 'none', icon: sort.noSortIcon }}
                                        filteredData={filteredData && filteredData.get(_.id) ?
                                            filteredData.get(_.id) : []}
                                        onSort={this.onSort}
                                        sortFilterPanelIconClassName={sortFilterPanelIcon} />))}
                                {this.showRowActionBtns && <th> {rowActionBtnHeader}</th>}
                            </tr>

                        </thead>
                        <tbody className="re-tobdy">
                            {!isLoading ? data.map(_ =>
                                (<TableRow key={uuid.v4()}
                                    columns={columns}
                                    showRowSelectionCheckBox={showRowSelectionCheckBox}
                                    onRowCheckChange={this.onRowCheckChange}
                                    showRowActionBtns={this.showRowActionBtns}
                                    row={_}
                                    {...tableRow}
                                />)) :
                                <tr>
                                    <td colSpan={colSpan}
                                        className="re-table-loader"
                                        style={{ textAlign: 'center' }}>
                                        <i className="fa fa-spin fa-spinner fa-2x" />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination
                    totalPages={pagination.totalPages}
                    totalRecords={pagination.totalRows}
                    pageSize={pagination.size}
                    pageLimit={pagination.limit}
                    currentPage={pagination.currentPage}
                    onPageSizeChangeClick={this.onPageSizeChangeClick}
                    onPaginationClick={this.onPaginationClick}
                />
            </div>

        );
    }
    get showRowActionBtns() {
        const { editBtn, deleteBtn, viewBtn, customBtns } = this.props.tableRow;

        if (editBtn && editBtn.show) {
            return true;
        }
        if (deleteBtn && deleteBtn.show) {
            return true;
        }
        if (viewBtn && viewBtn.show) {
            return true;
        }
        if (customBtns) {
            return true;
        }
        return false;
    }

    updateSortIcon(id, type) {
        const { noSortIcon, ascIcon, descIcon } = this.props.sort;
        let icon = noSortIcon;
        if (type === 'asc') {
            icon = ascIcon;
        } else if (type === 'desc') {
            icon = descIcon;
        }
        let map = this.state.sortMap;
        map.set(id, { type, icon });
        this.setState({ sortMap: map });
    }
}

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        dataType: PropTypes.string.isRequired,
        name: PropTypes.string,
        show: PropTypes.bool,
        canFilter: PropTypes.bool,
        canSort: PropTypes.bool,
        canGroup: PropTypes.bool,
        canExport: PropTypes.bool,
        canEdit: PropTypes.bool,
        canDelete: PropTypes.bool,
        isUnBoundColumn: PropTypes.bool,
        isPrimaryKey: PropTypes.bool,
        isCheckBoxField: PropTypes.bool,
        isRequireFiled: PropTypes.bool,
        className: PropTypes.string,
        dateFormat: PropTypes.string,
        style: PropTypes.object
    })).isRequired,
    data: PropTypes.array.isRequired,
    sortFilterPanelIcon: PropTypes.string,
    rowActionBtnHeader: PropTypes.string,
    isLoading: PropTypes.bool,
    showRowSelectionCheckBox: PropTypes.bool,
    onSelectRowChange: PropTypes.func,
    onSelectAllRowsChange: PropTypes.func,
    sort: PropTypes.shape({
        ascIcon: PropTypes.string,
        descIcon: PropTypes.string,
        noSortIcon: PropTypes.string,
        serverSideSort: PropTypes.bool,
        onSort: PropTypes.func
    }),
    filter: PropTypes.shape({
        filteredData: PropTypes.any,//eslint-disable-line
        icon: PropTypes.string,
        appliedIcon: PropTypes.string,
        onFilter: PropTypes.func
    }),
    pagination: PropTypes.shape({
        limit: PropTypes.number,
        totalRows: PropTypes.number,
        currentPage: PropTypes.number,
        size: PropTypes.arrayOf(PropTypes.number),
        onPagerClick: PropTypes.func,
        onSizeChange: PropTypes.func
    }),
    tableRow: PropTypes.shape({
        className: PropTypes.string,
        style: PropTypes.object,
        editBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func,
            isLink: PropTypes.bool,
            link: PropTypes.string
        }),
        viewBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func,
            isLink: PropTypes.bool,
            link: PropTypes.string
        }),
        deleteBtn: PropTypes.shape({
            show: PropTypes.bool,
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func,
            isLink: PropTypes.bool,
            link: PropTypes.string
        }),
        customBtns: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            icon: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string,
            onClick: PropTypes.func,
            isLink: PropTypes.bool,
            link: PropTypes.string
        }))
    }),
    toolbar: PropTypes.shape({
        onGlobalSearchChange: PropTypes.func,
        showGlobalSearch: PropTypes.bool,
        columnChooser: PropTypes.shape({
            show: PropTypes.bool,
            icon: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string,
            className: PropTypes.string
        }),
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
            className: PropTypes.string
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
    showRowSelectionCheckBox: true,
    isLoading: false,
    customToolbarActionBtns: [],
    rowActionBtnHeader: 'Actions',
    sort: {
        ascIcon: 'fa fa-sort-amount-asc',
        descIcon: 'fa fa-sort-amount-desc',
        noSortIcon: 'fa fa-sort',
        serverSideSort: false
    },
    filter: {
        filterIcon: 'fa fa-filter',
        appliedIcon: 'fa fa-filter',
        serverSideFilter: false
    },
    pagination: {
        totalRows: 0,
        limit: 10,
        currentPage: 1,
        size: [10, 20, 30, 40, 50, 100, 500, 1000]

    },
    tableRow: {
        editBtn: {
            show: true,
            icon: 'fa fa-edit',
            title: 'Edit Record'
        },
        viewBtn: {
            show: true,
            icon: 'fa fa-eye',
            title: 'View Record'
        },
        deleteBtn: {
            show: true,
            icon: 'fa fa-trash',
            title: 'Delete Record'
        }
    },
    toolbar: {
        showGlobalSearch: true,
        columnChooser: {
            show: true,
            icon: 'fa fa-bars',
            title: 'Choose Columns'
        },
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
    }
};

export default Table;
