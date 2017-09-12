import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';
import RenderBtn from './RenderBtn';
import uuid from 'uuid';

const ToolbarBtns = ({
    addNewBtn,
    uploadBtn,
    exportBtn,
    customBtns,
    onSearch,
    showGlobalSearch,
    columnChooser,
    showSelect,
    columns,
    data }) => {
    return (
        <div className="re-action-btns">
            {columnChooser && (
                <span className="re-column-chooser">
                    <RenderBtn {...columnChooser} />
                    {showSelect && <ul className="re-ul-col-chooser">
                        {
                            columns && columns.map(column => {
                                return (<li key={uuid.v4()}>
                                    <button className="re-col-chooser"
                                        onClick={() => columnChooser.onColumnSelect(column)}>
                                        {column.show && <i className="fa fa-check" />} {column.name}
                                    </button>
                                </li>);
                            })
                        }
                    </ul>}
                </span>
            )}
            {showGlobalSearch && <span className="re-toolbar-search">
                <i className="fa fa-search" />
                <input type="search" className="re-toolbar-search-input" placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
            </span>}
            {customBtns && customBtns.map(_ => {
                _.show = true;
                return <RenderBtn {..._} key={uuid.v4()} />;
            })}
            {addNewBtn && <RenderBtn {...addNewBtn} />}
            {uploadBtn && <span>
                <label htmlFor="re-toolbar-file-input"
                    className={'re-toolbar-file-input ' + uploadBtn.className}>
                    <i className={uploadBtn.icon} aria-hidden="true" /> {uploadBtn.text}
                </label>
                {uploadBtn.multiple ?
                    <input type="file"
                        multiple
                        accept={uploadBtn.accept}
                        onChange={uploadBtn.onClick}
                        id="re-toolbar-file-input"
                        className="re-toolbar-file-upload" />
                    : <input type="file"
                        accept={uploadBtn.accept}
                        onChange={uploadBtn.onClick}
                        id="re-toolbar-file-input"
                        className="re-toolbar-file-upload" />
                }
            </span>}
            <CSVLink data={data} >  {exportBtn && <RenderBtn {...exportBtn} />}</CSVLink>
        </div>
    );
};

ToolbarBtns.propTypes = {
    showSelect: PropTypes.bool,
    columns: PropTypes.array,
    showGlobalSearch: PropTypes.bool,
    onSearch: PropTypes.func,
    data: PropTypes.array.isRequired,
    columnChooser: PropTypes.shape({
        show: PropTypes.bool,
        icon: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onColumnSelect: PropTypes.func
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
};

export default ToolbarBtns;
