import React, {useEffect, useRef, useState} from 'react'
import "./Products.css"
import ring from "../../images/ring.png"
import necklace from "../../images/necklace.png"
import ProductPanel from './ProductPanel'

const Products = () => {
  const [details, setDetails] = useState(false);
  const [isRing, setRing] = useState(true);
  const [productPanels, setProductPanels] = useState([]);

  const [metals, setMetals] = useState([]);
  const [gems, setGems] = useState([]);


  useEffect(() => {
    setProducts();

    fetch('/api/metals', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      if (Array.isArray(data)) {
        setMetals(data); // Store the fetched countries in state
      }
    })
    .catch((error) => console.error('Error fetching metals:', error));

    fetch('/api/gems')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGems(data); // Store the fetched countries in state
        }
      })
      .catch((error) => console.error('Error fetching gems:', error));
  }, []);

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
            return <ProductPanel key={product.id} name={product.productName} price={product.price} type={product.type} handleDetailsOpen={handleDetailsOpen} addToCart={addToCart}/>;
          })}
        </div>
      </div>
      
      <div className='details-popup' hidden={!details}>
        <div className='details-panel'>
          <h2>Name</h2>
          <img src={isRing ? ring : necklace} className='img-details'></img>

          <div className='details'>
            <p className='product-details'>Price: </p>
            <p className='product-details'>Mass: </p>
            <p className='product-details'>Metal: </p>
            <p className='product-details'>Gem: </p>
            <p className='product-details'>Creator: </p>
          </div>
          
          <button className='search-button' onClick={() => setDetails(false)}>Exit</button>
        </div>
      </div>
    </div>
  )

  function handleDetailsOpen(type, id) {
    setDetails(true)
    if(type == "ring") {
      setRing(true);
    }
    else {
      setRing(false);
    }

    //Get product details with API
    console.log(id);
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
    fetch('/api/metals', {
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      if (Array.isArray(data)) {
        setMetals(data); // Store the fetched countries in state
      }
    })
    .catch((error) => console.error('Error fetching metals:', error));
    
    const testArray = [{
      id: 1,
      productName: "pingas",
      creator: "hdsja",
      gem: "Diamond",
      metal: "gold",
      type: "ring",
      name: "bingo",
      mass: 100,
      price: 20000
    },
    {
      id: 2,
      productName: "pingas",
      creator: "hdsja",
      gem: "Diamond",
      metal: "gold",
      type: "necklace",
      name: "bingo",
      mass: 100,
      price: 20000
    },
    {
      id: 3,
      productName: "pingas",
      creator: "hdsja",
      gem: "Diamond",
      metal: "gold",
      type: "necklace",
      name: "bingo",
      mass: 100,
      price: 20000
    }
  ];

    setProductPanels(testArray);
  }
}

export default Products;