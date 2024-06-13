

export const generateRandnum = () => {
    const generateUniqueSixDigitNumber = () => {
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2);
        const month = (`0${now.getMonth() + 1}`).slice(-2); 
        const day = (`0${now.getDate()}`).slice(-2); 
        const hours = (`0${now.getHours()}`).slice(-2); 
        const minutes = (`0${now.getMinutes()}`).slice(-2); 
        const seconds = (`0${now.getSeconds()}`).slice(-2);
    
        const uniqueNumber = `${year}${month}${day}${hours}${minutes}${seconds}`.slice(-6);
    
        return uniqueNumber;
      };
    
      const generateRandomTwoDigits = () => {
        return Math.floor(10 + Math.random() * 90).toString();
      };
    
    
    const sixDigitNumber = generateUniqueSixDigitNumber();
    const twoRandomDigits = generateRandomTwoDigits();
    return `${twoRandomDigits}${sixDigitNumber}`;
    
}

