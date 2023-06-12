import React , {useState} from 'react'

export default function Special() {
  
    const menu= [
        { id:0 ,id_pd: 'S001', Type: 'Ice', name: 'TEA Lemon', quantity: 1, price: 45 ,card :""},
        { id:1 ,id_pd: 'S002', Type: 'Ice', name: 'Lemon+H', quantity: 1, price: 45 ,card :""},
        { id:2 ,id_pd: 'S003', Type: 'Ice', name: 'RedsLemon', quantity: 1, price: 45, card: "" },
        { id:3 ,id_pd: 'S004', Type: 'Ice', name: 'Nest TEA', quantity: 1, price: 40 ,card :""},
        { id:4 ,id_pd: 'S005', Type: 'Ice', name: 'Red soda', quantity: 1, price: 30 ,card :""},
      ];
      const menu2= [
        { id:0 ,id_pd: 'S006', Type: 'Ice', name: 'Green soda', quantity: 1, price: 30, card: "" },
        { id:1 ,id_pd: 'S007', Type: 'Ice', name: 'Coco', quantity: 1, price: 40 ,card :"color2"},
        { id:2 ,id_pd: 'S008', Type: 'Hot', name: 'Coco', quantity: 1, price: 40 ,card :"color2"},
        { id:3 ,id_pd: 'S009', Type: 'mix', name: 'Coco', quantity: 1, price: 45, card: "color2" },
        { id:4 ,id_pd: 'S010', Type: 'Mix', name: 'M150 pepo', quantity: 1, price: 40 ,card :""},
      ];
      const menu3= [
        { id:0 ,id_pd: 'S011', Type: 'Mix', name: 'Yacol pepo', quantity: 1, price: 45 ,card :""},
        { id:1 ,id_pd: 'S012', Type: 'Mix', name: 'Milk Pink', quantity: 1, price: 45, card: "" },
        { id:2 ,id_pd: 'S013', Type: 'Ice', name: 'Red soda(S)', quantity: 1, price:25 ,card :""},
        { id:3 ,id_pd: 'S014', Type: 'Ice', name: 'Coffee old', quantity: 1, price: 25 ,card :""},
        { id:4 ,id_pd: 'S015', Type: 'Ice', name: 'G soda(S)', quantity: 1, price: 25, card: "" },
      ];
      const menu4= [
        { id:0 ,id_pd: 'S016', Type: 'Ice', name: 'Rednosoda', quantity: 1, price: 25 ,card :""},
        { id:1 ,id_pd: 'S017', Type: 'Ice', name: 'Gnosoda', quantity: 1, price: 25, card: "" },
        { id:2 ,id_pd: 'S018', Type: 'Ice', name: 'Null', quantity: 1, price: 0,card :"disabled btn-secondary"},
        { id:3 ,id_pd: 'S019', Type: 'Ice', name: 'Null', quantity: 1, price: 0,card :"disabled btn-secondary"},
        { id:4 ,id_pd: 'S020', Type: 'Ice', name: 'Null', quantity: 1, price: 0, card: "disabled btn-secondary" },
      ];
      
       
      
      const [orders ,setOrders] = useState([]);
    
      // This Add to cart in Db
      const handleAddToCart = (item) => {
        
        fetch('http://localhost:3001/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
        .then((response) => response.json())
        .then((data) => {
          // If the request was successful, update the orders state
          setOrders((prevOrders) => [...prevOrders, data]);
          console.log(orders)
          window.location.reload(true)
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Error:', error);
        });
      };
      
      return (
            <div className="col-9">
              <div className="container card border 
              shadow-sm p-4 mb-6 bg-body-tertiary rounded" style={{height:"750px" , overflow: "hidden auto"}}>
                
                <div  >
                <div className="row">
                  {menu.map((item) => (
                    <div className="col" key={item.id}>
                       
                      <div className="card" style={{ height: '125px' }}>
                        <div className="row g-0">
                          
                          <div className="col">
                            <button
                                type="button"
                                 className={`btn btn-primary ${item.card}`}
                                onClick={() => handleAddToCart(item)}
                              >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="row">
                                <div className="form-group col-6">
                                 
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.Type}
                                    readOnly
                                  />
                                </div>
                                <div className="form-group col-6">
                                  
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.price}
                                    readOnly
                                  />
                                </div>
                              </div>
                             <br />
                              
                            </div>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                    </div>
    
                  ))}

                </div>
                <br />
                <div className="row">
                  {menu2.map((item) => (
                    <div className="col" key={item.id}>
                       
                      <div className="card" style={{ height: '125px' }}>
                        <div className="row g-0">
                          
                          <div className="col">
                            <button
                                type="button"
                                 className={`btn btn-primary ${item.card}`}
                                onClick={() => handleAddToCart(item)}
                              >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="row">
                                <div className="form-group col-6">
                                 
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.Type}
                                    readOnly
                                  />
                                </div>
                                <div className="form-group col-6">
                                  
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.price}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <br />
                             
                              
                            </div>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                    </div>
    
                  ))}

                </div>
                <br />
                <div className="row">
                  {menu3.map((item) => (
                    <div className="col" key={item.id}>
                      
                      <div className="card" style={{ height: '125px' }}>
                        <div className="row g-0">
                          
                          <div className="col"> 
                          <button
                                type="button"
                                 className={`btn btn-primary ${item.card}`}
                                onClick={() => handleAddToCart(item)}
                              >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="row">
                                <div className="form-group col-6">
                                 
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.Type}
                                    readOnly
                                  />
                                </div>
                                <div className="form-group col-6">
                                  
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.price}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <br />
                              
                            </div> 
                          </button>
                          </div>
                         
                        </div>
                      </div>
                      
                    </div>
    
                  ))}

                </div>
                <br />
                <div className="row">
                  {menu4.map((item) => (
                    <div className="col" key={item.id}>
                      
                      <div className="card" style={{ height: '125px' }}>
                        <div className="row g-0">
                          
                          <div className="col"> 
                          <button
                                type="button"
                                 className={`btn btn-primary ${item.card}`}
                                onClick={() => handleAddToCart(item)}
                              >
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div className="row">
                                <div className="form-group col-6">
                                 
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.Type}
                                    readOnly
                                  />
                                </div>
                                <div className="form-group col-6">
                                  
                                  <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    value={item.price}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <br />
                              
                            </div> 
                          </button>
                          </div>
                         
                        </div>
                      </div>
                      
                    </div>
    
                  ))}

                </div>
                <br />
                
                <br />
                
               
                
              
                
    
                </div>
              </div>  
              <div>
        </div>
            </div>
            )
}
