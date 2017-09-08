import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { CSVLink } from 'react-csv';

const renderBtn = ({ show, title, icon, text, className, onClick }) => {
    return show && <button key={uuid.v4()} className={'re-tbar-btn ' + className} onClick={onClick}
        title={title}> <i className={icon} aria-hidden="true" /> {text} </button>;
};

const ToolbarBtns = ({ addNewBtn, uploadBtn, exportBtn, customBtns, onGlobalSearchChange, showGlobalSearch, data }) => {
    return (
        <div className="re-action-btns">
            {showGlobalSearch && <span className="re-toolbar-search">
                <i className="fa fa-search" />
                <input type="search" className="re-toolbar-search-input" placeholder="Search" onChange={(e) => onGlobalSearchChange(e.target.value)} />
            </span>}
            {addNewBtn && renderBtn(addNewBtn)}
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
            <CSVLink data={data} >  {exportBtn && renderBtn(exportBtn)}</CSVLink>
            {customBtns && customBtns.map(_ => {
                _.show = true;
                return renderBtn(_);
            })}
        </div>
    );
};

ToolbarBtns.propTypes = {
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
    })),
    showGlobalSearch: PropTypes.bool,
    onGlobalSearchChange: PropTypes.func,
    data: PropTypes.array.isRequired
};

export default ToolbarBtns;
