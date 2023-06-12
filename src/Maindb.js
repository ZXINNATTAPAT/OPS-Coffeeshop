import './App.css';
import React , {useState ,useEffect} from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Filler,Legend);

export default function Maindb() {

 
  const [cart, setCart] = useState([]);
  const [orderdb,setorderdb] = useState([]);
  const [exData, setexData] = useState([]);
 
  
  

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

  const formatDateString = (dateString) => {
    const dateObj = new Date(dateString);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();
    return `${month} ${day}`;
  };
  
  const groupItemsByDay = (items) => {
    const groups = {};
    orderdb.forEach((item) => {
      const dayStr = formatDateString(item.time);
      if (!groups[dayStr]) {
        groups[dayStr] = { day: dayStr, price: 0 };
      }
      groups[dayStr].price += item.price;
    });
    return Object.values(groups);
  };

  const groupItemsByDay2 = (items) => {
    const groups = {};
    exData.forEach((item) => {
      const dayStr = formatDateString(item.dt);
      if (!groups[dayStr]) {
        groups[dayStr] = { day: dayStr, price: 0 };
      }
      groups[dayStr].price += item.price;
    });
    return Object.values(groups);
  };

  const groupedItems = groupItemsByDay(cart);
const labels = groupedItems.map((group) => group.day);

const groupedItems2 = groupItemsByDay2(exData);
const labels2 = groupedItems2.map((group) => group.day);

const incomeData = groupedItems.map((group) => group.price);
const expensesData = groupedItems2.map((group) => group.price);
const differenceData = incomeData.map((income, index) => income - expensesData[index]);

const differenceData2 = incomeData.map((income, index) => income );
const differenceData3 = expensesData.map((expense, index) => expense );

const uniqueLabels2 = labels2.filter((label) => !labels.includes(label));
const updatedLabels = labels.concat(uniqueLabels2);

const averageProfit = differenceData.reduce((total, profit) => total + profit, 0) / differenceData.length;

const averageIncome = differenceData2.reduce((total, income) => total + income, 0) / differenceData2.length;

const averageexpenses = differenceData3.reduce((total, expenses) => total + expenses, 0) / differenceData2.length;


const startRange = 0; // Index of the starting label
const endRange = orderdb.length; // Index of the ending label (inclusive)

const incomeRangeData = incomeData.slice(startRange, endRange + 1);
const expensesRangeData = expensesData.slice(startRange, endRange + 1);

const totalIncome = incomeRangeData.reduce((total, income) => total + income, 0);
const totalExpenses = expensesRangeData.reduce((total, expense) => total + expense, 0);

const totalProfit = differenceData.reduce((total, profit) => total + profit, 0);



const data = {
  labels: updatedLabels.slice(startRange, endRange + 1),
  datasets: [
    {
      label: 'Income',
      data: incomeData.slice(startRange, endRange + 1),
      borderColor: 'Green',
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      tension: 0.4,
      type: 'line',
    },
    {
      label: 'Expenses',
      data: expensesData.slice(startRange, endRange + 1),
      borderColor: 'Red',
      backgroundColor: 'rgba(255, 99, 132, 0.4)',
      tension: 0.4,
      type: 'line',
    },
    {
      label: 'Profit',
      data: differenceData.slice(startRange, endRange + 1),
      borderColor: 'Blue',
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      tension: 0.4,
      type: 'line',
    },
    {
      label: 'Average Income',
      data: Array(updatedLabels.length).fill(averageIncome),
      borderColor: 'green',
      backgroundColor: 'rgba(54, 162, 235, 0.4)',
      tension: 0.4,
      type: 'line',
    },
    {
      label: 'Average Profit',
      data: Array(updatedLabels.length).fill(averageProfit),
      borderColor: 'Purple',
      backgroundColor: 'rgba(153, 102, 255, 0.4)',
      tension: 0,
      type: 'line',
    },
    {
      label: 'Average Expenses',
      data: Array(updatedLabels.length).fill(averageexpenses),
      borderColor: 'Red',
      backgroundColor: 'rgba(153, 102, 255, 0.4)',
      tension: 0,
      type: 'line',
    },
  ],
};

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quantity',
      },
    },
  };
  
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

      fetch('http://localhost:3001/api/showex')
      .then((response) => response.json())
      .then((data) => {
            setexData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error or display an error message
      });
     
  }, []);

//   

  
  
  return (
    <div style={{height: "100vh"}}>

      
      
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
                <div>
                  <Line data={data} options={options} />
                </div>
            <br/>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="card bg-success text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Profit</h5>
                      <h2 className="card-text">
                        {totalProfit.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-primary text-white">
                    <div className="card-body">
                      <h5 className="card-title">Average Profit</h5>
                      <h2 className="card-text">
                        {averageProfit.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card bg-info text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Income</h5>
                      <h2 className="card-text">
                        {totalIncome.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card bg-danger text-white">
                    <div className="card-body">
                      <h5 className="card-title">Total Expenses</h5>
                      <h2 className="card-text">
                        {totalExpenses.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <br />
            
           

          </div>

        </div>
    </div>
  );
}
