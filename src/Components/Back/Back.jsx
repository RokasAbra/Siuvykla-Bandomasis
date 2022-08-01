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

  //Categories
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
      .post("http://localhost:3003/admin/categories/", createCat)
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
    axios.get('http://localhost:3003/admin/categories/', authConfig())
        .then(res => setCategories(res.data));
}, [lastUpdate]);
  //Update
  useEffect(() => {
    if (null === editCat) return;
    axios.put('http://localhost:3003/admin/categories/' + editCat.id, editCat)
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

//Products 

const [products, setProducts] = useState(null);
const [createProduct, setCreateProduct] = useState(null);
const [deleteProduct, setDeleteProduct] = useState(null);
const [editProduct, setEditProduct] = useState(null);
const [modalProduct, setModalProduct] = useState(null);
const [deletePhoto, setDeletePhoto] = useState(null);


//Products
  //Create 
  useEffect(() => {
    if (null === createProduct) return;
    axios.post('http://localhost:3003/admin/products/', createProduct, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })
}, [createProduct]);
  //Read 
  useEffect(() => {
    axios.get('http://localhost:3003/admin/products/', authConfig())
        .then(res => setProducts(res.data));
}, [lastUpdate]);
    //Delete 
    useEffect(() => {
        if (null === deleteProduct) return;
        axios.delete('http://localhost:3003/admin/products/' + deleteProduct.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteProduct]);
    //Edit
    useEffect(() => {
        if (null === editProduct) return;
        axios.put('http://localhost:3003/admin/products/' + editProduct.id, editProduct, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editProduct]);

    //Photo delete

    useEffect(() => {
        if (null === deletePhoto) return;
        axios.delete('http://localhost:3003/admin/photos/' + deletePhoto.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deletePhoto]);

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
        setEditCat,
        setCreateProduct,
        products,
        setDeleteProduct,
        setEditProduct,
        setModalProduct,
        modalProduct,
        setDeletePhoto
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
