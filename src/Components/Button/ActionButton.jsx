import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

function ActionButton({ className, onClickAction, title, icon }) {


    function onActionSubmit() {

        confirmAlert({
            title: "Confirm",
            message: "Are you sure want to submit?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        onClickAction()
                    }
                }, {
                    label: "No!",
                    onClick: () => {
                        return;
                    }
                },
            ]
        })
    }


    return (
        <div className={"itemselect_filter " + className}>
            <a href="javascript:;" onClick={onActionSubmit}>
                <i className={"fa " + icon}></i> {title}
            </a>
        </div>
    )
}

export default ActionButton
