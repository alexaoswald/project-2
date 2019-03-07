var userID;
var apiCall;

$(document).ready(function() {
  $.get("/api/user_data")
    .then(function(data) {
      userID = data.user.id;
      console.log("Client Side Initial User ID: " + userID);
    })
    .then(function() {
      apiCall = "/api/dog/";
      apiCall += userID;
      $.get(apiCall).then(function(response) {
        console.log("Client Side API User ID: " + userID);
        var x;
        var results;
        for (x in response) {
          var dogName = $("<p><strong>" + response[x].name + "</strong></p>")
          var dogBio = $("<p>" + response[x].bio + "</p>");
          var dogGender = $("<p>" + response[x].name + "'s Gender: " + response[x].gender + "</p>")
          var dogWeight = $("<p>" + response[x].name + "'s Weight: " + response[x].weight + " lb.</p>")
          var dogEnergy = $("<p>" + response[x].name + "'s Energy Level: " + response[x].energy + "</p>")
          var dogPatience = $("<p>" + response[x].name + "'s Patience Level: " + response[x].patience + "</p>")
          var dogDominance = $("<p>" + response[x].name + "'s Dominance Level: " + response[x].dominance + "</p>")
          var lineBreak = $("<hr>");
          $("#dogSubtitle").after(dogName, dogBio, dogGender, dogWeight, dogEnergy, dogPatience, dogDominance, lineBreak);
        }
      });
    });
});

$("#addDogBtn").click(function() {
  $(".modal").toggleClass("is-active");
});

$(".modal-close").click(function() {
  $(".modal").toggleClass("is-active");
});

$("#submitDogBtn").click(function(event) {
  event.preventDefault();

  var newDog = {
    name: $("#dogName")
      .val()
      .trim(),
    gender: $("#dogGender")
      .val()
      .trim(),
    weight: $("#dogWeight")
      .val()
      .trim(),
    bio: $("#dogBio")
      .val()
      .trim(),
    energy: $("#dogEnergy")
      .val()
      .trim(),
    patience: $("#dogPatience")
      .val()
      .trim(),
    dominance: $("#dogDominance")
      .val()
      .trim(),
    image: $("#dogImg")
      .val()
      .trim(),
    UserId: userID
  };

  $.ajax("/api/dog", {
    type: "POST",
    data: newDog
  }).then(function() {
    location.reload();
  });
});
