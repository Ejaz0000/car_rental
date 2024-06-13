import React, { useEffect, useState } from "react";

function TotalSummery({timelyCharges,checkboxes,discount}) { 
    let total = 0;
    const [totalwithDiscount, setTotalwithDiscount] = useState(0);
  
    
        for(const timelyCharge of timelyCharges){
            const totalRate = timelyCharge.unit * timelyCharge.rate || 0;
            total += totalRate;
        }
        for(const checkbox of checkboxes){
            const totalRate = parseInt(checkbox.rate) || 0;
            total += totalRate;
        }

        useEffect(()=>{
            if(discount){
                setTotalwithDiscount(total-((total*0.1).toFixed(2)));
            }else{
                setTotalwithDiscount(total)
            }
        },[total,discount])
   
        

  
    
  return (
    
    <>
      
      
      <div className="border-2 rounded-lg mt-4 p-4 bg-[#DFDFFF]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-500">
              <th>Charge</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            
            {timelyCharges && timelyCharges.map((time, index)=>(
                <tr key={index}>
                <td className="pt-5">{time.charge}</td>
                <td className="pt-5">{time.unit}</td>
                <td className="pt-5">${time.rate}</td>
                <td className="pt-5">${time.unit * time.rate}</td>
                </tr>
            )
            )}

            {checkboxes && checkboxes.map((check, index)=>(
                <tr key={index}>
                <td className="pt-5">{check.charge}</td>
                <td className="pt-5"></td>
                <td className="pt-5"></td>
                <td className="pt-5">${check.rate}</td>
                </tr>
            )
            )}

            {discount && (
                <tr>
                <td className="pt-5">Discount</td>
                <td className="pt-5"></td>
                <td className="pt-5">10%</td>
                <td className="pt-5">-${(total*0.1).toFixed(2)}</td>
                </tr>
            )
            }

            <tr className="font-semibold">
              <td className="pt-10">Total</td>
              <td className="pt-10"></td>
              <td className="pt-10"></td>
              <td className="pt-10">${totalwithDiscount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TotalSummery;
