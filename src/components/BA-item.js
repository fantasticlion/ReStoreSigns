export default function ProductBAItem(props) {   
  return (
    <div className="item">
      <img src={props.info["image_link"]} alt={props.info["name"]}></img>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["unit_price"], 'add')}>
        Add
      </button>
      <button onClick={() => props.setStateOfParent(props.info["name"], props.info["unit_price"], 'remove')}>
        Remove
      </button>
    </div>
  );
}
