import React from 'react'

export const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,about,age,gender} = user
  console.log('age',age)
  console.log('gender',gender)

  return (
<div className="card bg-base-200 w-96 shadow-sm">
  <figure className=''>
    <img
        className=" h-64 object-cover my-10 "
      src={user?.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body my-4">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <span>{ age}</span>
    <span>{gender}</span>
    <span>{about}</span>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}
