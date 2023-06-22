import './App.css';
import React , {useState ,useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Tableorder() {

  const [orderdb,setorderdb] = useState([]);
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
    

    fetch('http://localhost:3001/api/showorderdb')
      .then(response => response.json())
      .then(data => {
        setorderdb(data);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      });

      
     
  }, []);

//   

  
  
  return (
    <div className="col-9">
        <div>
          <div className='container card border shadow-sm p-4 mb-6 bg-body-tertiary rounded' style={{height:"635px"}}> 
            <br />
            <div className='row'>
               <div className='col'>
               <h3>Order table</h3> <br />
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
              <h3>list summary</h3> <br />
            <div className=' p-3 mb-5  rounded' style={{height:"450px" , overflow: "auto"}}>
              <div className="row g-4">
                  <div className="col-md-6">
                    <div className="card bg-primary text-white">
                      <div className="card-body">
                        <h5 className="card-title">Date M/D/Y: </h5>
                        <h2 className="card-text">
                          .{desiredDates}
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
             
            
           

          </div>

        </div>
    </div>
  );
}
