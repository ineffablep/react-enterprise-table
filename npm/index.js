var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
import ToolbarBtns from './ToolbarBtns';
import moment from 'moment';

export var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.onFilter = _this.onFilter.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        _this.onFilterRemoveClick = _this.onFilterRemoveClick.bind(_this);
        _this.onGlobalSearchChange = _this.onGlobalSearchChange.bind(_this);
        var filteredData = _this.props.filteredData || new Map();
        _this.state = {
            data: _this.props.data,
            backData: _this.props.data,
            filteredData: filteredData,
            sortMap: new Map(),
            filteredKeys: Array.from(filteredData.keys())
        };
        return _this;
    }

    _createClass(Table, [{
        key: 'onSort',
        value: function onSort(id, type) {
            if (this.props.serverSideSort) {
                this.props.onSort(id, type);
            } else {
                var col = this.props.columns.find(function (_) {
                    return _.id === id;
                });
                if (col) {
                    var sortData = this.sortData(id, col.dataType, type, col.dateFormat || 'DD/MM/YYY');
                    this.setState({ data: sortData, backData: sortData });
                }
            }
            var icon = this.props.noSortIcon;
            if (type === 'asc') {
                icon = this.props.ascIcon;
            } else if (type === 'desc') {
                icon = this.props.descIcon;
            }
            var map = this.state.sortMap;
            map.set(id, { type: type, icon: icon });
            this.setState({ sortMap: map });
        }
    }, {
        key: 'onFilter',
        value: function onFilter(id, filteredData) {
            var map = this.state.filteredData;
            map.set(id, filteredData);
            this.setState({ filteredData: map, filteredKeys: Array.from(map.keys()) });
            if (this.props.serverSideFilter) {
                this.props.onFilter(this.state.filteredData);
            } else {
                var dataToFilter = this.state.backData;
                this.state.filteredData.forEach(function (value, id) {
                    var selectedValues = value.filter(function (_) {
                        return _.checked;
                    }).map(function (_) {
                        return _.value;
                    });
                    if (selectedValues && selectedValues.length > 0) {
                        dataToFilter = dataToFilter.filter(function (_) {
                            return selectedValues.includes(_[id]);
                        });
                    }
                });
                this.setState({ data: dataToFilter });
            }
        }
    }, {
        key: 'onFilterRemoveClick',
        value: function onFilterRemoveClick(id) {
            var fmap = this.state.filteredData;
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
        key: 'onGlobalSearchChange',
        value: function onGlobalSearchChange(searchText) {
            if (!searchText) {
                this.setState({ data: this.state.backData });
                return;
            }
            if (this.props.serverSideFilter) {
                this.toolbarBtns.onGlobalSearchChange(searchText);
            } else {
                var searchResults = this.state.data.filter(function (_) {
                    var res = false;
                    Object.values(_).forEach(function (item) {
                        if (item.toUpperCase().includes(searchText.toUpperCase())) {
                            res = true;
                        }
                    });
                    return res;
                });
                this.setState({ data: searchResults });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                columns = _props.columns,
                data = _props.data,
                sortFilterPanelIcon = _props.sortFilterPanelIcon,
                toolbarBtns = _props.toolbarBtns,
                onEdit = _props.onEdit,
                onDelete = _props.onDelete,
                filterIcon = _props.filterIcon,
                filterAppliedIcon = _props.filterAppliedIcon,
                showRowActionBtns = _props.showRowActionBtns,
                RowActionBtnHeader = _props.RowActionBtnHeader;

            var colSpan = showRowActionBtns ? columns.length + 1 : columns.length;

            var onGlobalSearchChange = toolbarBtns.onGlobalSearchChange,
                rest = _objectWithoutProperties(toolbarBtns, ['onGlobalSearchChange']);

            return React.createElement(
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
                                    filteredKeys: this.state.filteredKeys,
                                    columns: columns,
                                    onFilterRemoveClick: this.onFilterRemoveClick }),
                                React.createElement(ToolbarBtns, Object.assign({ onGlobalSearchChange: this.onGlobalSearchChange }, rest, {
                                    data: this.state.data }))
                            )
                        ),
                        React.createElement(
                            'tr',
                            { className: 're-thr' },
                            columns.map(function (_) {
                                return React.createElement(TableHeader, Object.assign({}, _, { key: uuid.v4(),
                                    data: data,
                                    filterIcon: filterIcon,
                                    filterAppliedIcon: filterAppliedIcon,
                                    onFilter: _this2.onFilter,
                                    sortInfo: _this2.state.sortMap.get(_.id) || { type: 'none', icon: _this2.props.noSortIcon },
                                    filteredData: _this2.state.filteredData && _this2.state.filteredData.get(_.id) ? _this2.state.filteredData.get(_.id) : [],
                                    onSort: _this2.onSort,
                                    sortFilterPanelIconClassName: sortFilterPanelIcon }));
                            }),
                            showRowActionBtns && React.createElement(
                                'th',
                                null,
                                ' ',
                                RowActionBtnHeader
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        { className: 're-tobdy' },
                        this.state.data.map(function (_) {
                            return React.createElement(TableRow, { key: uuid.v4(),
                                columns: columns,
                                row: _,
                                onEdit: onEdit,
                                onDelete: onDelete });
                        })
                    )
                )
            );
        }
    }, {
        key: 'sortData',
        value: function sortData(id, dataType, sortType, dateFormat) {
            if (dataType === 'number') {
                if (sortType === 'asc') {
                    return this.state.data.sort(function (a, b) {
                        return a[id] - b[id];
                    });
                } else if (sortType === 'desc') {
                    return this.state.data.sort(function (a, b) {
                        return b[id] - a[id];
                    });
                }
            } else if (dataType === 'date' || dataType === 'datetime') {
                if (sortType === 'desc') {
                    return this.state.data.sort(function (a, b) {
                        var momentA = moment(a[id], dateFormat);
                        var momentB = moment(b[id], dateFormat);
                        if (momentA > momentB) {
                            return 1;
                        } else if (momentA < momentB) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                } else if (sortType === 'asc') {
                    return this.state.data.sort(function (a, b) {
                        var momentA = moment(a[id], dateFormat);
                        var momentB = moment(b[id], dateFormat);
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
                    return this.state.data.sort(function (a, b) {
                        var nameA = a[id].toUpperCase();
                        var nameB = b[id].toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    });
                } else if (sortType === 'desc') {
                    return this.state.data.sort(function (a, b) {
                        var nameA = a[id].toUpperCase();
                        var nameB = b[id].toUpperCase();
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
    }]);

    return Table;
}(Component);
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