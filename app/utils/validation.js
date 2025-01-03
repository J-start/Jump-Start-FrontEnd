function isTadable(){
    let now = new Date();
    let currentDateBrasil = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    if(isHolliday(currentDateBrasil)){
        return false
    }
    if(currentDateBrasil.getDay() == 6 || currentDateBrasil.getDay() == 0){
        return false
    }else{
        if(currentDateBrasil.getHours() < 11 || currentDateBrasil.getHours() > 18) {
            return false
        }else if(currentDateBrasil.getHours() == 18 && currentDateBrasil.getMinutes() > 0){
            return false
        }
    }

    return true
}

function isHolliday(date){
    console.log(date)
   let formatedDate = date.toLocaleDateString("pt-BR");
 
   let hollidays = ["01/01/2025",
                    "03/03/2025",
                    "04/03/2025",
                    "18/04/2025",
                    "21/04/2025",
                    "01/05/2025",
                    "19/06/2025",
                    "07/09/2025",
                    "12/10/2025",
                    "02/11/2025",
                    "15/11/2025",
                    "20/11/2025",
                    "25/12/2025"]

   let isHolliday = false
   hollidays.forEach(e => {
       if (formatedDate == e){
          isHolliday = true
       }
   })
   return isHolliday
}