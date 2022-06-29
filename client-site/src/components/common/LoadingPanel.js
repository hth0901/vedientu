import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

const LoadingPanelItem = (props) => {
    return (
        <div id="ftco-loader" className="show fullscreen">
            <svg className="circular" width="48px" height="48px">
                <circle
                    className="path-bg"
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    strokeWidth={'4'}
                    stroke="#eeeeee"
                />
                <circle
                    className="path"
                    cx="24"
                    cy="24"
                    r="22"
                    fill="none"
                    strokeWidth="4"
                    strokeMiterlimit={'10'}
                    stroke="#F96D00"
                />
            </svg>
        </div>
    )
}

const LoadingPanel = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <LoadingPanelItem />,
                document.getElementById('loadingPanel')
            )}
        </Fragment>
    )
}

export default LoadingPanel
