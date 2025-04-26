import * as React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Typography, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Timelines=()=>{
  const steps = [
    {
      title: 'Order Placed',
      description: 'Order was submitted by John Doe',
      date: 'April 15, 2023',
      time: '10:30 AM',
      icon: <ShoppingCartIcon />,
      color: 'primary',
    },
    {
      title: 'Approved by Kalyan',
      description: 'Order was approved for processing',
      date: 'April 15, 2023',
      time: '2:45 PM',
      icon: <CheckCircleIcon />,
      color: 'success',
    },
    {
      title: 'Approved by Tanush',
      description: 'Final approval granted',
      date: 'April 16, 2023',
      time: '9:15 AM',
      icon: <CheckCircleIcon />,
      color: 'success',
    },
    {
      title: 'Processing by Vendor',
      description: 'Order is being processed by TechSupplies Inc.',
      date: 'April 16, 2023',
      time: '11:30 AM',
      icon: <MoveToInboxIcon />,
      color: 'primary',
    },
    {
      title: 'Shipped',
      description: 'Package has been shipped via Express Delivery',
      date: 'April 17, 2023',
      time: '3:20 PM',
      icon: <LocalShippingIcon />,
      color: 'info',
    },
    {
      title: 'In Transit',
      description: 'Package is on its way to the delivery address',
      date: 'April 18, 2023',
      time: '10:45 AM',
      icon: <LocalShippingIcon />,
      color: 'info',
    },
    {
      title: 'Delivery',
      description: 'Package will be delivered to the address',
      date: '',
      time: '',
      icon: <AccessTimeIcon />,
      color: 'grey',
    },
  ];

  return ( 
    <div className='flex justify-start w-full h-full p-4'>
    <Timeline position="right" sx={{ padding: 0, width: '100%', margin: 0, backgroundColor: 'transparent'}}>
      {steps.map((step, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot color={step.color}>{step.icon}</TimelineDot>
            {index !== steps.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography fontWeight="bold">{step.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {step.description}
            </Typography>
            {step.date && (
              <Typography variant="caption" color="text.secondary">
                {step.date} • {step.time}
              </Typography>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
    </div>
  );
}

export default Timelines;
