import './App.css';
import React , {useState ,useEffect} from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,
} from 'chart.js';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Coffeepage from './Coffeepage';
import Softdrink from './Softdrink';
import Teapage from './Teapage';
import Special from './Special';
import Dashmain from './Dashboards/Dashmain';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend);

export default function App() {

  const [inputState, setinputState] = useState("");
  const [cart, setCart] = useState([]);
  const [orderdb,setorderdb] = useState([]);
  
 
  const cart2 = [];
  

  const [desiredDates, setDesiredDates] = useState([]);

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setDesiredDates([formattedDate]);
    } else {
      setDesiredDates([]);
    }
  };

  function calnum() {
    const selectedOrders = orderdb.filter((order) => {
      const orderDate = new Date(order.time).toLocaleDateString(); // Extracting the date from the order's time
      return desiredDates.includes(orderDate);
    });
  
    const sum = selectedOrders.reduce((total, order) => total + order.price, 0);
  
    return sum;
  }
  function count() {
    const selectedOrders = orderdb.filter((order) => {
      const orderDate = new Date(order.time).toLocaleDateString(); // Extracting the date from the order's time
      return desiredDates.includes(orderDate);
    });
  
    const sum = selectedOrders.reduce((total, order) => total + order.quantity, 0);
  
    return sum;
  }

  
  
  
  





  useEffect(() => {
    fetch('http://localhost:3001/api/showcart')
      .then(response => response.json())
      .then(data => {
        setCart(data);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });

    fetch('http://localhost:3001/api/showorderdb')
      .then(response => response.json())
      .then(data => {
        setorderdb(data);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });

     
  }, []);

  const handleSubmitCart = () => {
    // Make sure the cart has the necessary properties and remove any null values
    for (let i= 0; i< cart.length; i++) {
      cart2.push(cart[i]);
    }
    
    for (let i= 0; i< cart.length; i++) {
      
    console.log(cart2)
    fetch('http://localhost:3001/api/order_db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart2[i]),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cart submitted successfully:', data);
        // Handle the response data as needed
        window.location.reload(true)
        setCart([])
      })
      .catch((error) => {
        console.error('Error submitting cart:', error);
      });
    }
    
    fetch('http://localhost:3001/api/cartdelete', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          console.log('All data deleted from cart');
        } else {
          throw new Error('Error deleting cart');
        }
      })
      .catch(error => {
        console.error('Error deleting cart:', error);
      });
  };

  const handlefixCart = ()=>{
    fetch('http://localhost:3001/api/cartdelete', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          console.log('All data deleted from cart');
          setCart([])
          window.location.reload(true)
        } else {
          throw new Error('Error deleting cart');
        }
      })
      .catch(error => {
        console.error('Error deleting cart:', error);
      });
  }
  
  return (
    <div style={{height: "200vh"}}>

      <div className="container-fluid blockone">
        <br></br>
       
      <div className="row"> 
        <div className="col-1">

          <h1 className='text-center' >OPS</h1>
          <br />

          <div className="container">
              <div className="col">
                <div >
                  <form className="form" >
                  <div class="d-grid gap-4 col mx-auto">
                      
                                <button type="button" className="btn btn-primary " 
                                  value={inputState} 
                                  onClick={() => {
                                    const selectedinput = "1";
                                    setinputState(selectedinput);
                                  }}>
                                    Coffee</button>
                              
                                <button type="button" className="btn btn-primary " 
                                value={inputState} 
                                onClick={() => {
                                  const selectedinput = "2";
                                  setinputState(selectedinput);
                                }}>
                                  Softdrink</button>
                            
                        
                                <button type="button" className="btn btn-primary "
                                value={inputState} 
                                onClick={() => {
                                  const selectedinput = "3";
                                  setinputState(selectedinput);
                                }}>
                                  Tea</button>

                                <button type="button" className="btn btn-primary "
                                value={inputState} 
                                onClick={() => {
                                  const selectedinput = "4";
                                  setinputState(selectedinput);
                                }}>
                                  Special</button>

                                <button type="button" className="btn btn-primary "
                                value={inputState} 
                                onClick={() => {
                                  const selectedinput = "5";
                                  setinputState(selectedinput);
                                }}>
                                  DB</button>

                                </div>
                        </form>
                      </div>
                    </div>
                </div> 
              </div>  

        
      {(() => {
        switch(inputState) {
          case '1':
            return(<Coffeepage />)
          case '2':
            return(<Softdrink />)
          case '3':
            return(<Teapage />)
          case '4':
            return(<Special />)
          case '5':
            return(<Dashmain />)
          default:
            return(<Coffeepage />)
        }
      })()}

        <div className="col-2">
         
            <div className='card border 
          shadow-sm p-3 mb-5 rounded' style={{height:"400px" , overflow: "auto"}}>
            <div className='card-body'>
              <h3 className='card-title' >Cart</h3>
                <table className="table card-text" style={{fontSize :"14px"}}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((order) => (
                      <tr key={order.id}>
                        <td>{order.name}</td>
                        <td>{order.Type}</td>
                        <td>{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table></div>
              
              
            </div>

            <div className='row'>
              <div className="col ">
                    <button className="btn btn-primary" onClick={handleSubmitCart}>Add</button>
              </div>
              <div className="col ">
                    <button className="btn btn-primary" onClick={handlefixCart}>Cancel</button>
              </div>
              <div className="col">
                  
              </div>
              
            </div>
              
            </div>
      </div>

      </div>
      
        <div className='container-fluid blockone'>
          <div className='container'>

            <br />
            <div className='row'>
               <div className='col'>
               <h1>Order table</h1> <br />
            <div className='card border shadow-sm p-3 mb-5  rounded' style={{height:"450px" , overflow: "auto"}}>
              <div className='mb-3'>
                <label htmlFor="desiredDates">Desired Dates:</label>
                  <DatePicker
                    id="desiredDates"
                    className="form-control"
                    selected={desiredDates.length > 0 ? new Date(desiredDates[0]) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <table className="table">
                  <thead style={{ backgroundColor: "whitesmoke" }}>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderdb.map((order) => {
                      const orderDate = new Date(order.time).toLocaleDateString(); 
                      // Extracting the date from the order's time
                      if (desiredDates.includes(orderDate)) {
                        return (
                            <tr key={order.id}>
                              <td>{order.name}</td>
                              <td>{order.Type}</td>
                              <td>{order.quantity}</td>
                              <td>{order.price}</td>
                              <td>{new Date(order.time).toLocaleString()}</td> 
                              
                            </tr>
                        );
                      }
                      return null; 
                      // Skip rendering if the date doesn't match the desired date
                    })}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Income :</td>
                      <td >{calnum().toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</td>
                      <td></td>
                      
                    </tr>
                  </tbody>
                </table>
            </div>
            </div>
            <div className='col'>
              <h1>list summary</h1> <br />
            <div className='card border shadow-sm p-3 mb-5  rounded' style={{height:"450px" , overflow: "auto"}}>
              <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">Date M/D/Y: </h5>
                        <h2 className="card-text">
                          {desiredDates}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">Total order</h5>
                        <h2 className="card-text">
                          {count()}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">Total income</h5>
                        <h2 className="card-text">
                          {calnum().toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                        </h2>
                      </div>
                    </div>
                  </div>
                  </div>
            </div>

            </div>
           
             
            </div>
              <br />
              {/* Chart */}
               
            


            <br />
            
           

          </div>

        </div>
    </div>
  );
}
