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
   let formatedDate = date.toLocaleDateString("pt-BR");
   
   let hollidays = ["1/1/25",
                    "3/3/25",
                    "4/3/25",
                    "18/4/25",
                    "21/4/25",
                    "01/5/25",
                    "19/6/25",
                    "07/9/25",
                    "12/10/25",
                    "2/11/25",
                    "15/11/25",
                    "20/11/25",
                    "25/12/25"]

   let isHolliday = false
   hollidays.forEach(e => {
       if (formatedDate == e){
          isHolliday = true
       }
   })
   return isHolliday
}