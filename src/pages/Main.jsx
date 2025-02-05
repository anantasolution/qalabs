import React from 'react'

import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import FeatureProduct from '../components/FeatureProduct'


function Main() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <FeatureProduct></FeatureProduct>
      <Footer></Footer>
    </>
  )
}

export default Main