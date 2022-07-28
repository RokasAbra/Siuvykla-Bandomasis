import Nav from "../Nav";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";

function Crud() {
  return (
    <>
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <Create />
          </div>
          <div className="col-6">
            <List></List>
          </div>
        </div>
      </div>
      <Edit></Edit>
    </>
  );
}

export default Crud;
