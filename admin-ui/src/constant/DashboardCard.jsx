import React from 'react';
import { BookMarked, SquareUserRound, Headset, BarChart } from 'lucide-react';
import { useState, useEffect } from "react";
import axios from 'axios';

const API_URLS = [
  `${process.env.REACT_APP_API_BASE_URL}/blogs/getcounts`,      
  `${process.env.REACT_APP_API_BASE_URL}/api/contact/getcounts`,     
  `${process.env.REACT_APP_API_BASE_URL}/consulation/getcounts`, 
  `${process.env.REACT_APP_API_BASE_URL}/category/getcounts`
];

const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState([
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 }
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all(API_URLS.map(url => axios.get(url)));
        const newValues = responses.map(response => response.data?.data || 0);
        
        setDashboardData(prevData => prevData.map((item, index) => ({
          value: newValues[index]
        })));
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return dashboardData;
};

export const DashboardCards = () => {
  const dashboardValues = useDashboardData();

  const calculateProgress = (value) => {
    // Start with 5% minimum progress
    const baseProgress = 5;
    // Calculate additional progress based on value
    const additionalProgress = value > 0 ? Math.min(95, (value / 100) * 95) : 0;
    return baseProgress + additionalProgress;
  };

  return [
    {
      icon: BookMarked,
      title: "Blogs",
      value: dashboardValues[0]?.value || "0",
      color: "bg-blue-600",
      progress: calculateProgress(dashboardValues[0]?.value || 0)
    },
    {
      icon: SquareUserRound,
      title: "Contacts",
      value: dashboardValues[1]?.value || "0",
      color: "bg-orange-500",
      progress: calculateProgress(dashboardValues[1]?.value || 0)
    },
    {
      icon: Headset,
      title: "Consultations",
      value: dashboardValues[2]?.value || "0",
      color: "bg-green-500",
      progress: calculateProgress(dashboardValues[2]?.value || 0)
    },
    {
      icon: BarChart,
      title: "Categories",
      value: dashboardValues[3]?.value || "0",
      color: "bg-red-500",
      progress: calculateProgress(dashboardValues[3]?.value || 0)
    }
  ];
};