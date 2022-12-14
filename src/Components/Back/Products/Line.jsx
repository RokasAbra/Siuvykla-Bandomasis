import { useContext } from "react";
import BackContext from "../BackContext";

function Line({ line }) {
  const { setDeleteProduct, setModalProduct } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteProduct(line);
  };

  const handleEdit = () => {
    setModalProduct(line);
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <b>{line.title}</b>
          <i>{line.price.toFixed(2)} EUR.</i>
          <div
            className="box"
            style={{ backgroundColor: line.in_stock ? "chocolate" : null }}
          ></div>
          <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
          {/* {line.in_stock} */}
          
          <div className="cat">{line.cat}</div>
          {line.photo ? (
              <div className="photo-bin">
                <img src={line.photo} alt={line.title} />
              </div>
            ) : null}
        </div>
        <b style={{color: line.color }}> Color: {line.color}</b>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-outline-success ml-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ml-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
