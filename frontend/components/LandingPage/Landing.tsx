import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Contests from './Contests'
import Footer from './Footer'
import { FAQs } from './FAQs'

function Landing() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Contests/>
        <FAQs/>
        <Footer/>
    </div>
  )
}

export default Landing