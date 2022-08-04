import { useContext } from "react";
import BackContext from "../BackContext";

function Line({ line }) {
  const { setDeleteCom } = useContext(BackContext);

  const handleDelete = () => {
    console.log(line);
    setDeleteCom(line);
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
            <h6>{line.title}</h6>
          <b>{line.com}</b>
        </div>
        <div className="buttons">
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
