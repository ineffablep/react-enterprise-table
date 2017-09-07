import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import './index.css';

export class Table extends Component {
    constructor(props) {
        super(props);
        this.onFilter = this.onFilter.bind(this);
        this.onSort = this.onSort.bind(this);
        this.state = {
            data: this.props.data
        };
    }

    onSort(id, type) {
        if (this.props.serverSideSort) {
            this.props.onSort(id, type);
        } else {
            let col = this.props.columns.find(_ => _.id === id);
            if (col) {
                this.setState({ data: this.sortData(id, col.dataType, type) });
            }
        }
    }

    onFilter(id, values) {
        if (this.props.serverSideFilter) {
            this.props.onFilter(id, values);
        } else {
            let fd = this.state.data.filter(_ => {
                return values.includes(_[id]);
            });
            this.setState({ data: fd });
        }
    }

    render() {
        const { columns, data, sortFilterPanelIcon, ascIcon, descIcon, noSortIcon, filterIcon, filterAppliedIcon } = this.props;
        return (
            <div className="re-table-container">
                <table className="re-table">
                    <thead className="re-thead">
                        <tr className="re-thr">
                            {columns.map(_ => <TableHeader {..._} key={uuid.v4()}
                                data={data}
                                ascIcon={ascIcon}
                                descIcon={descIcon}
                                noSortIcon={noSortIcon}
                                filterIcon={filterIcon}
                                filterAppliedIcon={filterAppliedIcon}
                                onFilter={this.onFilter}
                                onSort={this.onSort}
                                sortFilterPanelIconClassName={sortFilterPanelIcon} />)}
                        </tr>

                    </thead>
                    <tbody className="re-tobdy">
                        {this.state.data.map(_ => <TableRow key={uuid.v4()} columns={columns} row={_} />)}
                    </tbody>
                </table>
            </div>
        );
    }

    sortData(id, dataType, sortType) {
        if (dataType === 'text') {
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
        } else if (dataType === 'number') {
            if (sortType === 'asc') {
                return this.state.data.sort((a, b) => a[id] - b[id]);
            } else if (sortType === 'desc') {
                return this.state.data.sort((a, b) => b[id] - a[id]);
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
        style: PropTypes.object
    })).isRequired,
    data: PropTypes.array.isRequired,
    sortFilterPanelIcon: PropTypes.string,
    ascIcon: PropTypes.string,
    descIcon: PropTypes.string,
    noSortIcon: PropTypes.string,
    filterIcon: PropTypes.string,
    filterAppliedIcon: PropTypes.string,
    serverSideFilter: PropTypes.bool,
    serverSideSort: PropTypes.bool,
    onSort: PropTypes.func,
    onFilter: PropTypes.func
};

Table.defaultProps = {
    data: [],
    serverSideFilter: false,
    serverSideSort: false
};

export default Table;
