import React , {useState ,useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Dashmain() {
    const [tableData, setTableData] = useState([]);
    const [selectedDate , setSelectedDate] = useState()
    const [formData, setFormData] = useState({
        id_pd: '',
        Name_pd: '',
        price: '',
        quantity: '',
      });
    const [sum, setSum] = useState(0);


      const handleDateChange = (date) => {
        setSelectedDate(date);
      };
      
      
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

      useEffect(() => {
        fetch('http://localhost:3001/api/showex')
          .then((response) => response.json())
          .then((data) => {
            let filteredData = data;
            if (selectedDate) {
              const selectedDateOnly = new Date(selectedDate).setHours(0, 0, 0, 0);
              filteredData = data.filter((row) => {
                const rowDate = new Date(row.dt).setHours(0, 0, 0, 0);
                return rowDate === selectedDateOnly;
              });
            }
      
            setTableData(filteredData);
      
            let total = 0;
            filteredData.forEach((row) => {
              const price = row.price;
              const quantity = row.quantity;
              const totalPrice = price * quantity;
              total += totalPrice;
            });
            setSum(total);
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error or display an error message
          });
      }, [selectedDate]);
      const handleSubmit = (event) => {
        event.preventDefault();
        setFormData({
            id_pd: '',
            Name_pd: '',
            price: '',
            quantity: '',
          });
    
        fetch('http://localhost:3001/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            
            // Handle the result or update the UI as needed
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle the error or display an error message
          });
      };
  return (
    <div className="col-9">
          <div className="container card border 
          shadow-sm p-3 mb-5 bg-body-tertiary rounded" style={{height:"650px" , overflow: "hidden auto"}}>
            <br />

            <h2>Insert Expenses</h2>
    
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id_pd" className="form-label">
                        ID:
                        </label>
                        <input
                        type="text"
                        id="id_pd"
                        name="id_pd"
                        value={formData.id_pd}
                        onChange={handleChange}
                        className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name_pd" className="form-label">
                        Name:
                        </label>
                        <input
                        type="text"
                        id="Name_pd"
                        name="Name_pd"
                        value={formData.Name_pd}
                        onChange={handleChange}
                        className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                        Price:
                        </label>
                        <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                        Quantity:
                        </label>
                        <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="form-control"
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br />
            <div className="mb-3">
                <label htmlFor="datePicker" className="form-label">
                    Select Date:
                </label>
                <DatePicker
                    id="datePicker"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                />
                </div>
            <div className='card' style={{ height: "240px", overflow: "auto" }}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData
                        .filter((row) => {
                            if (!selectedDate) {
                            return true; // No date selected, show all rows
                            }
                            const rowDate = new Date(row.dt).setHours(0, 0, 0, 0); 
                            const selectedDateOnly = new Date(selectedDate).setHours(0, 0, 0, 0); 
                            return rowDate === selectedDateOnly;
                        })
                        .map((row) => {
                            return (
                            <tr key={row.id}>
                                <td>{row.Name_pd}</td>
                                <td>{row.price}</td>
                                <td>{row.quantity}</td>
                                <td>{new Date(row.dt).toLocaleDateString()}</td>
                            </tr>
                            );
                        })}
                        <tr>
                            <td></td>
                            <td>expenses all  :{sum.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

               

            
    </div>
    </div>
        
    
  )
}
