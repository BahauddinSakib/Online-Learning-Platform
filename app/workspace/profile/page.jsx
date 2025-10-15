import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div className='font-bold text-3xl mb-7 '>
          Manage your profile
          <UserProfile />
    </div>
    
  )
}

export default Profile
