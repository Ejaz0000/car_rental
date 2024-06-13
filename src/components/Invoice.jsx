import React, { useEffect } from 'react'
import TotalSummery from './TotalSummery'

const Invoice = ({reservationInfo}) => {

   

  return (
    <div className='flex flex-col px-[200px] py-[150px] items-center'>
        <div className='text-center'>
            <h1 className='text-4xl font-semibold text-[#4D869C]'>INVOICE</h1>
            <p>Reservation ID: {reservationInfo.id}</p>
            <p>Reservation Time: {reservationInfo.currentDate.toString().substr(0,24)}</p>
        </div>
        <div className='w-full mt-[50px]'>
            <p><span className='font-bold'>Pickup Date & Time:</span> {reservationInfo.pickupDate.toString().substr(0,24)}</p>
            <p><span className='font-bold'>Return Date & Time:</span> {reservationInfo.returnDate.toString().substr(0,24)}</p>
        </div>
        <div className='flex w-full mt-[50px] justify-start gap-[200px]'>
            <div>
                <h2 className='text-xl font-bold'>Personal Info</h2>
                <p><span className='font-bold'>Name:</span> {reservationInfo.name}</p>
                <p><span className='font-bold'>Email:</span> {reservationInfo.email}</p>
                <p><span className='font-bold'>Phone:</span> {reservationInfo.phone}</p>
            </div>
            <div>
                <h2 className='text-xl font-bold'>Vehicle Info</h2>
                <p><span className='font-bold'>Type:</span> {reservationInfo.vehicle.type}</p>
                <p><span className='font-bold'>Model:</span> {reservationInfo.vehicle.model}</p>
                <p><span className='font-bold'>Seat:</span> {reservationInfo.vehicle.seats}</p>
            </div>
            
        </div>
        <div className='w-full'>
         <TotalSummery timelyCharges={reservationInfo.timelyCharges} checkboxes={reservationInfo.checkboxes} discount={reservationInfo.validCode}/>
        </div>
    </div>
  )
}

export default Invoice