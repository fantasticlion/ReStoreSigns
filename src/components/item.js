export default function ProductItem(props) {   
  return (
    <div className="item">
      <img src={props.info["image_link"]}></img>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["unit_price"])}>
        Add</button>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["unit_price"])}>
        Remove</button>
    </div>);
}
