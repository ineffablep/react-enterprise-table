var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

export var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.onFilter = _this.onFilter.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        _this.onFilterRemoveClick = _this.onFilterRemoveClick.bind(_this);
        _this.onGlobalSearchChange = _this.onGlobalSearchChange.bind(_this);
        _this.onColumnChooserClick = _this.onColumnChooserClick.bind(_this);
        _this.onColumnSelect = _this.onColumnSelect.bind(_this);
        _this.onRowCheckChange = _this.onRowCheckChange.bind(_this);
        _this.onSelectAllRowsChange = _this.onSelectAllRowsChange.bind(_this);
        _this.onPaginationClick = _this.onPaginationClick.bind(_this);
        _this.onPageSizeChangeClick = _this.onPageSizeChangeClick.bind(_this);
        _this.dataLastUpdated = new Date();
        _this.state = setOptions(props);
        return _this;
    }

    _createClass(Table, [{
        key: 'onSort',
        value: function onSort(id, type) {
            var _props$sort = this.props.sort,
                serverSideSort = _props$sort.serverSideSort,
                onSort = _props$sort.onSort;

            if (serverSideSort) {
                onSort(id, type);
            } else {
                var col = this.props.columns.find(function (_) {
                    return _.id === id;
                });
                if (col) {
                    var sortedData = sortData(this.state.data, this.dataLastUpdated, id, col.dataType, type, col.dateFormat || 'dd/mm/yyyy');
                    this.setState({ data: sortedData, dataCache: sortedData });
                }
            }

            this.updateSortIcon(id, type);
        }
    }, {
        key: 'onFilter',
        value: function onFilter(id, filteredData) {
            var filter = this.state.filter;
            var map = filter.filteredData;
            map.set(id, filteredData);
            filter.filteredData = map;
            this.setState({ filter: filter, filteredKeys: Array.from(map.keys()) });
            var filterResults = this.state.filter.onFilter(this.state.dataCache, this.state.filter.filteredData);
            this.setState({ data: filterResults });
        }
    }, {
        key: 'onFilterRemoveClick',
        value: function onFilterRemoveClick(id) {
            var fmap = this.state.filter.filteredData;
            var fd = fmap.get(id);
            fd.forEach(function (_) {
                return _.checked = false;
            });
            var keys = this.state.filteredKeys.filter(function (_) {
                return _ !== id;
            });
            this.onFilter(id, fd);
            this.setState({ filteredKeys: keys });
        }
    }, {
        key: 'onRowCheckChange',
        value: function onRowCheckChange(checked, row) {
            var data = this.state.data,
                drow = data.find(function (_) {
                return _.id === row.id;
            }),
                selectAllChecked = false;
            drow.selected = checked;
            selectAllChecked = data.every(function (_) {
                return _.selected;
            });
            this.setState({ data: data, dataCache: data, selectAllChecked: selectAllChecked });
        }
    }, {
        key: 'onSelectAllRowsChange',
        value: function onSelectAllRowsChange(e) {
            var data = this.state.data;
            data.forEach(function (_) {
                return _.selected = e.target.checked;
            });
            this.setState({ data: data, dataCache: data, selectAllChecked: e.target.checked });
        }
    }, {
        key: 'onGlobalSearchChange',
        value: function onGlobalSearchChange(searchText) {
            if (!searchText) {
                this.setState({ data: this.state.dataCache });
                return;
            }
            if (this.state.toolbar.onGlobalSearchChange) {
                this.state.toolbar.onGlobalSearchChange(searchText);
            } else {
                var searchedData = searchData(searchText, this.state.data, this.state.columns);
                this.setState({ data: searchedData });
            }
        }
    }, {
        key: 'onColumnChooserClick',
        value: function onColumnChooserClick() {
            this.setState({ showSelect: !this.state.showSelect });
        }
    }, {
        key: 'onColumnSelect',
        value: function onColumnSelect(col) {
            var columns = this.state.columns;
            var column = columns.find(function (_) {
                return _.id === col.id;
            });
            column.show = !column.show;
            this.setState({ columns: columns });
        }
    }, {
        key: 'onPaginationClick',
        value: function onPaginationClick(pageNo) {
            if (pageNo > 0 || pageNo < this.state.pagination.totalPages) {
                var page = pageNo;
                if (page < 1) {
                    page = 1;
                }
                var total = Math.round(this.state.dataCache.length / this.state.pagination.limit);
                if (page > total) {
                    page = total;
                }
                var data = this.state.pagination.onPagerClick(this.state.dataCache, page, this.state.pagination.limit);
                var pagination = this.state.pagination;
                pagination.currentPage = page;
                this.setState({ data: data, pagination: pagination });
            }
        }
    }, {
        key: 'onPageSizeChangeClick',
        value: function onPageSizeChangeClick(selectedPageSize) {
            var data = this.state.pagination.onPagerClick(this.state.dataCache, this.state.pagination.currentPage, selectedPageSize);
            var pagination = this.state.pagination;
            pagination.limit = selectedPageSize;
            this.setState({ data: data, pagination: pagination });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                sortFilterPanelIcon = _props.sortFilterPanelIcon,
                isLoading = _props.isLoading,
                filter = _props.filter,
                sort = _props.sort,
                showRowSelectionCheckBox = _props.showRowSelectionCheckBox,
                rowActionBtnHeader = _props.rowActionBtnHeader,
                _state = this.state,
                showSelect = _state.showSelect,
                tableRow = _state.tableRow,
                toolbar = _state.toolbar,
                columns = _state.columns,
                data = _state.data,
                filteredKeys = _state.filteredKeys,
                pagination = _state.pagination,
                sortMap = _state.sortMap,
                filteredData = _state.filteredData;


            var colSpan = this.showRowActionBtns ? columns.length + 1 : columns.length;
            colSpan = showRowSelectionCheckBox ? colSpan + 1 : colSpan;
            toolbar.columnChooser.onClick = this.onColumnChooserClick;
            toolbar.columnChooser.onColumnSelect = this.onColumnSelect;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 're-table-container' },
                    React.createElement(
                        'table',
                        { className: 're-table' },
                        React.createElement(
                            'thead',
                            { className: 're-thead' },
                            React.createElement(
                                'tr',
                                { className: 're-tbar' },
                                React.createElement(
                                    'th',
                                    { colSpan: colSpan },
                                    React.createElement(FilteredBtns, {
                                        filteredKeys: filteredKeys,
                                        columns: columns,
                                        onFilterRemoveClick: this.onFilterRemoveClick }),
                                    React.createElement(ToolbarBtns, Object.assign({
                                        onSearch: this.onGlobalSearchChange
                                    }, toolbar, {
                                        columns: columns,
                                        showSelect: showSelect,
                                        data: data }))
                                )
                            ),
                            React.createElement(
                                'tr',
                                { className: 're-thr' },
                                showRowSelectionCheckBox && React.createElement(
                                    'th',
                                    { className: 're-th ', 'data-th-id': 'selectAll' },
                                    React.createElement('input', { type: 'checkbox', checked: this.state.selectAllChecked, onChange: this.onSelectAllRowsChange }),
                                    ' '
                                ),
                                columns.map(function (_) {
                                    return React.createElement(TableHeader, Object.assign({}, _, { key: uuid.v4()
                                    }, _, {
                                        data: data,
                                        filterIcon: filter.icon,
                                        filterAppliedIcon: filter.appliedIcon,
                                        onFilter: _this2.onFilter,
                                        sortInfo: sortMap.get(_.id) || { type: 'none', icon: sort.noSortIcon },
                                        filteredData: filteredData && filteredData.get(_.id) ? filteredData.get(_.id) : [],
                                        onSort: _this2.onSort,
                                        sortFilterPanelIconClassName: sortFilterPanelIcon }));
                                }),
                                this.showRowActionBtns && React.createElement(
                                    'th',
                                    null,
                                    ' ',
                                    rowActionBtnHeader
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            { className: 're-tobdy' },
                            !isLoading ? data.map(function (_) {
                                return React.createElement(TableRow, Object.assign({ key: uuid.v4(),
                                    columns: columns,
                                    showRowSelectionCheckBox: showRowSelectionCheckBox,
                                    onRowCheckChange: _this2.onRowCheckChange,
                                    showRowActionBtns: _this2.showRowActionBtns,
                                    row: _
                                }, tableRow));
                            }) : React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'td',
                                    { colSpan: colSpan,
                                        className: 're-table-loader',
                                        style: { textAlign: 'center' } },
                                    React.createElement('i', { className: 'fa fa-spin fa-spinner fa-2x' })
                                )
                            )
                        )
                    )
                ),
                React.createElement(Pagination, {
                    totalPages: pagination.totalPages,
                    totalRecords: pagination.totalRows,
                    pageSize: pagination.size,
                    pageLimit: pagination.limit,
                    currentPage: pagination.currentPage,
                    onPageSizeChangeClick: this.onPageSizeChangeClick,
                    onPaginationClick: this.onPaginationClick
                })
            );
        }
    }, {
        key: 'updateSortIcon',
        value: function updateSortIcon(id, type) {
            var _props$sort2 = this.props.sort,
                noSortIcon = _props$sort2.noSortIcon,
                ascIcon = _props$sort2.ascIcon,
                descIcon = _props$sort2.descIcon;

            var icon = noSortIcon;
            if (type === 'asc') {
                icon = ascIcon;
            } else if (type === 'desc') {
                icon = descIcon;
            }
            var map = this.state.sortMap;
            map.set(id, { type: type, icon: icon });
            this.setState({ sortMap: map });
        }
    }, {
        key: 'showRowActionBtns',
        get: function get() {
            var _props$tableRow = this.props.tableRow,
                editBtn = _props$tableRow.editBtn,
                deleteBtn = _props$tableRow.deleteBtn,
                viewBtn = _props$tableRow.viewBtn,
                customBtns = _props$tableRow.customBtns;


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
    }]);

    return Table;
}(Component);

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
        filteredData: PropTypes.any, //eslint-disable-line
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