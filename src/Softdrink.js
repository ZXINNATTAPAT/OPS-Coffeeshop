import React , {useState} from 'react'

export default function Softdrink() {

  const menu= [
    { id:0 ,id_pd: 'B001', Type: 'Ice', name: 'Coke', quantity: 1, price: 25 ,card :"btn btn-danger"},
    { id:1 ,id_pd: 'B002', Type: 'Ice', name: 'Fanta Red', quantity: 1, price: 25 ,card :"btn btn-danger"},
    { id:2 ,id_pd: 'B003', Type: 'Ice', name: 'Fanta O', quantity: 1, price: 25, card: "btn color" },
    { id:3 ,id_pd: 'B004', Type: 'Ice', name: 'Fanta Green', quantity: 1, price: 25, card: "btn btn-success" },
    { id:4 ,id_pd: 'B005', Type: 'Ice', name: 'OISHI', quantity: 1, price: 25, card: "btn btn-success" },
  ];
  const menu2= [
    { id:0 ,id_pd: 'B006', Type: 'Ice', name: 'water', quantity: 1, price: 10, card: "btn btn-primary" },
    { id:1 ,id_pd: 'B007', Type: 'Ice', name: 'Est', quantity: 1, price: 25, card: "btn btn-primary" },
    { id:2 ,id_pd: 'B008', Type: 'Ice', name: 'SPRITE', quantity: 1, price: 25, card: "btn btn-primary" },
    { id:3 ,id_pd: 'B009', Type: 'Ice', name: 'Null', quantity: 1, price: 25, card: "disabled btn btn-primary" },
    { id:4 ,id_pd: 'B009', Type: 'Ice', name: 'Null', quantity: 1, price: 25, card: " disabled btn btn-primary" },
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
      window.location.reload(true)
      console.log(orders)
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    });
  };


  return (
    <div className="col-9">
    <div className="container 
    card border shadow-sm p-4 mb-6 bg-body-tertiary rounded" style={{height:"635px"}}>
      <div className="fixsize" >
      <div className="row">
        {menu.map((item) => (
          <div className="col" key={item.id}>
            <div className="card" style={{ height: '125px' }}>
              <div className="row ">
               
                <div className="col">
                  <button
                      type="button"
                       className={` ${item.card}`}
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
                    
                    
                  </div> 
                  <br />
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
              <div className="row ">
               
                <div className="col">
                  <button
                      type="button"
                       className={` ${item.card}`}
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
                    
                   
                  </div>
                  <br />
                  </button>
                </div>
              </div>
            </div>
          </div>
            ))}
        </div>
        <br/>
     

      </div>
    </div>  
    <div>





</div>
  </div>
  )
}
