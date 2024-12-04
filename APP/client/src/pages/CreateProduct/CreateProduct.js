import React, { useState, useEffect } from 'react'
import "./CreateProduct.css"

const CreateProduct = () => {
  const [gems, setGems] = useState([]);
  const [metals, setMetals] = useState([]);
  const [links, setLinks] = useState([]);
  const [type, setType] = useState("necklace");
  const [gemId, setGemId] = useState("");
  const [metalId, setMetalId] = useState("");
  const [linkId, setLinkId] = useState("");
  const [linkNum, setLinkNum] = useState("");
  const [neckName, setNeckName] = useState("");
  const [ringName, setRingName] = useState("");
  const [ringSize, setRingSize] = useState("");
  const [ringVolume, setRingVolume] = useState("");

  useEffect(() => {
    setOptions();
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

  useEffect(()=>{
    fetch('/api/open/links')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLinks(data); // Store the fetched countries in state
        }
      })
      .catch((error) => console.error('Error fetching gems:', error));
  },[links]);

  return (
    <div className='page-wrap'>
      <div className='create-page-wrapper'>
        <div className='create-selects'>
          <h2>Customize Jewelry Base</h2>

          <label>
            Type:
            <select className='drop-down' onChange={e => setType(e.target.value)}>
              <option value="necklace">Necklace</option>
              <option value="ring">Ring</option>
            </select>
          </label>
          
          <label>
            Gem:
            <select className='drop-down' onChange={e => setGemId(e.target.value)}>
                <option value="">Select a Gem</option>
                      {gems.map((gem) => (
                        <option key={gem.id} value={gem.name}>
                          {gem.name}
                        </option>
                      ))}
            </select>
          </label>

          <label>
            Metal:
            <select className='drop-down' onChange={e => setMetalId(e.target.value)}>
              <option value="">Select a Metal</option>
                {metals.map((metal) => (
                          <option key={metal.id} value={metal.id}>
                            {metal.name}
                          </option>
                        ))}
            </select>
          </label>
        </div>

        {type == "necklace" && 
        <div className='type-customization'>
          <h2>Cuztomize Necklace</h2>

          <label>
            Link Type:
            <select className='drop-down' onChange={e => setLinkId(e.target.value)}>
                  <option value="">Select a Link</option>
                      {links.map((link) => (
                                <option key={link.id} value={link.id}>
                                  {link.name}
                                </option>
                              ))}
            </select>
          </label>

          <label>
            Link Amount:
            <input className="drop-down" onKeyDown={event => event.preventDefault()} type='number' min={20} max={100} defaultValue={20} onChange={e => setLinkNum(e.target.value)}></input>
          </label>
          
          <label>
            Name:
            <input type='text' placeholder='...' className='name-input' onChange={e => setNeckName(e.target.value)}></input>
          </label>
          
          <button className='login-button' onClick={createNecklaceOrder}>Create Product</button>
        </div>
        }
        {type == "ring" &&
        <div className='type-customization'>
          <h2>Cuztomize Ring</h2>
          
          <label>
            Size:
            <input className="drop-down" onKeyDown={event => event.preventDefault()} type='number' min={3} max={16} step={0.5} defaultValue={3} onChange={e => setRingSize(e.target.value)}></input>
          </label>
          
          <label>
            Volume {"(mm^3)"}:
            <input className="drop-down" type='number' min={1} max={100} step={0.1} defaultValue={20} onChange={e => setRingVolume(e.target.value)}></input>
          </label>

          <label>
            Name:
            <input type='text' placeholder='...' className='name-input' onChange={e => setRingName(e.target.value)}></input>
          </label>

          <button className='login-button' onClick={createRingOrder}>Create Product</button>
        </div>
        } 
      </div>
    </div>
  )

  function setOptions() {
    //DO API CALLS HERE
    //Load gem and metal list into gems and metals useState and .map to make them into <option> elements
    //Set value of element to id

    //also do for links
  }

  function createNecklaceOrder() {
    if(!localStorage.getItem("username")) {
      //Dont allow creation
      alert("Please log in to create an order.");
      return;
  } else {
      // Do API Stuff to create a necklace order
      

      // Call the API to create the order (example using POST method)
      fetch("/api/secure/products", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
             name: neckName, 
             mass: "___",  //no way to calculate atm
             price: "____", //no way to calculate atm
             metalId: metalId, 
             gemId: gemId, 
             necklaceId: null, 
             ringId: "___", //find way to iterate from last created??? shouldnt this be done on the backend 
             creatorId: localStorage.getItem("userID") 
          })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Necklace order created successfully!");
          } else {
              alert("Failed to create necklace order.");
          }
      })
      .catch(error => {
          console.error("Error creating necklace order:", error);
          alert("Error creating necklace order.");
      })});
  }
  }

  function createRingOrder() {
    if(!localStorage.getItem("username")) {
        //Dont allow creation
        alert("Please log in to create an order.");
        return;
    } else {
        // Do API Stuff to create a necklace order

        // Call the API to create the order (example using POST method)
        fetch("/api/secure/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               name: ringName, 
               mass: "___",  //volume*density of metal
               price: "____", //mass*$pg metal + gem
               metalId: metalId, 
               gemId: gemId, 
               necklaceId: null, 
               ringId: "___", //find way to iterate from last created??? shouldnt this be done on the backend is there like an autoiterate or something in sql?
               creatorId: localStorage.getItem("userID") 
            })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Necklace order created successfully!");
            } else {
                alert("Failed to create necklace order.");
            }
        })
        .catch(error => {
            console.error("Error creating necklace order:", error);
            alert("Error creating necklace order.");
        })});
    }
  }
}
    
  
export default CreateProduct;