import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const renderBtn = ({ show, title, icon, text, className, onClick }) => {
    return show && <button key={uuid.v4()} className={'re-tbar-btn ' + className} onClick={onClick}
        title={title}> <i className={icon} /> {text} </button>;
};

const ToolbarBtns = ({ addNewBtn, uploadBtn, exportBtn, customBtns }) => {
    return (
        <div className="re-action-btns">
            {addNewBtn && renderBtn(addNewBtn)}
            {uploadBtn && renderBtn(uploadBtn)}
            {exportBtn && renderBtn(exportBtn)}
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
        onClick: PropTypes.func
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
