import dateformat from 'dateformat';
import uuid from 'uuid';

export const searchData = (searchText, data, columns) => {
    let searchResults = data.filter(_ => {
        let res = false;
        columns.forEach(col => {
            let item = _[col.id];
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

export const sortData = (data, dataLastUpdated, id, dataType = 'text', sortType = 'asc', dateFormat = 'dd/mm/yyyy') => {
    if (dataType === 'number') {
        if (sortType === 'asc') {
            return data.sort((a, b) => a[id] - b[id]);
        } else if (sortType === 'desc') {
            return data.sort((a, b) => b[id] - a[id]);
        }
    } else if (dataType === 'date' || dataType === 'datetime') {

        if (sortType === 'desc') {
            return data.sort((a, b) => {
                let dateA = dateformat(a[id], dateFormat);
                let dateB = dateformat(b[id], dateFormat);
                return dateA > dateB;

            });
        } else if (sortType === 'asc') {
            return data.sort((a, b) => {
                let dateA = dateformat(a[id], dateFormat);
                let dateB = dateformat(b[id], dateFormat);
                return dateA < dateB;
            });
        }
    } else {
        if (sortType === 'asc') {
            return data.sort((a, b) => {
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
            return data.sort((a, b) => {
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
    return data;
};

export const filterData = (dataToFilter, filteredData) => {
    if (!dataToFilter || !filterData) {
        return [];
    }

    filteredData.forEach((value, id) => {
        let filtered = value.filter(_ => _.checked),
            selectedValues = filtered.map(_ => _.value);
        if (selectedValues && selectedValues.length > 0) {
            let dataType = filtered[0].dataType;
            if (dataType) {
                if (dataType === 'date' || dataType === 'dateTime') {
                    let format = filtered[0].format;
                    if (format) {
                        return dataToFilter = dataToFilter.filter(_ => {
                            let formatted = dateformat(_[id], format);
                            return selectedValues.includes(formatted);
                        });
                    }
                }
            }
            dataToFilter = dataToFilter.filter(_ => {
                return selectedValues.includes(_[id]);
            });
        }
    });
    return dataToFilter;
};

const setFilterr = (filter, state) => {

    if (!state.filter) {
        state.filter = {};
    }

    state.filter.filteredData = filter.filteredData ? filter.filteredData : new Map();
    state.filter.filterIcon = filter.filterIcon ? filter.filterIcon : 'fa fa-filter';
    state.filter.appliedIcon = filter.appliedIcon ? filter.appliedIcon : 'fa fa-filter';
    state.filter.onFilter = filter.onFilter ? filter.onFilter : filterData;
};

const setPagination = (pagination, data, state) => {
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

export const setTableRow = (tableRow, state) => {

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

export const setToolbar = (toolbar, state) => {
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

export const setOptions = (props) => {
    let state = {
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

    let columns = enrichColumns(props.columns),
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
export const pageData = (data, page, limit) => {
    if (page < 1) {
        page = 1;
    }
    let total = Math.round(data.length / limit);
    if (page > total) {
        page = total;
    }
    let from = (page - 1) * limit,
        to = page * limit;

    return data.slice(from, to);
};

export const enrichColumns = (columns) => {
    columns.forEach(_ => {
        if (_.show === undefined) { //eslint-disable-line
            _.show = true;
        }
    });

    return columns;
};

export const enrichData = (showRowSelectionCheckBox, data, columns) => {
    if (showRowSelectionCheckBox) {
        const hasSelectedProperty = columns.includes(_ => _.isCheckBoxField),
            hasIdProperty = columns.includes(_ => _.isPrimaryKey || _.id === 'id');
        if (data && data.length > 0) {
            if (!hasSelectedProperty) {
                data.forEach(_ => {
                    if (!_.hasOwnProperty('select')) {
                        _.selected = false;
                    }
                });
            }
            if (!hasIdProperty) {
                data.forEach(_ => {
                    if (!_.hasOwnProperty('id')) {
                        _.id = uuid.v4();
                    }
                });
            }
        }
    }
    return data;
};
