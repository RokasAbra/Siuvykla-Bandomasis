import { useEffect, useState } from "react";
import BackContext from "./BackContext";
import CategoriesCrud from "./Cats/Crud";
import Nav from "./Nav";
import ProductsCrud from "./Products/Crud";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { authConfig } from "../Functions/auth";
function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [categories, setCategories] = useState(null);
  const [createCat, setCreateCat] = useState(null);
  const [deleteCat, setDeleteCat] = useState(null);
  const [editCat, setEditCat] = useState(null);
  const [modalCat, setModalCat] = useState(null);

  //Categories Crud
  // Create
  useEffect(() => {
    if (null === createCat) return;
    axios
      .post("http://localhost:3003/admin/categories", createCat)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" });
      })
  }, [createCat]);

  //Read 
   useEffect(() => {
    axios.get('http://localhost:3003/admin/categories', authConfig())
        .then(res => setCategories(res.data));
}, [lastUpdate]);
  //Update
  useEffect(() => {
    if (null === editCat) return;
    axios.put('http://localhost:3003/admin/categories' + editCat.id, editCat)
      .then(res => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [editCat]);

    // Delete
    useEffect(() => {
        if (null === deleteCat) return;
        axios.delete('http://localhost:3003/admin/categories/' + deleteCat.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteCat]);


  //Messages window
  const [messages, setMessages] = useState([]);
  const showMessage = (m) => {
    const id = uuidv4();
    m.id = id;
    setMessages((msg) => [...msg, m]);
    setTimeout(() => {
      setMessages((mes) => mes.filter((ms) => ms.id !== id));
    }, 5000);
  };
  /////////////////////////////////////////////////////

  return (
    <BackContext.Provider
      value={{
        showMessage,
        messages,
        setCreateCat,
        setModalCat, 
        modalCat,
        categories,
        setDeleteCat,
        setEditCat
      }}
    >
      {show === "admin" ? (
        <>
          <Nav />
          <h1>BACK</h1>
        </>
      ) : show === "categories" ? (
        <CategoriesCrud />
      ) : // : show === 'com' ? <ComCrud /> :
      show === "products" ? (
        <ProductsCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
