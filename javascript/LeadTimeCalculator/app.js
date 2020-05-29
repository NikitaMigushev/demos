const leadTime = {
  requestForQuoteDate: new Date(),
  leadtime: new Date(),
  before13: true,
  isTuesday: false,
  isFriday: false,
  countDays: 1,
  isSaturday: false,
  isSunday: false,
};

const daysOfWeek = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};

const resultLeadTime = document.querySelector("#result");
const requestQuoteDateResult = document.querySelector(
  "#requestQuoteDateResult"
);
const requestQuoteDateInput = document.querySelector("#requestQuoteDate");
const before13Select = document.querySelector("#before13");

const currentDate = new Date();

const currentDateString =
  currentDate.getFullYear() +
  "-" +
  ("0" + (currentDate.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + currentDate.getDate()).slice(-2);

//Set default date for date input
requestQuoteDateInput.defaultValue = currentDateString;

if (currentDate.getHours() >= 13) {
  before13Select.options.selectedIndex = 1;
} else {
  before13Select.options.selectedIndex = 0;
}

$("#requestQuoteDate").datepicker({
  dateFormat: "yy-mm-dd",
  firstDay: 1,
});

// add Days function
function addDays(days) {
  var date = new Date(leadTime.requestForQuoteDate.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

//print results function
function printResult() {
  leadTime.leadtime = leadTime.leadtime.toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  leadTime.requestForQuoteDate = leadTime.requestForQuoteDate.toLocaleString(
    "ru",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    }
  );

  let requestQuoteDateResultHtml;
  requestQuoteDateResultHtml = `Запрос на покупку: 
      ${leadTime.requestForQuoteDate}`;

  if (leadTime.before13 === true) {
    requestQuoteDateResultHtml += ` до 13:00`;
  } else {
    requestQuoteDateResultHtml += ` после 13:00`;
  }
  requestQuoteDateResult.innerHTML = requestQuoteDateResultHtml;
  resultLeadTime.innerHTML = `
      Планируемая дата поставки: <b>${leadTime.leadtime}
      </b>`;
}

const form = document.querySelector("#leadTimeForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default action from submit
  // reset settings
  leadTime.requestForQuoteDate = new Date();
  leadTime.leadtime = new Date();
  leadTime.before13 = true;
  leadTime.isTuesday = false;
  leadTime.isFriday = false;
  leadTime.countDays = 1;
  leadTime.isSaturday = false;
  leadTime.isSunday = false;

  //set bofore/after 13:00
  let before13 = document.querySelector("#before13");
  leadTime.requestForQuoteDate = new Date(requestQuoteDateInput.value);

  //set hours for request for quote date depending on before or after 13:00
  let selectedBefore13 = before13.options[before13.selectedIndex];
  if (selectedBefore13.value === "true") {
    leadTime.requestForQuoteDate.setHours(12);
    leadTime.before13 = true;
  } else {
    leadTime.requestForQuoteDate.setHours(15);
    leadTime.before13 = false;
  }

  //set up day of the week parameters

  let dayOfWeek = leadTime.requestForQuoteDate.getDay();

  if (dayOfWeek === 0) {
    leadTime.isSunday = true;
  }

  if (dayOfWeek === 6) {
    leadTime.isSaturday = true;
  }

  if (dayOfWeek === 5) {
    leadTime.isFriday = true;
  }

  if (dayOfWeek === 4) {
    leadTime.isTuesday = true;
  }

  if (leadTime.isDayOff === true);

  // calculate leadTime depending on scenarios

  //scenario 1

  if (leadTime.isSaturday === true) {
    leadTime.countDays = 3;
    leadTime.leadtime = addDays(leadTime.countDays);
    console.log(leadTime);
    console.log(leadTime.leadtime);
    printResult();
    return;
  }

  //scenario 2

  if (leadTime.isSunday === true) {
    leadTime.countDays = 2;
    leadTime.leadtime = addDays(leadTime.countDays);
    console.log(leadTime);
    console.log(leadTime.leadtime);
    printResult();
    return;
  }

  //scenario 3

  if (leadTime.isTuesday === true && leadTime.before13 === false) {
    leadTime.countDays = 4;
    leadTime.leadtime = addDays(leadTime.countDays);
    console.log(leadTime);
    console.log(leadTime.leadtime);
    printResult();
    return;
  }

  //scenario 4

  if (leadTime.isFriday === true) {
    leadTime.countDays = leadTime.countDays + 2;
  }

  if (leadTime.before13 === false) {
    leadTime.countDays = leadTime.countDays + 1;
  }

  leadTime.leadtime = addDays(leadTime.countDays);
  printResult();
});
