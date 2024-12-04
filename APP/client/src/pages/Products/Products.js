import React, {useEffect, useState} from 'react'
import "./Products.css"
import ring from "../../images/ring.png"
import necklace from "../../images/necklace.png"
import ProductPanel from './ProductPanel'

const Products = () => {
  const [details, setDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isRing, setRing] = useState(true);
  const [productPanels, setProductPanels] = useState([]);

  const [metals, setMetals] = useState([]);
  const [gems, setGems] = useState([]);


  useEffect(() => {
    setProducts();
  }, []);

  useEffect(()=>{
    fetch('/api/open/metals')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMetals(data); // Store the fetched countries in state
        }
      })
      .catch((error) => console.error('Error fetching metals:', error));
  },[metals]);

  useEffect(()=>{
    fetch('/api/open/gems')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGems(data); // Store the fetched countries in state
        }
      })
      .catch((error) => console.error('Error fetching gems:', error));
  },[gems]);



  return (
    <div className='page-wrap'>
      <div className='product-page-wrapper'>

        <div className='search-panel'>
          <div className='searchbar'>
            <input type='text' placeholder='Search...' className='drop-down'></input>
            <button className='search-button'>search</button>
          </div>
          
          <label>
            Material:
            <select name="materials" id="materials" className='drop-down'>
              <option value="default">All</option>
                    {metals.map((metal) => (
                        <option key={metal.id} value={metal.name}>
                          {metal.name}
                        </option>
                      ))}
            </select>
          </label>

          <label>
            Gem:
            <select name="gems" id="gems" className='drop-down'>
              <option value="default">All</option>
                      {gems.map((gem) => (
                        <option key={gem.id} value={gem.name}>
                          {gem.name}
                        </option>
                      ))}
              <option value="none">None</option>
            </select>
          </label>

          <label>
            Type:
            <select name="type" id="type" className='drop-down'>
              <option value="default">All</option>
              <option value="necklace">Necklace</option>
              <option value="ring">Ring</option>
            </select>
          </label>

          <label>
            Sort By:
            <select name="sortby" id="sortby" className='drop-down'>
              <option value="default"></option>
              <option value="popular">Popular</option>
              <option value="high">Price High</option>
              <option value="low">Price Low</option>
            </select>
          </label>
        </div>

        <div className='products'>
          {productPanels.map((product) => {
            return <ProductPanel key={product.id} proId={product.productId} name={product.name} price={product.price} type={product.ringId ? "ring" : "necklace"} handleDetailsOpen={handleDetailsOpen} addToCart={addToCart}/>;
          })}
        </div>
      </div>
      
      <div className='details-popup' hidden={!details}>
        <div className='details-panel'>
          <h2>Name: {selectedProduct.productName}</h2>
          <img src={isRing ? ring : necklace} className='img-details'></img>

          <div className='details'>
            <p className='product-details'>Price: {selectedProduct.price}</p>
            <p className='product-details'>Mass: {selectedProduct.mass}</p>
            <p className='product-details'>Metal: {selectedProduct.name}</p>
            <p className='product-details'>Volume: {selectedProduct.volume}</p>
            <p className='product-details'>Metal Purity: {selectedProduct.purity}</p>
            <p className='product-details'>Metal Type: {selectedProduct.type}</p>
            {/* <p className='product-details'>Gem: {}</p> */}
            <p className='product-details'>Creator: {selectedProduct.firstName + " " + selectedProduct.lastName}</p>
          </div>
          
          <button className='search-button' onClick={() => setDetails(false)}>Exit</button>
        </div>
      </div>
    </div>
  )

  function handleDetailsOpen(type, id) {
    fetch(`/api/products/details/ring/${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setSelectedProduct(data.message);
    })
    .catch(error => {
        console.error("Error fetching products", error);
    });

    setDetails(true)
    if(type === "ring") {
      setRing(true);
    }
    else {
      setRing(false);
    }
  }

  function addToCart(id) {
    var stored = JSON.parse(localStorage.getItem("cartList"));

    const cartObj = {
      "id": id,
      "quantity": 1
    };

    if(stored == null) {
      const init = [cartObj];
      localStorage.setItem("cartList", JSON.stringify(init));
    }

    else if(!stored.find(e => e["id"] === id)) {
      stored.push(cartObj);
  
      localStorage.setItem("cartList", JSON.stringify(stored));
    }
    // localStorage.removeItem("cartItems")
  }

  function setProducts() {
    //API CALL TO POPULATE productPanels WITH EXISTING PRODUCTS
    //NEED productId, price, all other attributes (would be good to select actual value instead of id, i.e. actual metal name instead of metalId)
    
    fetch("/api/products", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }})
    .then(response => response.json())
    .then(data => {
        setProductPanels(data);
    })
    .catch(error => {
        console.error("Error fetching products", error);
    });
  }
}

export default Products;