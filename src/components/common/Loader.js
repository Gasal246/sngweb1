import React from 'react'

const Loader = (props) => {
    return (
        <div id="global-loader">
            <img src={require("../../assets/images/loader.svg").default} className="loader-img" alt="Loader" />
        </div>
    )
}

export default Loader;