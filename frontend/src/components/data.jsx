import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button, Form } from 'react-bootstrap';


const initialData = [
  { name: '00:00', product1: 1000, product2: 2400, product3: 1500 },
  { name: '01:00', product1: 2000, product2: 1398, product3: 3000 },
  { name: '02:00', product1: 1500, product2: 3000, product3: 1800 },
  { name: '03:00', product1: 2800, product2: 2000, product3: 2500 },
  { name: '04:00', product1: 4000, product2: 2800, product3: 3000 },
  { name: '05:00', product1: 3000, product2: 1398, product3: 4000 },
  { name: '06:00', product1: 2500, product2: 4000, product3: 3500 },
  { name: '07:00', product1: 1000, product2: 2400, product3: 1500 },
  { name: '01:00', product1: 2000, product2: 1398, product3: 3000 },
  { name: '02:00', product1: 1500, product2: 3000, product3: 1800 },
  { name: '03:00', product1: 2800, product2: 2000, product3: 2500 },
  { name: '04:00', product1: 4000, product2: 2800, product3: 3000 },
  { name: '05:00', product1: 3000, product2: 1398, product3: 4000 },
  { name: '06:00', product1: 2500, product2: 4000, product3: 3500 },
  { name: '00:00', product1: 1000, product2: 2400, product3: 1500 },
  { name: '01:00', product1: 2000, product2: 1398, product3: 3000 },
  { name: '02:00', product1: 1500, product2: 3000, product3: 1800 },
  { name: '03:00', product1: 2800, product2: 2000, product3: 2500 },
  { name: '04:00', product1: 4000, product2: 2800, product3: 3000 },
  { name: '05:00', product1: 3000, product2: 1398, product3: 4000 },
  { name: '06:00', product1: 2500, product2: 4000, product3: 3500 },
  { name: '00:00', product1: 1000, product2: 2400, product3: 1500 },
  { name: '01:00', product1: 2000, product2: 1398, product3: 3000 },
  { name: '02:00', product1: 1500, product2: 3000, product3: 1800 },
  { name: '03:00', product1: 2800, product2: 2000, product3: 2500 },
  { name: '04:00', product1: 4000, product2: 2800, product3: 3000 },
  { name: '05:00', product1: 3000, product2: 1398, product3: 4000 },
  { name: '06:00', product1: 2500, product2: 4000, product3: 3500 },

 
];

const DataChart = () => {
 
  const [data, setData] = useState(initialData);
  const [timeInterval, setTimeInterval] = useState('hourly');


  const handleButtonClick = () => {
   
    setData(data.slice().reverse());
  };

 
  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);

    switch (event.target.value) {
      case 'hourly':
        setData(initialData);
        break;
      case 'daily':
        const dailyData = groupDataByDay(initialData);
        setData(dailyData);
        break;
      case 'monthly':
        const monthlyData = groupDataByMonth(initialData);
        setData(monthlyData);
        break;
      default:
        setData(initialData);
    }
  };

 
  const groupDataByDay = (data) => {

    return data.reduce((acc, current) => {
      const date = new Date(current.name);
      const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (!acc[day]) {
        acc[day] = { name: day };
      }
    
      acc[day].product1 = (acc[day].product1 || 0) + current.product1;
      acc[day].product2 = (acc[day].product2 || 0) + current.product2;
      acc[day].product3 = (acc[day].product3 || 0) + current.product3;
      return acc;
    }, {});
  };


  const groupDataByMonth = (data) => {

    return data.reduce((acc, current) => {
      const date = new Date(current.name);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[month]) {
        acc[month] = { name: month };
      }
    
      acc[month].product1 = (acc[month].product1 || 0) + current.product1;
      acc[month].product2 = (acc[month].product2 || 0) + current.product2;
      acc[month].product3 = (acc[month].product3 || 0) + current.product3;
      return acc;
    }, {});
  };

  return (
    <div className="DataChart">

      <Form.Group controlId="timeIntervalControl">
        <Form.Label>Interwał czasowy:</Form.Label>
        <Form.Control as="select" value={timeInterval} onChange={handleTimeIntervalChange}>
          <option value="hourly">Godzinny</option>
          <option value="daily">Dzienny</option>
          <option value="monthly">Miesięczny</option>
        </Form.Control>
      </Form.Group>

   
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={Object.values(data)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="product1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="product2" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="product3" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>

      
      <Button onClick={handleButtonClick}>Odwróć kolejność danych</Button>
    </div>
  );
};

export default DataChart;
