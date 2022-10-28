export const format = (value) => {
    let formattedValue;
  
    formattedValue = value.replace(",", ".");
    formattedValue = Number(formattedValue.split("$")[1].trim());
  
    formattedValue = String(value).includes("-") ? -formattedValue : formattedValue;
  
    return formattedValue;
  };
  
  export const randomNumber = () => {
    return Math.floor(Math.random() * 101);
  };
  
  export const prepareLocalStorage = (win) => {

    win.localStorage.setItem('dev.finances:transactions', JSON.stringify([
        {
          description: "salário  ",
          amount: randomNumber() * 100,
          date: "25/10/2022",
        },
        {
          description: "chocolate",
          amount: -(randomNumber() *35),
          date: "26/10/2022",
        },
      ])
    );
  };