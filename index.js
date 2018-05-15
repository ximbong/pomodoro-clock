$(document).ready(function() {
  var pause = false;
  var session = true;
  var sessionTime = parseInt($("#sess").text()) * 60;
  var breakTime = parseInt($("#break").text()) * 60;
  var timeInSec = sessionTime;
  var id;

  //calculate the time, decide which animation to run

  function count() {

    if (timeInSec >= 1) timeInSec -= 1;
    var sec = timeInSec % 60;
    var min = (timeInSec - sec) / 60;
    if (sec < 10) {
      $("#timer").text(min + ":0" + sec);
    } else {
      $("#timer").text(min + ":" + sec);
    }
    if (timeInSec == 0) {
      session === true ? (timeInSec = breakTime) : (timeInSec = sessionTime);

      session = !session;
      $(".circle, .square").toggleClass("sessionAnimation breakAnimation");

    }
    if (session === true) {
      $(".square").css("height", (1 - timeInSec / sessionTime) * 100 + "%");
    } else {
      $(".square").css("height", (1 - timeInSec / breakTime) * 100 + "%");
    }

    console.log(timeInSec + "+" + sessionTime)

  }

  //when click plus button

  $(".plus").click(function() {
    var value = parseInt(
      $(this)
      .siblings(".value")
      .text()
    );
    if (value < 40) value += 1;
    $(this)
      .siblings(".value")
      .text(value);
    clearInterval(id);
    pause = false;
    sessionTime = parseInt($("#sess").text()) * 60;
    breakTime = parseInt($("#break").text()) * 60;
  });

  //when click minus button

  $(".minus").click(function() {
    var value = parseInt(
      $(this)
      .siblings(".value")
      .text()
    );

    if (value > 1) value -= 1;
    $(this)
      .siblings(".value")
      .text(value);
    clearInterval(id);
    pause = false;
    sessionTime = parseInt($("#sess").text()) * 60;
    breakTime = parseInt($("#break").text()) * 60;
  });
  $(".value").on("DOMSubtreeModified", function() {
    $("#timer").text($("#sess").text() + ":00");
    timeInSec = parseInt($("#sess").text()) * 60;
  });

  $(".reset").click(function() {
    $("#timer").text($("#sess").text() + ":00");
    timeInSec = parseInt($("#sess").text()) * 60;
    session = true;
    $(".circle").addClass("sessionAnimation");
    $(".circle").removeClass("breakAnimation");
    $(".square").addClass("breakAnimation");
    $(".square").removeClass("sessionAnimation");
    $(".square").css("height", "0%");
  });

  $(".circle").click(function() {
    console.log(pause);

    if (pause === false) {
      id = setInterval(count, 1000);
      console.log(id);
    } else {
      clearInterval(id);
    }

    pause === true ? (pause = false) : (pause = true);
    console.log(pause);
  });
});
