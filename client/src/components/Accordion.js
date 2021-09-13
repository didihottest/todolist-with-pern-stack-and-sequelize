import React  from "react";

const Accordion = ({buttonName, Component, accordionNumber, collapsed}) => {
  return (
    <div id="accordion mt-5">
        <div className="card">
            <div className="card-header violetBG">
                <a className={ `block w-100 ${collapsed ? "collapsed" : null} card-link text-white`} style={{display: "block", width:"100%"}} data-toggle="collapse" href={`#${accordionNumber}`}>
                {buttonName}
            </a>
            </div>
            <div id={accordionNumber} className={`collapse ${ collapsed ? "show": null }`} data-parent="#accordion">
                <div className="card-body">
                    {Component}
                </div>
            </div>
        </div>
    </div>
  );
}

export default Accordion;