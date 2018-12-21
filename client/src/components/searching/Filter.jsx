import React from "react";

export default class Filter extends React.Component {
  state = {
    size: false,
    shoeSize: false
  };

  onColorChange = e => {
    let array = this.props.array.filter(
      prod => e.target.value.toLowerCase() === prod.color.toLowerCase()
    );
    this.props.stateChange({ array });
  };

  onSizeChange = e => {
    let array = this.props.array.filter(
      prod => e.target.value.toLowerCase() === prod.size.toLowerCase()
    );
    this.props.stateChange({ array });
  };

  onShoeSizeChange = e => {
    let array = this.props.array.filter(
      prod => parseInt(e.target.value) === parseInt(prod.size)
    );
    this.props.stateChange({ array });
  };

  onConditionChange = e => {
    let array = this.props.array.filter(
      prod => e.target.value.toLowerCase() === prod.condition.toLowerCase()
    );
    this.props.stateChange({ array });
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
