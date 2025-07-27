import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  redirect('/cos-assignment')
  
  return (
    <div>page</div>
  )
}

export default page