import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { generateRandnum } from '../features/generateRandnum';
import { CalculateDuration } from '../features/calculateDuration';
import TotalSummery from '../components/TotalSummery';
import Invoice from '../components/Invoice';

const InvoiceGenerator = () => {
    const location = useLocation();
    const car = location.state;
    const dis_code="123ef";
    const [button,setButton]= useState("Confirm Reservation")
    const [reservationInfo, setReservationInfo] = useState(null);
    const [showInvoice, setshowInvoice]=useState(false)
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [randNum, setRandNum] = useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setphone]=useState("");
    const [checkboxes,setcheckboxes]=  useState([])
    const [timelyCharges,setTimelyCharges]=  useState([])
    const [validCode, setValidCode]=useState(false)

    useEffect(() => {
      setRandNum(generateRandnum());
    }, []);

    useEffect(()=>{
      if(showInvoice){
      window.print()
      }
     },[showInvoice])

    useEffect(() => {
      setTimelyCharges([]);
      if (pickupDate && returnDate) {
        let duration = CalculateDuration(pickupDate, returnDate)
        if (duration.hour > 0){
          setTimelyCharges(prev=> [...prev,{charge:'Hourly',unit:duration.hour, rate:car.rates.hourly}])
        } 
        if (duration.day > 0){
          setTimelyCharges(prev=> [...prev,{charge:'Daily',unit:duration.day, rate:car.rates.daily}])
        } 
        if (duration.week > 0){
          setTimelyCharges(prev=> [...prev,{charge:'Weekly',unit:duration.week, rate:car.rates.weekly}])
        } 

      }
    }, [pickupDate,returnDate]);

    const calculateDuration = () => {
      if (pickupDate && returnDate) {
        let duration = CalculateDuration(pickupDate, returnDate)
        let durationStr = '';
        if (duration.week > 0) durationStr += `${duration.week} weeks `;
        if (duration.day > 0) durationStr += `${duration.day} days `;
        if (duration.hour > 0) durationStr += `${duration.hour} hours`;
        return durationStr;
      }
      return '';
    };

    function handleCheckbox(e){
        const {checked,name,value} = e.target;
        
            if(checked === true){
              setcheckboxes(prev=> [...prev,{charge:name,rate:value}])
            }else{
              setcheckboxes(checkboxes.filter(item => item.charge!==name))
            }

        
        
    }

    function checkDiscountCode(code){
      if(code===dis_code){
        setValidCode(true)
      }else{
        setValidCode(false)
      }
    }

   

    function submitInfo(){

      if(button ==="Confirm Reservation"){
        const d = new Date();
        setReservationInfo({
         id: randNum, 
         currentDate: d,
         name: firstName+" "+lastName,
         email: email,
         phone: phone,
         pickupDate: pickupDate,
         returnDate: returnDate,
         vehicle: car,
         timelyCharges: timelyCharges,
         checkboxes: checkboxes,
         validCode: validCode
        })
  
        setButton("Print Invoice")
      }else{
        setshowInvoice(true)
       
      }
      
    }
     
    

  return (
    <>
    
    { !showInvoice? <div className='flex flex-col items-start px-[100px]'>
        <div className=' w-full mt-[100px] flex items-center justify-between'>
         <h2 className='text-4xl font-semibold text-[#4D869C]'>Reservation</h2>
         <div className='bg-[#4D869C] flex justify-center py-2 px-3 rounded-md mt-3'>
            <Link className='text-[#CDE8E5] text-lg font-semibold' to="/">Go back to home</Link>
        </div>
        </div>

        <div className='mt-[100px] w-full border-2 border-[#CDE8E5] rounded-lg px-8 py-5'>
        <h3 className='text-2xl font-semibold text-[#4D869C]'>Vehicle Information</h3>
        <div className="flex mt-4 justify-start gap-3">
        <div className='py-[20px] border-2 rounded-lg'>
            <img className='h-[150px]' src={car.imageURL} />
        </div>
        <div>
        <h2 className='text-[#4D869C] text-xl font-semibold'>{car.make} <span>{car.model}</span> <span className='text-[#7AB2B2]'>({car.year})</span></h2>
            <p className='text-[#4D869C] text-lg font-semibold'>Type: {car.type}</p>
            <p className='text-[#4D869C] text-lg font-semibold'>Seats: {car.seats}</p>
            <div className='flex gap-8'>
            <p className='text-[#4D869C] text-lg font-semibold'>Feature: </p>
            <div>
            <ul className="list-disc">
              {car.features.map((feature, index) => (
                <li key={index} className='text-[#4D869C] text-md'>{feature}</li>
              ))}
            </ul>
            </div>

            </div>
            <div className='mt-[20px] flex gap-8'>
            <p className='text-[#4D869C] text-lg font-semibold'>Rates: </p>
            <p className='text-[#4D869C] text-lg font-semibold'>{car.rates.hourly}$ per hour</p>
            <p className='text-[#4D869C] text-lg font-semibold'>{car.rates.daily}$ per day</p>
            <p className='text-[#4D869C] text-lg font-semibold'>{car.rates.weekly}$ per week</p>
            </div>

        </div>
        </div>
        </div>

        <div className="my-10 grid grid-cols-3">
          <form className='flex flex-wrap gap-10 col-span-2'>
            <div>
              <h2 className='text-2xl font-semibold text-[#4D869C] border-b-2'>Reserveation Details</h2>
              <div className="border-2 rounded-lg mt-4 p-4">
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Reservation ID</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" name="" value={randNum}/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Pickup Date*</p>
              <input type='datetime-local' className="w-full px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" onChange={(e)=> setPickupDate(new Date(e.target.value))}  required/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Return Date*</p>
              <input type='datetime-local' className="w-full px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" onChange={(e)=> setReturnDate(new Date(e.target.value))}  required/>
              </div>
              <div className="mt-5 flex items-center justify-between">
              <p className='text-[#0e0202] text-md mb-1'>Duration</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2 w-[200px]" value={calculateDuration()} required/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Discount</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" name="" onChange={(e)=> checkDiscountCode(e.target.value)} required/>
              </div>
              </div>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-[#4D869C] border-b-2'>Customer Information</h2>
              <div className="border-2 rounded-lg mt-4 p-4">
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>First Name*</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={firstName} onChange={(e)=> setFirstName(e.target.value)} required/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Last Name*</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={lastName} onChange={(e)=> setlastName(e.target.value)} required/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Email*</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
              </div>
              <div className="mt-4">
              <p className='text-[#0e0202] text-md mb-1'>Phone*</p>
              <input type='text' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={phone} onChange={(e)=> setphone(e.target.value)} required/>
              </div>
              </div>
            </div>

            <div>
              <h2 className='text-2xl font-semibold text-[#4D869C] border-b-2'>Additional Charges</h2>
              <div className="border-2 rounded-lg mt-4 p-4">
              <div className="mt-4 flex items-center justify-between gap-12">
              <div className='flex items-center gap-4'>
              <input type='checkbox' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={9} name="Collision Damage Waiver" onChange={handleCheckbox}/>
              <p className='text-[#0e0202] text-md mb-1'>Collision Damage Waiver</p>
              </div>
              <p className='text-[#0e0202] text-md mb-1'>$9.00</p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-12">
              <div className='flex items-center gap-4'>
              <input type='checkbox' className="px-2 py-1 rounded-lg text-[16px] bg-transparent border-2" value={15} name="Liability Insurance" onChange={handleCheckbox}/>
              <p className='text-[#0e0202] text-md mb-1'>Liability Insurance</p>
              </div>
              <p className='text-[#0e0202] text-md mb-1'>$15.00</p>
              </div>
        

              </div>
            </div>
          </form>
          <div className="flex flex-col justify-between">
            <div><h2 className="text-2xl font-semibold text-[#4D869C] border-b-2">
              Charges Summary
            </h2>
            <TotalSummery timelyCharges={timelyCharges} checkboxes={checkboxes} discount={validCode}/>
            </div>
                  
            <div>
              <button onClick={submitInfo} className='w-full bg-[#4D869C] text-[#CDE8E5] rounded-md py-2 font-semibold'>{button}</button>
            </div>
          </div>
        </div>
    </div>
      :
      <Invoice reservationInfo={reservationInfo}/>
    }
    </>
    
  )
}

export default InvoiceGenerator