import React, { useState, useEffect } from 'react'
import "./CreateProduct.css"

const CreateProduct = () => {
  const [gems, setGems] = useState([]);
  const [metals, setMetals] = useState([]);
  const [links, setLinks] = useState([]);
  const [rings, setRings] = useState([]);
  const [type, setType] = useState("necklace");
  const [gem, setGem] = useState({});
  const [metal, setMetal] = useState({});
  const [link, setLink] = useState({});
  const [linkNum, setLinkNum] = useState(0);
  const [neckName, setNeckName] = useState("");
  const [ringName, setRingName] = useState("");
  const [ringSize, setRingSize] = useState(3.0);
  const [ringVolume, setRingVolume] = useState(20.0);
  const [ringType, setRingType] = useState("");

  useEffect(() => {
    setOptions();
  }, []);

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
            <select className='drop-down' onChange={e => {const selectedGem = JSON.parse(e.target.value);  setGem(selectedGem)}}>
                <option value="">Select a Gem</option>
                      {gems.map((gem) => (
                        <option key={gem.id} value={JSON.stringify(gem)}>
                          {gem.shape} {gem.name} {gem.carat} carats
                        </option>
                      ))}
            </select>
          </label>

          <label>
            Metal:
            <select className='drop-down' onChange={e => { const selectedMetal = JSON.parse(e.target.value); setMetal(selectedMetal);}}>
              <option value="">Select a Metal</option>
                {metals.map((metal) => (
                          
                          <option key={metal.id} value={JSON.stringify(metal)}>
                            {metal.name} {metal.purity}
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
            <select className='drop-down' onChange={e => {const selectedLink = JSON.parse(e.target.value); setLink(selectedLink);}}>
                  <option value="">Select a Link</option>
                      {links.map((link) => (
                                <option key={link.id} value={JSON.stringify(link)}>
                                  {link.name},   size: {link.size}
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

          <select className='drop-down' onChange={e => {setRingType(e.target.value)}}>
                <option value="">Select a Ring</option>
                      {rings.map((ringName) => (
                        <option key={ringName} value={ringName}>
                          {ringName} 
                        </option>
                      ))}
            </select>


          <label>
            Size:
            {/* onKeyDown={event => event.preventDefault()}  */} 
            <input className="drop-down" type='number'  min={3} max={16} step={0.5} defaultValue={3} onChange={e => setRingSize(e.target.value)}/>
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

    fetch('/api/metals')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMetals(data); // Store the fetched countries in state
          console.log(data);
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
  
      fetch('/api/links')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLinks(data); // Store the fetched countries in state
        }
      })
      .catch((error) => console.error('Error fetching links:', error));

      fetch('/api/rings')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ringNames = data.map((ring)=>{
            return ring.name;
          });
          
          const distinctRingNames = [...new Set(ringNames)]
          setRings(distinctRingNames); // Store the fetched countries in state

        }
      })
      .catch((error) => console.error('Error fetching rings:', error));
  }

  function createNecklaceOrder() {
    if(!sessionStorage.getItem("user")) {
      //Dont allow creation
      alert("Please log in to create an order.");
      return;
  } else {
      // Do API Stuff to create a necklace order
        const mass = linkNum * link.volume * metal.density;
        const price = mass*metal.costPerGram;
        if(gem){
          price += gem.price;
        }
        console.log("link")
        fetch("/api/necklaces", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            linkId: link.linkId,
            name: `${link.name} Necklace, ${link}mm`, /////////////////SOMEHOW GET SIZE FOR THE NAME 
            size: 300,  //volume*density of metal
            volume: ringVolume, //mass*$pg metal + gem
          })
      })
      .then(response => {
          if (response.status === 201) {
          // Parse the JSON only if the response is successful
          return response.json();
        } else {
          throw new Error("Unexpected Error");
        }
      })
      .then(data => {
          alert("Necklace order created successfully!");
          const neckId = data.neckId;
          // console.log("id:"+data.neckId);
          // console.log(sessionStorage.getItem("user")) ////////////SEEEEESSSSSIOOOOON STOOOOORAAAAAGEEEE ISSSSS NULLLLLL o wait
          
          const userString = sessionStorage.getItem("user");
          let userId;

          const user = JSON.parse(userString); 
          if(user.user_id != null){
            userId = user.user_id
          }else {
            userId = 1;
          }
   
          fetch("/api/products", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: neckName, 
                mass: mass,  //#links * link vol * metal density
                price: price, //mass*$pg metal + gem
                metalId: metal.metalId, 
                gemId: gem.gemId, 
                necklaceId: neckId, //find way to iterate from last created??? shouldnt this be done on the backend
                ringId: null,  
                creatorId: userId//FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                    //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                                          //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                                                              //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
              })})
          .then(response => {
              if (response.status === 201) {
                // Parse the JSON only if the response is successful
                return response.json();
              } else {
                throw new Error("Unexpected Error");
              }
          })
          .then(data => {
              if (data.success) {
                  alert("Necklace order created successfully!");
              } else {
                  alert("Failed to create necklace order.");
              }
          })
          .catch(error => {
              console.error("Error creating product order:", error);
              alert("Error creating product order.");
          });


        })
        .catch(error => {
            console.error("Error creating ring order:", error);
            alert("Error creating ring order.");
        });

      // Call the API to create the order (example using POST method)
      
  }
  }

  function createRingOrder() {
    if(!sessionStorage.getItem("user")) {
        //Dont allow creation
        alert("Please log in to create an order.");
        return;
    } else {
        // Do API Stuff to create a necklace order
        
        console.log("dense ", metal.density);
        const mass = metal.density * ringVolume;
        let price = mass*metal.costPerGram;
        if(gem){
          console.log("gem"+gem.price);
          price += gem.price;
        }

        console.log("price", gem)
        console.log(ringSize);
        console.log(ringVolume);
        console.log(price);
        //FETCH RING, POST TO RING TABLE
        fetch("/api/rings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: ringType,
              size: ringSize,  
              volume: ringVolume,
            })
        })
        .then(response => {
          if (response.status === 201) {
            // Parse the JSON only if the response is successful
            return response.json();
          } else {
            throw new Error("Unexpected Error");
          }
        })
        .then(data => {
            alert("Ring order created successfully!");
            const ringId = data.ringId;

            console.log("id:"+data.ringId);
            // console.log(sessionStorage.getItem("user"))
            // console.log(sessionStorage.getItem("user")["username"]) ////////////SEEEEESSSSSIOOOOON STOOOOORAAAAAGEEEE ISSSSS NULLLLLL o wait
            const userString = sessionStorage.getItem("user");
            let userId;

            const user = JSON.parse(userString); 
            if(user.user_id != null){
              userId = user.user_id
            }else {
              userId = 1;
            }

            console.log(mass)
            console.log("mId"+metal.metalId);
            fetch("/api/products", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },

              body: JSON.stringify({
                name: ringName, 
                mass: mass,  //volume*density of metal
                price: price, //mass*$pg metal + gem
                metalId: metal.metalId, 
                gemId: gem.gemId, 
                necklaceId: null, 
                ringId: ringId, 
                creatorId: userId //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                      //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                                            //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
                                                                                //FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIXXXXXXXXXXXXXX
              })})
          .then(response => {
            if (response.status === 201) {
              // Parse the JSON only if the response is successful
              return response.json();
            } else {
              throw new Error("Unexpected Error");
            }
          })
          .then(data => {
              alert("Product order created successfully!");
          })
          .catch(error => {
              console.error("Error creating product order:", error);
              alert("Error creating product order.");
          });


        })
        .catch(error => {
            console.error("Error creating ring order:", error);
            alert("Error creating ring order.");
        });


    }
  }
}
    
  
export default CreateProduct;