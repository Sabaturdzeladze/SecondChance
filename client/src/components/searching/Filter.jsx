import React from "react";

export default class Filter extends React.Component {
  state = {
    size: false,
    shoeSize: false,
    url: this.props.location.search
  };

  onColorChange = e => {
    let url = this.props.location.search;
    if (!url.includes("color")) {
      this.setState(() => ({ url }));
      url += `&color=${e.target.value.toLowerCase()}`;
      window.location = url;
    } else {
      url = url.split("&");
      let url2 = "";
      for (let item of url) {
        if (item.includes("color")) {
          item = item.split("=");
          let replace = `${e.target.value.toLowerCase()}`;
          item.splice(1, 1, replace);
          url2 += item.join("=");
          window.location = url2;
          break;
        }
        url2 += `${item}&`;
      }
    }
  };

  onSizeChange = e => {
    let url = this.props.location.search;
    if (!url.includes("size")) {
      this.setState(() => ({ url }));
      url += `&size=${e.target.value.toLowerCase()}`;
      window.location = url;
    } else {
      url = url.split("&");
      let url2 = "";
      for (let item of url) {
        if (item.includes("size")) {
          item = item.split("=");
          let replace = `${e.target.value.toLowerCase()}`;
          item.splice(1, 1, replace);
          url2 += item.join("=");
          window.location = url2;
          break;
        }
        url2 += `${item}&`;
      }
    }
  };

  onShoeSizeChange = e => {
    let url = this.props.location.search;
    if (!url.includes("size")) {
      this.setState(() => ({ url }));
      url += `&size=${e.target.value.toLowerCase()}`;
      window.location = url;
    } else {
      url = url.split("&");
      let url2 = "";
      for (let item of url) {
        if (item.includes("size")) {
          item = item.split("=");
          let replace = `${e.target.value.toLowerCase()}`;
          item.splice(1, 1, replace);
          url2 += item.join("=");
          window.location = url2;
          break;
        }
        url2 += `${item}&`;
      }
    }
  };

  onConditionChange = e => {
    let url = this.props.location.search;
    if (!url.includes("condition")) {
      this.setState(() => ({ url }));
      url += `&condition=${e.target.value.toLowerCase()}`;
      window.location = url;
    } else {
      url = url.split("&");
      let url2 = "";
      for (let item of url) {
        if (item.includes("condition")) {
          item = item.split("=");
          let replace = `${e.target.value.toLowerCase()}`;
          item.splice(1, 1, replace);
          url2 += item.join("=");
          window.location = url2;
          break;
        }
        url2 += `${item}&`;
      }
    }
  };

  render() {
    return (
      <div className="select-group">
        <div className="select">
          <select name="slct" id="slct" onChange={this.onColorChange}>
            <option defaultValue value="">
              Color
            </option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="grey">Grey</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="multicolor">Multicolor</option>
          </select>
        </div>
        <div className="select">
          <select name="slct" id="slct" onChange={this.onSizeChange}>
            <option defaultValue>Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="select">
          <select name="slct" id="slct" onChange={this.onShoeSizeChange}>
            <option defaultValue>Shoe Sizes</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
          </select>
        </div>
        <div className="select">
          <select name="slct" id="slct" onChange={this.onConditionChange}>
            <option defaultValue>Condition</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="normal">Normal</option>
            <option value="bad">Bad</option>
          </select>
        </div>
      </div>
    );
  }
}
