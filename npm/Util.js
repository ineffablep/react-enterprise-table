import dateformat from 'dateformat';
import uuid from 'uuid';

export var searchData = function searchData(searchText, data, columns) {
    var searchResults = data.filter(function (_) {
        var res = false;
        columns.forEach(function (col) {
            var item = _[col.id];
            if (col.dataType === 'date' || col.dataType === 'datetime') {
                item = dateformat(item, col.format);
            }

            if (item && typeof item === 'number') {
                item = item + '';
            }

            if (item && typeof item === 'string' && item.toUpperCase().includes(searchText.toUpperCase())) {
                res = true;
            }
        });
        return res;
    });

    return searchResults;
};

export var sortData = function sortData(data, dataLastUpdated, id) {
    var dataType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
    var sortType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'asc';
    var dateFormat = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'dd/mm/yyyy';

    if (dataType === 'number') {
        if (sortType === 'asc') {
            return data.sort(function (a, b) {
                return a[id] - b[id];
            });
        } else if (sortType === 'desc') {
            return data.sort(function (a, b) {
                return b[id] - a[id];
            });
        }
    } else if (dataType === 'date' || dataType === 'datetime') {

        if (sortType === 'desc') {
            return data.sort(function (a, b) {
                var dateA = dateformat(a[id], dateFormat);
                var dateB = dateformat(b[id], dateFormat);
                return dateA > dateB;
            });
        } else if (sortType === 'asc') {
            return data.sort(function (a, b) {
                var dateA = dateformat(a[id], dateFormat);
                var dateB = dateformat(b[id], dateFormat);
                return dateA < dateB;
            });
        }
    } else {
        if (sortType === 'asc') {
            return data.sort(function (a, b) {
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
            return data.sort(function (a, b) {
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
    return data;
};

export var filterData = function filterData(dataToFilter, filteredData) {
    if (!dataToFilter || !filterData) {
        return [];
    }

    filteredData.forEach(function (value, id) {
        var filtered = value.filter(function (_) {
            return _.checked;
        }),
            selectedValues = filtered.map(function (_) {
            return _.value;
        });
        if (selectedValues && selectedValues.length > 0) {
            var dataType = filtered[0].dataType;
            if (dataType) {
                if (dataType === 'date' || dataType === 'dateTime') {
                    var format = filtered[0].format;
                    if (format) {
                        return dataToFilter = dataToFilter.filter(function (_) {
                            var formatted = dateformat(_[id], format);
                            return selectedValues.includes(formatted);
                        });
                    }
                }
            }
            dataToFilter = dataToFilter.filter(function (_) {
                return selectedValues.includes(_[id]);
            });
        }
    });
    return dataToFilter;
};

var setFilterr = function setFilterr(filter, state) {

    if (!state.filter) {
        state.filter = {};
    }

    state.filter.filteredData = filter.filteredData ? filter.filteredData : new Map();
    state.filter.filterIcon = filter.filterIcon ? filter.filterIcon : 'fa fa-filter';
    state.filter.appliedIcon = filter.appliedIcon ? filter.appliedIcon : 'fa fa-filter';
    state.filter.onFilter = filter.onFilter ? filter.onFilter : filterData;
};

var setPagination = function setPagination(pagination, data, state) {
    if (!pagination) {
        pagination = {};
    }

    state.pagination.limit = pagination.limit ? pagination.limit : 10;
    state.pagination.totalRows = pagination.totalRows ? pagination.totalRows : data.length;
    state.pagination.currentPage = pagination.currentPage ? pagination.currentPage : 1;
    state.pagination.totalPages = Math.round(state.pagination.totalRows / state.pagination.limit);
    state.pagination.size = pagination.size ? pagination.size : [10, 20, 30, 40, 50, 100, 500, 1000];
    state.pagination.onPagerClick = pagination.onPagerClick ? pagination.onPagerClick : pageData;
    state.pagination.onSizeChange = pagination.onSizeChange ? pagination.onSizeChange : pageData;
};

export var setTableRow = function setTableRow(tableRow, state) {

    state.tableRow.editBtn = tableRow.editBtn ? tableRow.editBtn : {
        show: true,
        icon: 'fa fa-edit',
        title: 'Edit Record'
    };

    state.tableRow.viewBtn = tableRow.viewBtn ? tableRow.viewBtn : {
        show: true,
        icon: 'fa fa-eye',
        title: 'View Record'
    };

    state.tableRow.deleteBtn = tableRow.deleteBtn ? tableRow.deleteBtn : {
        show: true,
        icon: 'fa fa-trash',
        title: 'Delete Record'
    };
    state.tableRow.customBtns = tableRow.customBtns;
};

export var setToolbar = function setToolbar(toolbar, state) {
    if (!toolbar) {
        toolbar = {};
    }
    state.toolbar.showGlobalSearch = true;
    state.toolbar.columnChooser = toolbar.columnChooser ? toolbar.columnChooser : {
        show: true,
        icon: 'fa fa-bars',
        title: 'Choose Columns'
    };
    state.toolbar.uploadBtn = state.toolbar.uploadBtn ? state.toolbar.uploadBtn : {
        show: true,
        icon: 'fa fa-upload',
        title: 'Upload Data',
        multiple: true,
        accept: '*'
    };

    state.toolbar.exportBtn = state.toolbar.exportBtn ? state.toolbar.exportBtn : {
        show: true,
        icon: 'fa fa-file-excel-o re-green',
        title: 'Export to CSV'
    };
    state.toolbar.addNewBtn = state.toolbar.addNewBtn ? state.toolbar.addNewBtn : {
        show: true,
        icon: 'fa fa-plus-circle',
        title: 'Add New'
    };
};

export var setOptions = function setOptions(props) {
    var state = {
        sortMap: new Map(),
        showSelect: false,
        pagination: {},
        filter: {},
        tableRow: {},
        toolbar: {},
        selectAllChecked: false
    };
    setPagination(props.pagination, props.data, state);
    setFilterr(props.filter, state);
    setTableRow(props.tableRow, state);
    setToolbar(props.toolbarBtns, state);

    var columns = enrichColumns(props.columns),
        data = enrichData(props.showRowSelectionCheckBox, props.data, columns);

    state.columns = columns;
    state.dataCache = data;
    if (!props.pagination.onPagerClick) {
        data = pageData(state.dataCache, state.pagination.currentPage, state.pagination.limit);
    }
    state.data = data;
    state.filteredKeys = Array.from(state.filter.filteredData.keys());
    return state;
};
export var pageData = function pageData(data, page, limit) {
    if (page < 1) {
        page = 1;
    }
    var total = Math.round(data.length / limit);
    if (page > total) {
        page = total;
    }
    var from = (page - 1) * limit,
        to = page * limit;

    return data.slice(from, to);
};

export var enrichColumns = function enrichColumns(columns) {
    columns.forEach(function (_) {
        if (_.show === undefined) {
            //eslint-disable-line
            _.show = true;
        }
    });

    return columns;
};

export var enrichData = function enrichData(showRowSelectionCheckBox, data, columns) {
    if (showRowSelectionCheckBox) {
        var hasSelectedProperty = columns.includes(function (_) {
            return _.isCheckBoxField;
        }),
            hasIdProperty = columns.includes(function (_) {
            return _.isPrimaryKey || _.id === 'id';
        });
        if (data && data.length > 0) {
            if (!hasSelectedProperty) {
                data.forEach(function (_) {
                    if (!_.hasOwnProperty('select')) {
                        _.selected = false;
                    }
                });
            }
            if (!hasIdProperty) {
                data.forEach(function (_) {
                    if (!_.hasOwnProperty('id')) {
                        _.id = uuid.v4();
                    }
                });
            }
        }
    }
    return data;
};