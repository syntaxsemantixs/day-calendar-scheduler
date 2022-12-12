// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let currentTime = $("#currentDay")

  function displayTime() {
    var actualTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
    currentTime.text(actualTime)
  }

  displayTime();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let currentHour = dayjs().hour()
  console.log(currentHour)
  let saveBtn = $(".saveBtn")
  saveBtn.on("click", function (event) {
    event.preventDefault();
    let id = $(this).parent().attr("id")
    let value = $(this).siblings(".description").val()
    console.log(id, value)
    let schedule = JSON.parse(window.localStorage.getItem("schedule")) || []
    schedule.push({ id, value })
    window.localStorage.setItem("schedule", JSON.stringify(schedule))
  })

  console.log(currentHour)
  let saveSchedule = JSON.parse(window.localStorage.getItem("schedule"))
  $(".description").each(function () {
    let id = $(this).parent().attr("id")
    if (saveSchedule.length > 0) {
      for (let i = 0; i < saveSchedule.length; i++) {
        const element = saveSchedule[i];
        if (id === element.id) {
          $(this).text(element.value)
        }

      }
    }
  })
//   function coloring() {
//     console.log("coloring")
//     $(".time-block").each(function () {
//       let id = $(this).attr("id")
//       let stringTime = currentHour.toString(2)
//       if (id < stringTime) {
//         console.log(id)
        
//         $(this).addCLass("past")
//         // $(this).css("background-color: blue")
//       } else if (id === stringTime) {
//         console.log(id)
//         // $(this).addCLass("present")
//         // $(this).css("background-color: blue")
//       } else {
//         console.log(id)
//         // $(this).addClass("future")
//         // $(this).css("background-color: blue")
//       }
//     })
//   }
// coloring()


  $(".time-block").each(function () {
    let id = $(this).attr("id").split('-')[1];
    let stringTime = currentHour.toString(2)
    numTime = parseInt(id)
    console.log(currentHour)
    console.log(numTime)
    if (currentHour > numTime) {
      console.log(numTime)
      $(this).addCLass("past")
      // $(this).css("background-color: blue")
    } else if (currentHour === numTime) {
      console.log(numTime)
      $(this).addCLass("present")
      // $(this).css("background-color: blue")
    } else if (2 < numTime) {
      console.log(numTime)
      $(this).addClass("future")
      // $(this).css("background-color: blue")
    }
  })

});
