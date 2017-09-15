import {Practices} from './../js/practices.js';

var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#practice-search-form').submit(function(e) {
    e.preventDefault();

    let illness = $('#illness').val();
    let name = $('#practice-name').val();

    if(illness.length === 0 && name.length === 0) {
      alert("Please search by at least one parameter.");
    } else {
      let practiceList = new Practices(illness, name);
      practiceList.getData();

      $('#practice-list').text("");



      setTimeout(function() {

        if(practiceList.practices.length === 0) {
          alert("No available doctors found, please try again.");
        } else {
          for (let i = 0; i < practiceList.practices.length; i++) {

            let newPatientsicon = "";
            if (practiceList.practices[i].practices[0].accepts_new_patients === true) {
              newPatientsicon = "http://vignette1.wikia.nocookie.net/nintendo/images/5/5a/Checkmark.png/revision/latest?cb=20120817061012&path-prefix=en";
            } else {
              newPatientsicon = "https://cdn.pixabay.com/photo/2014/04/02/10/19/check-303494_960_720.png";
            }

            $('#practice-list').append(
              `<div class="panel panel-default">
                <div class="panel-heading"><h4>${practiceList.practices[i].profile.first_name + ' ' + practiceList.practices[i].profile.last_name + ', <strong>' + practiceList.practices[i].profile.title + '</strong>'}</h4></div>
                <div class="panel-body">
                  <div class="row">
                    <div class="col-md-1">
                      <img src="${practiceList.practices[i].profile.image_url}">
                    </div>
                    <div class="col-md-3">
                      <ul>
                        <li><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span>${practiceList.practices[i].practices[0].phones[0].number}</li>
                        <li><span class="glyphicon glyphicon-home" aria-hidden="true"></span>${practiceList.practices[i].practices[0].visit_address.street}</li>
                        <li><span class="glyphicon glyphicon-home" aria-hidden="true"></span>${practiceList.practices[i].practices[0].visit_address.city + ',' + practiceList.practices[i].practices[0].visit_address.state + ' ' + practiceList.practices[i].practices[0].visit_address.zip}</li>
                        <li><span class="glyphicon glyphicon-user" aria-hidden="true"></span>${practiceList.practices[i].practices[0].phones[0].number}</li>
                      </ul>
                    </div>

                    <div class="col-md-1">
                      <h4>New Patients</h4>
                      <img class="checkmarks" src="${newPatientsicon}">
                    </div>

                    <div class="col-md-7">
                      <h5>Bio</h5>
                      <p>${practiceList.practices[i].profile.bio}</p>
                    </div>

                  </div>
                </div>
              </div>`);

          }
        }



      }, 2000);
    }
  });
});
