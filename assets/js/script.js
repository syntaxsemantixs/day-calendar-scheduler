//time display
let currentTime = $("#currentDay")

function displayTime() {
  var actualTime = dayjs().format("MMM DD, YYYY [at] hh:mm:ss a");
  currentTime.text(actualTime)
}

displayTime();

$(function () {
  let currentHour = dayjs().hour()
  console.log(currentHour)
  //save input
  let saveBtn = $(".saveBtn")
  saveBtn.on("click", function (event) {
    event.preventDefault();
    let id = $(this).parent().attr("id")
    let value = $(this).siblings(".description").val()
    console.log(id, value)
    let schedule = JSON.parse(window.localStorage.getItem("schedule")) || []
    schedule.push({ id, value })
    window.localStorage.setItem("schedule", JSON.stringify(schedule))

    //save message
    function saveMessage() {
      var secondsLeft = 5

      var timeInterval = setInterval(function () {

        secondsLeft--;
        $(".savemsg").text("Schedule Saved.")
        if (secondsLeft <= 0) {
          clearInterval(timeInterval);
          $(".savemsg").text("")
        }
      }, 1000)

    }
    saveMessage()
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

  //color change
  $(".time-block").each(function () {
    let id = $(this).attr("id").split('-')[1];
    numTime = parseInt(id)
    console.log(currentHour)
    console.log(numTime)
    if (currentHour < numTime) {
      console.log(numTime)
      $(this).addClass("future")

    } else if (currentHour === numTime) {
      console.log(numTime)
      $(this).addClass("present")

    } else if (currentHour > numTime) {
      console.log(numTime)
      $(this).addClass("past")

    }
  })

});
