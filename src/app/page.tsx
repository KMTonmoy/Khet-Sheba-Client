import ContactForm from '@/components/ContactForm'
import Hero from '@/components/Hero'
import LatestUpdates from '@/components/LatestUpdates'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import USP from '@/components/USP'
import Weather from '@/components/Wather'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Services/>
      <USP/>
      <LatestUpdates/>
      <Testimonials/>
      <ContactForm/>
      <Weather/>
    </div>
  )
}

export default page