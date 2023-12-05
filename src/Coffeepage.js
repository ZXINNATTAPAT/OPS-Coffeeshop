import React , {useState} from 'react'

export default function Coffeepage() {

  const menu= [
    { id:0 ,id_pd: 'A001', Type: 'Ice', name: 'Mocha', quantity: 1, price: 45 ,card :"btn-primary"},
    { id:1 ,id_pd: 'A002', Type: 'Ice', name: 'Cappuccino', quantity: 1, price: 50 ,card :"btn-primary"},
    { id:2 ,id_pd: 'A003', Type: 'Ice', name: 'Espresso', quantity: 1, price: 40, card: "btn-primary" },
    { id:3 ,id_pd: 'A004', Type: 'Ice', name: 'Latte', quantity: 1, price: 50 ,card :"btn-primary"},
    { id:4 ,id_pd: 'A005', Type: 'Ice', name: 'Americano', quantity: 1, price: 35 ,card :"btn-primary"},
  ];
  const menu2= [
    { id:0 ,id_pd: 'A006', Type: 'Ice', name: 'Nest coffee', quantity: 1, price: 25, card: "" },
    { id:1 ,id_pd: 'A001', Type: 'Hot', name: 'Mocha', quantity: 1, price: 45 ,card :"btn-danger "},
    { id:2 ,id_pd: 'A002', Type: 'Hot', name: 'Cappuccino', quantity: 1, price: 50 ,card :"btn-danger "},
    { id:3 ,id_pd: 'A003', Type: 'Hot', name: 'Espresso', quantity: 1, price: 40, card: "btn-danger " },
    { id:4 ,id_pd: 'A004', Type: 'Hot', name: 'Latte', quantity: 1, price: 50 ,card :"btn-danger "},
  ];

  const menu4= [
    { id:0 ,id_pd: 'A005', Type: 'Hot', name: 'Americano', quantity: 1, price: 35 ,card :" btn-danger"},
    { id:1 ,id_pd: 'A006', Type: 'Hot', name: 'Nest coffee', quantity: 1, price: 20, card: "btn-danger " },
    { id:2 ,id_pd: 'A001', Type: 'mix', name: 'Mocha', quantity: 1, price: 50 ,card :"btn-info"},
    { id:3 ,id_pd: 'A002', Type: 'mix', name: 'Cappuccino', quantity: 1, price: 55 ,card :"btn-info "},
    { id:4 ,id_pd: 'A003', Type: 'mix', name: 'Espresso', quantity: 1, price: 45, card: "btn-info" },
  ];
 
  const menu6= [
    { id:0 ,id_pd: 'A004', Type: 'mix', name: 'Latte', quantity: 1, price: 55 ,card :"btn-info"},
    { id:1 ,id_pd: 'A005', Type: 'mix', name: 'Americano', quantity: 1, price: 40 ,card :"btn-info"},
    { id:2 ,id_pd: 'A006', Type: 'mix', name: 'Nest coffee', quantity: 1, price: 30, card: "btn-info" },
    { id:3 ,id_pd: 'A005', Type: '', name: 'Null---', quantity: 0, price: 0,card :"disabled btn-secondary"},
    { id:4 ,id_pd: 'A006', Type: '', name: 'Null---', quantity: 0, price: 0, card: "disabled btn-secondary" },
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
        <div className="">
          <div className="container card border 
          shadow-sm p-2 mb-4 bg-body-tertiary" >
            <div  >
            <div className="row">
              {menu.map((item) => (
                <div className="col m-2" key={item.id}>
                  <div className="" >
                    <div className="row ">
                      <div className="col-lg-12"> 
                      <button
                            type="button"
                            className={`btn btn-primary ${item.card}`}
                            
                            onClick={() => handleAddToCart(item)}
                          >
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="row">
                            <div className="form-group col">
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                value={item.Type}
                                readOnly
                              />
                            </div>
                            <div className="form-group col">
                              
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
                <div className="col m-2" key={item.id}>
                  <div className="" style={{  }}>
                    <div className="row ">
                     
                      <div className="col-lg-12"> 
                      <button
                            type="button"
                            className={`btn btn-primary ${item.card}`}
                            onClick={() => handleAddToCart(item)}
                          >
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="row" >
                            <div className="form-group col" >
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                value={item.Type}
                                readOnly
                              />
                            </div>
                            <div className="form-group col">
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
                <div className="col m-2" key={item.id}>
                  <div className="" style={{  }}>
                    <div className="row ">
                     
                      <div className="col-lg-12"> 
                      <button
                            type="button"
                            className={`btn btn-primary ${item.card}`}
                            onClick={() => handleAddToCart(item)}
                          >
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="row">
                            <div className="form-group col">
                              
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                value={item.Type}
                                readOnly
                              />
                            </div>
                            <div className="form-group col">
                              
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
              {menu6.map((item) => (
                <div className="col m-2" key={item.id}>
                  <div className="" style={{  }}>
                    <div className="row ">
                     
                      <div className="col-lg-12"> 
                      <button
                            type="button"
                            className={`btn btn-primary ${item.card}`}
                            onClick={() => handleAddToCart(item)}
                          >
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="row">
                            <div className="form-group col">
                              
                              <input
                                className="form-control form-control-sm"
                                type="text"
                                value={item.Type}
                                readOnly
                              />
                            </div>
                            <div className="form-group col">
                              
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

