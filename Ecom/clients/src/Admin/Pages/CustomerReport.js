import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

const CustomerReport = () => {
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    const fetchCustomerReport = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/report/customer-report`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer report:', error);
      }
    };

    fetchCustomerReport();
  }, []);

  return (
    <div className="col-lg-11.5 grid-margin card shadow-lg" style={{ margin: "2.5%", height: "fit-content" }}>
      <h2>Customer Report</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* Bar Chart */}
        <div className='card' style={{ margin: "2.5%", height: "400px", width: "45%" }}>
          <h4>Total Orders per Customer (Bar Chart)</h4>
          <Bar
            data={{
              labels: customerData.map(customer => `${customer.firstName} ${customer.lastName}`),
              datasets: [
                {
                  label: 'Total Orders',
                  data: customerData.map(customer => customer.totalOrders),
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }
              ]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>

        {/* Pie Chart */}
        <div className='card' style={{ margin: "2.5%", height: "35%", width: "35%" }}>
          <h4>Orders Distribution (Pie Chart)</h4>
          <Pie
            data={{
              labels: customerData.map(customer => `${customer.firstName} ${customer.lastName}`),
              datasets: [
                {
                  label: 'Orders',
                  data: customerData.map(customer => customer.totalOrders),
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;
