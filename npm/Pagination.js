var _this = this;

import React from 'react';
import PropTypes from 'prop-types';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';
var Pagination = function Pagination(_ref) {
    var currentPage = _ref.currentPage,
        totalPages = _ref.totalPages,
        onPaginationClick = _ref.onPaginationClick,
        totalRecords = _ref.totalRecords,
        pageSize = _ref.pageSize,
        pageLimit = _ref.pageLimit,
        onPageSizeChangeClick = _ref.onPageSizeChangeClick;

    return React.createElement(
        'div',
        { className: 're-pagination-container' },
        React.createElement(
            'div',
            { className: 'pull-left' },
            React.createElement(
                'button',
                { className: 're-pagination-total-records' },
                ' Total Records: ',
                totalRecords,
                ' '
            )
        ),
        React.createElement(
            'div',
            { className: 're-pagination-btns pull-right' },
            React.createElement(RenderBtn, { icon: 'fa fa-angle-left',
                title: 'Previous',
                className: 'no-tb-border',
                show: true,
                onClick: function onClick() {
                    return onPaginationClick(currentPage - 1);
                } }),
            React.createElement(RenderBtn, { text: currentPage + ' of ' + totalPages, className: 'no-tb-border',
                show: true }),
            React.createElement(RenderBtn, { icon: 'fa fa-angle-right', title: 'Next', className: 'no-tb-border',
                show: true,
                onClick: function onClick() {
                    return onPaginationClick(currentPage + 1);
                } }),
            React.createElement(
                'button',
                { className: 're-pagination-total-records' },
                ' Go To: '
            ),
            React.createElement(
                'select',
                { value: _this.currentPage,
                    className: 're-tbar-btn no-tb-border',
                    onChange: function onChange(e) {
                        return onPaginationClick(parseInt(e.target.value, 10));
                    } },
                Array.from(Array(totalPages).keys()).map(function (_) {
                    return React.createElement(
                        'option',
                        { key: uuid.v4(), value: _ + 1 },
                        _ + 1,
                        ' '
                    );
                })
            ),
            pageSize && pageSize.length > 0 && React.createElement(
                'span',
                null,
                React.createElement(
                    'button',
                    { className: 're-pagination-total-records' },
                    ' Records per Page: '
                ),
                React.createElement(
                    'select',
                    { className: 're-tbar-btn no-tb-border', value: _this.pageLimit,

                        onChange: function onChange(e) {
                            return onPageSizeChangeClick(parseInt(e.target.value, 10));
                        } },
                    pageSize.map(function (_) {
                        return React.createElement(
                            'option',
                            { key: uuid.v4(), value: _ },
                            _,
                            ' '
                        );
                    })
                )
            )
        )
    );
};
Pagination.propTypes = {

    currentPage: PropTypes.number,
    pageLimit: PropTypes.number,
    totalPages: PropTypes.number,
    totalRecords: PropTypes.number,
    pageSize: PropTypes.array,
    onPaginationClick: PropTypes.func,
    onPageSizeChangeClick: PropTypes.func

};
export default Pagination;