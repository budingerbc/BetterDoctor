import {Doctors} from './../js/doctors.js';

var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#doctor-search-form').submit(function(e) {
    e.preventDefault();

    let illness = $('#illness').val();
    let name = $('#doctor-name').val();

    if(illness.length === 0 && name.length === 0) {
      alert("Please search by at least one parameter.");
    } else {
      let doctorList = new Doctors(illness, name);
      doctorList.getData();
    }


  });
});
