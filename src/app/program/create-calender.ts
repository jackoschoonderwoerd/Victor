// import { Month, Year } from "./program.models";

import { Month, Year } from "./program.models";

export function sayHi() {
  alert('hi');
}


export function calculateDateMonthsFromNow(months: number): string  {
  // RETURNS A ARRAY OF DATESTRINGS, 6 MONTHS INTO THE FUTURE
  const monthsAhead: number = months
  const today = new Date()
  let monthNow = today.getMonth() + 1;
  const dateNow = today.getDate();
  let yearNow = today.getFullYear();
  if(monthNow + monthsAhead > 11) {
    monthNow = monthNow + 6 - 12;
    yearNow = yearNow + 1
  }
  const dateString = `${monthNow}/31/${yearNow}` 
  return dateString
}

export function setStartingDateString(): string {
  // RETURNS THE CURRENT DATE AS A STRING
  const today = new Date()
  const monthNow = today.getMonth() + 1;
  const dateNow = today.getDate();
  const yearNow = today.getFullYear();
  const startingDayString = `${monthNow}/${dateNow}/${yearNow}`
  return startingDayString
}

export function yearsMonthsArray (sundays: number[]) {
  // CREATES AN YEARS-ARRAY WITH AN EMPTY ARRAY FOR EACH YEAR THAT WILL CONTAIN THE MONTHS
  let years: Year[] = [];
    for (let i = 0; i < sundays.length; i++) {
      if(years.length === 0) {
        years.push({
          yearName: sundays[i][2],
          months: []
        })
      } else {
      const index = years.findIndex((year: Year) => {
        return year.yearName === sundays[i][2];
      })
      if(index === -1) {
        years.push({
          yearName: sundays[i][2],
          months: []
        })
      }
    }
  }
  return years
}

export function addMonthsGigsToYearArray (years, sundays) {
  // FILLS THE MONTH-ARRAY IN YEARS
  let monthNames = []
  for (let i = 0; i < sundays.length; i++) {
    years.forEach((newYear: Year) => {
      if (sundays[i][2] === newYear.yearName) {
        if (!monthNames.includes(sundays[i][0]) || monthNames.length === 0) {
          monthNames.push(sundays[i][0]);
          newYear.months.push({
            name: sundays[i][0],
            gigs: []
          })
        }
      }
    })
  }
  return years;
}

export function addGigsToMonthArray(years, sundays) {
  // FILLS THE GIGS ARRAY IN MONTHS
  let gigNames = []
  for (let i = 0; i < sundays.length; i++) {;
    // EVERY YEAR
    years.forEach((newYear: Year) => {
      // EVERY MONTH IN THAT YEAR
      newYear.months.forEach((month: Month) => {
        // IF THE FIRST ELEMENT IN THE SUNDAY-ARRAY CORRESPONDS WITH THE MONTH-NAME
        if (sundays[i][0] === month.name) {
          if (!gigNames.includes(sundays[i][1]) || gigNames.length === 0) {
            gigNames.push(sundays[i][1]);
            month.gigs.push({
              name: sundays[i][1],
              bookings: []
            })
          }
        }
      })
      gigNames = [];
    })
  }
  return years
}