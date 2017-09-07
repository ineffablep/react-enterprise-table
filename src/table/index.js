import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

import './index.css';

export class Table extends Component {
    render() {
        const { columns, data } = this.props;
        return (
            <div className="re-table-container">
                <table className="re-table">
                    <thead className="re-thead">
                        <tr className="re-thr">
                            {columns.map(_ => <TableHeader {..._} key={uuid.v4()} data={data} />)}
                        </tr>
                    </thead>
                    <tbody className="re-tobdy">
                        {data.map(_ => <TableRow key={uuid.v4()} columns={columns} row={_} />)}
                    </tbody>
                </table>
            </div>
        )
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
        style: PropTypes.object,
    })).isRequired,
    data: PropTypes.array.isRequired
};

Table.defaultProps = {
    data: []
};

export default Table;
