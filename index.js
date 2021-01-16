function createEmployeeRecord(arr){
  this.firstName = arr[0];
  this.familyName = arr[1];
  this.title = arr[2];
  this.payPerHour = arr[3];
  this.timeInEvents = [];
  this.timeOutEvents = [];
}

function createEmployeeRecords(arr){
  return arr.map(createEmployeeRecord);
}

function dateStamper(time, dateStamp){
  return {type: time, date: dateStamp.substring(0, 10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeInEvent(record, dateStamp){
  record.timeInEvents.push(dateStamper('TimeIn', dateStamp));
  return record;
}

function createTimeOutEvent(record, dateStamp){
  record.timeOutEvents.push(dateStamper('TimeOut', dateStamp));
  return record;
}

function hoursWorkedOnDate(record, workDate){
  let timeIn = record.timeInEvents.find(event => event.date === workDate).hour;
  let timeOut = record.timeOutEvents.find(event => event.date === workDate).hour;
  return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate(record, workDate){
  const money = record.payPerHour;
  return money * hoursWorkedOnDate(record, workDate);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 

    return payable
}