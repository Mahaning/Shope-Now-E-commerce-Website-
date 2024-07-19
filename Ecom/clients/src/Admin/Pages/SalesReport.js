import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Tabs, Tab, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesReport = () => {
  const [salesData, setSalesData] = useState({});
  const [chartType, setChartType] = useState('line');
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/report/sales-report`);
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales report:', error);
      }
    };

    fetchSalesReport();
  }, []);

  const renderChart = (data, label) => {
    const ChartComponent = chartType === 'bar' ? Bar : chartType === 'pie' ? Pie : Line;

    return (
      <ChartComponent
        data={{
          labels: data.map(item => item.label),
          datasets: [
            {
              label,
              data: data.map(item => item.value),
              backgroundColor: chartType === 'pie' ? [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
              ] : 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        }}
        options={{
          scales: chartType !== 'pie' ? {
            y: {
              beginAtZero: true
            }
          } : {}
        }}
        height={200} // Adjust height as needed
      />
    );
  };

  return (
    <div>
      <h2>Sales Report</h2>

      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Chart Type</InputLabel>
        <Select value={chartType} onChange={(e) => setChartType(e.target.value)} label="Chart Type">
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="pie">Pie</MenuItem>
          <MenuItem value="line">Line</MenuItem>
        </Select>
      </FormControl>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} aria-label="sales report tabs">
        <Tab label="Total Sales" />
        <Tab label="Product Sales" />
        <Tab label="Sales per Category" />
        <Tab label="Monthly Sales" />
      </Tabs>

      <Box>
        {tabIndex === 0 && (
          <div className="chart-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
            <div className="chart-item" style={{ flex: '1 1 calc(50% - 20px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3>Total Sales per Product</h3>
              {salesData.salesPerProduct && renderChart(
                salesData.salesPerProduct.map(item => ({ label: item.productName, value: item.totalSales })),
                'Total Sales per Product'
              )}
            </div>
            <div className="chart-item" style={{ flex: '1 1 calc(50% - 20px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3>Total Sales per Category</h3>
              {salesData.salesPerCategory && renderChart(
                salesData.salesPerCategory.map(item => ({ label: item.categoryName, value: item.totalSales })),
                'Total Sales per Category'
              )}
            </div>
          </div>
        )}

        {tabIndex === 1 && (
          <div className="chart-container" style={{ display: '', flexWrap: 'wrap', gap: '20px', marginTop: '20px', height:"50%",width:"60%"}}>
            <div className="chart-item" style={{ flex: '1 1 100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3>Product Sales</h3>
              {salesData.salesPerProduct && renderChart(
                salesData.salesPerProduct.map(item => ({ label: item.productName, value: item.totalSales })),
                'Product Sales'
              )}
            </div>
          </div>
        )}

        {tabIndex === 2 && (
          <div className="chart-container" style={{ display: '', flexWrap: 'wrap', gap: '20px', marginTop: '20px',height:"50%",width:"60%"}}>
            <div className="chart-item" style={{ flex: '1 1 100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3>Sales per Category</h3>
              {salesData.salesPerCategory && renderChart(
                salesData.salesPerCategory.map(item => ({ label: item.categoryName, value: item.totalSales })),
                'Sales per Category'
              )}
            </div>
          </div>
        )}

        {tabIndex === 3 && (
          <div className="chart-container" style={{ display: '', flexWrap: 'wrap', gap: '20px', marginTop: '20px',height:"50%",width:"50%" }}>
            <div className="chart-item" style={{ flex: '1 1 100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
              <h3>Monthly Sales</h3>
              {salesData.monthlySales && renderChart(
                salesData.monthlySales.map(item => ({ label: `Month ${item._id.month}, ${item._id.year}`, value: item.totalSales })),
                'Monthly Sales'
              )}
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SalesReport;
