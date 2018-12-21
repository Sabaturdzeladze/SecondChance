import React from "react";

export default ({main, url1, url2}) => {
  return (
    <div className="preview col-md-6">
      <div className="preview-pic tab-content">
        <div className="tab-pane active" id="pic-1">
          <img alt="Product Details" src={`/images/${main.filename}`} />
        </div>
        <div className="tab-pane" id="pic-2">
          <img alt="Product Details" src={url1} />
        </div>
        <div className="tab-pane" id="pic-3">
          <img alt="Product Details" src={url2} />
        </div>
      </div>
      <ul className="preview-thumbnail nav nav-tabs">
        <li className="active">
          <a href="/" data-target="#pic-1" data-toggle="tab">
            <img alt="Product Details" src={`/images/${main.filename}`}  />
          </a>
        </li>
        <li>
          <a href="/" data-target="#pic-2" data-toggle="tab">
            <img alt="Product Details" src={url1} />
          </a>
        </li>
        <li>
          <a href="/" data-target="#pic-3" data-toggle="tab">
            <img alt="Product Details" src={url2} />
          </a>
        </li>
      </ul>
    </div>
  );
};
