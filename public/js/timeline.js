function loadEvents() {
  $("#events").empty();
  $.ajax({
    url: "/timeline/getAllEvents",
    type: "get",
    success: (allEvents) => {
      // console.log(allEvents);
      if (allEvents.length == 0) {
        $("#events").append("No events in history");
      } else {
        for (i = 0; i < allEvents.length; i++) {
          let id = allEvents[i]["_id"];
          $("#events").prepend(
            `
            <div class="event" id="${id}"> 
              <button class="delete-button" onclick=deleteEvent('${id}')>❌</button>
              <button class="like-button" onclick="likeEvent('${id}')">👍</button>
              <span class="event-hit-counter">${allEvents[i].hits}</span>
              ${allEvents[i].text}
              <span class="event-time">@ ${allEvents[i].time}</span>
            </div>
            `
          );
        }
      }
    },
  });
}

var time = new Date();

function searchEvent() {
  eventName = $(this).val();
  $.ajax({
    url: `/timeline/insert`,
    type: "POST",
    data: {
      text: `Searched for ${this.id.split("_")[1]}:${eventName}`,
      time: time.toLocaleTimeString(),
    },
    success: (data) => {
      loadEvents();
    },
  });
}

function profileViewed(pokemonName) {
  $.ajax({
    url: `/timeline/insert`,
    type: "POST",
    data: {
      text: `${pokemonName} profile viewed`,
      time: time.toLocaleTimeString(),
    },
    success: (data) => {
      loadEvents();
    },
  });
}

function likeEvent(id) {
  $.ajax({
    url: `/timeline/like/${id}`,
    type: "GET",
    success: () => {
      loadEvents();
    },
  });
}
function deleteEvent(id) {
  $.ajax({
    url: `/timeline/remove/${id}`,
    type: "GET",
    success: () => {
      // $(`#${id}`).remove();
      loadEvents();
    },
  });
}
function clearEvents() {
  $.ajax({
    url: `/timeline/removeAll`,
    type: "GET",
    success: () => {
      loadEvents();
    },
  });
}
function setup() {
  loadEvents();
  // $("option").on("click", searchEvent);
  $("select").change(searchEvent);
}
$(document).ready(setup);