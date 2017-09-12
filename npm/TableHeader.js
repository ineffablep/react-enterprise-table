var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortFilterPanel from './SortFilterPanel';
import dateformat from 'dateformat';

var TableHeader = function (_Component) {
    _inherits(TableHeader, _Component);

    function TableHeader(props) {
        _classCallCheck(this, TableHeader);

        var _this = _possibleConstructorReturn(this, (TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).call(this, props));

        _this.state = {
            showSortFilterPanel: false,
            filterData: _this.props.filteredData,
            selectAllChecked: true
        };
        _this.onSortFilterPanelClick = _this.onSortFilterPanelClick.bind(_this);
        _this.onFilterCancel = _this.onFilterCancel.bind(_this);
        _this.onItemSelect = _this.onItemSelect.bind(_this);
        _this.onSelectAllItems = _this.onSelectAllItems.bind(_this);
        _this.onFilterOk = _this.onFilterOk.bind(_this);
        _this.onFilterSearch = _this.onFilterSearch.bind(_this);
        _this.onSort = _this.onSort.bind(_this);
        _this.onHeaderSort = _this.onHeaderSort.bind(_this);
        _this.th = { offsetWidth: 400 };
        return _this;
    }

    _createClass(TableHeader, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var colData = this.props.data.map(function (_) {
                return _[_this2.props.id];
            }),
                uniqData = this.props.data ? [].concat(_toConsumableArray(new Set(colData))) : [];
            var fdata = this.props.filteredData && this.props.filteredData.length > 0 ? this.props.filteredData : uniqData.map(function (_) {
                return { checked: true, value: _, dataType: _this2.props.dataType, format: _this2.props.dateFormat };
            });
            if (this.props.dataType === 'date' || this.props.dataType === 'datetime') {
                fdata.forEach(function (_) {
                    return _.value = dateformat(_.value, _this2.props.dateFormat);
                });
            }
            this.setState({
                filterData: fdata,
                fbData: fdata,
                selectAllChecked: fdata.every(function (_) {
                    return _.checked;
                })
            });
        }
    }, {
        key: 'onFilterSearch',
        value: function onFilterSearch(e) {
            var value = e.target.value;
            if (value) {
                var fd = this.state.filterData.filter(function (_) {
                    return (_.value + '').toLowerCase().includes(value.toLowerCase());
                });
                this.setState({ filterData: fd });
            } else {
                this.setState({ filterData: this.state.fbData });
            }
        }
    }, {
        key: 'onSortFilterPanelClick',
        value: function onSortFilterPanelClick(e) {
            e.preventDefault();
            this.setState({ showSortFilterPanel: !this.state.showSortFilterPanel });
        }
    }, {
        key: 'onFilterOk',
        value: function onFilterOk() {
            this.props.onFilter(this.props.id, this.state.filterData);
        }
    }, {
        key: 'onFilterCancel',
        value: function onFilterCancel() {
            this.setState({ showSortFilterPanel: false });
        }
    }, {
        key: 'onSelectAllItems',
        value: function onSelectAllItems(e) {
            var fd = this.state.filterData;
            fd.forEach(function (_) {
                return _.checked = e.target.checked;
            });
            this.setState({ filterData: fd, fbData: fd, selectAllChecked: e.target.checked });
        }
    }, {
        key: 'onItemSelect',
        value: function onItemSelect(e, item) {
            var fd = this.state.filterData,
                fi = fd.find(function (_) {
                return _.value === item.value;
            });
            if (fi) {
                fi.checked = e.target.checked;
                this.setState({ filterData: fd, fbData: fd });
            }
        }
    }, {
        key: 'onSort',
        value: function onSort(id, type) {
            this.props.onSort(id, type);
        }
    }, {
        key: 'onHeaderSort',
        value: function onHeaderSort() {
            var type = 'none';
            if (this.props.sortInfo.type === 'none') {
                type = 'asc';
            } else if (this.props.sortInfo.type === 'asc') {
                type = 'desc';
            } else if (this.props.sortInfo.type === 'desc') {
                type = 'none';
            }
            this.onSort(this.props.id, type);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                id = _props.id,
                show = _props.show,
                dataType = _props.dataType,
                name = _props.name,
                canFilter = _props.canFilter,
                canSort = _props.canSort,
                style = _props.style,
                className = _props.className,
                sortInfo = _props.sortInfo,
                sortFilterPanelIconClassName = _props.sortFilterPanelIconClassName,
                headerTextClassName = _props.headerTextClassName;

            return show ? React.createElement(
                'th',
                { style: style, className: 're-th ' + className, 'data-th-id': id, ref: function ref(th) {
                        return _this3.th = th;
                    } },
                React.createElement(
                    'span',
                    { className: 're-sort-ionc' },
                    ' ',
                    React.createElement('i', { className: sortInfo.icon }),
                    ' '
                ),
                React.createElement(
                    'button',
                    { className: 're-th-name ' + headerTextClassName,
                        onClick: this.onHeaderSort },
                    ' ',
                    name,
                    ' '
                ),
                (canFilter || canSort) && React.createElement(
                    'button',
                    { className: 're-th-name re-th-icon',
                        tabIndex: 0,
                        onClick: this.onSortFilterPanelClick },
                    React.createElement('i', { className: sortFilterPanelIconClassName }),
                    ' '
                ),
                this.state.showSortFilterPanel && React.createElement(SortFilterPanel, {
                    id: id,
                    width: this.th.offsetWidth - 18,
                    dataType: dataType,
                    data: this.state.filterData,
                    onSort: this.onSort,
                    onOk: this.onFilterOk,
                    onCancel: this.onFilterCancel,
                    onItemSelect: this.onItemSelect,
                    onFilterSearch: this.onFilterSearch,
                    selectAllChecked: this.state.selectAllChecked,
                    onSelectAllItems: this.onSelectAllItems
                })
            ) : null;
        }
    }]);

    return TableHeader;
}(Component);

TableHeader.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    show: PropTypes.bool,
    filteredData: PropTypes.array.isRequired,
    dataType: PropTypes.string,
    name: PropTypes.string,
    canFilter: PropTypes.bool,
    dateFormat: PropTypes.string,
    canSort: PropTypes.bool,
    canGroup: PropTypes.bool,
    sortFilterPanelIconClassName: PropTypes.string,
    className: PropTypes.string,
    headerTextClassName: PropTypes.string,
    style: PropTypes.object,
    sortFilterPanelIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    filterAppliedIcon: PropTypes.string,
    onSort: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
    sortInfo: PropTypes.object
};

TableHeader.defaultProps = {
    sortFilterPanelIconClassName: 'fa fa-sort-desc',
    canFilter: true,
    canSort: true,
    canGroup: true,
    style: {},
    className: '',
    show: true,
    dataType: 'text',
    dateFormat: 'dd/mm/yyyy',
    headerTextClassName: '',
    showSortFilterPanel: false
};

export default TableHeader;