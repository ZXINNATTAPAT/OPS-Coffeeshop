import React , {useState} from 'react'

export default function Teapage() {
    const menu= [
        { id:0 ,id_pd: 'T001', Type: 'Ice', name: 'TEA', quantity: 1, price: 40 ,card :""},
        { id:1 ,id_pd: 'T002', Type: 'Ice', name: 'Green Tea', quantity: 1, price: 40 ,card :""},
        { id:2 ,id_pd: 'T003', Type: 'Ice', name: 'Black Tea', quantity: 1, price: 35, card: "" },
        { id:3 ,id_pd: 'T004', Type: 'Hot', name: 'TEA', quantity: 1, price: 30 ,card :""},
        { id:4 ,id_pd: 'T005', Type: 'Hot', name: 'Green Tea', quantity: 1, price: 35 ,card :""},
      ];
      const menu2= [
        { id:0 ,id_pd: 'A006', Type: 'Hot', name: 'Black Tea', quantity: 1, price: 30, card: "" },
        { id:1 ,id_pd: 'T007', Type: 'Mix', name: 'TEA', quantity: 1, price: 45 ,card :""},
        { id:2 ,id_pd: 'T008', Type: 'Mix', name: 'Green Tea', quantity: 1, price: 45 ,card :""},
        { id:3 ,id_pd: 'T009', Type: 'Mix', name: 'Black Tea', quantity: 1, price: 40, card: "" },
        { id:4 ,id_pd: 'T009', Type: 'Mix', name: 'Null', quantity: 1, price: 0, card: "" },
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
                                className="btn btn-primary"
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
                                className="btn btn-primary"
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
                
                
    
                </div>
              </div>  
              <div>

        </div>
            </div>
    
            
    
        
      )
}
