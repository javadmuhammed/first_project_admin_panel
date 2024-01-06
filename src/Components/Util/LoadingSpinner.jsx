import React, { Fragment } from 'react'

function LoadingSpinner({ isShow }) {
    return (
        <Fragment>
            <div className={"loadingSpinnerWrapper " + (!isShow ? "d-none" : " ")} >
                <span class="loadingSpinner"></span>
            </div>
        </Fragment>
    )
}

export default LoadingSpinner
