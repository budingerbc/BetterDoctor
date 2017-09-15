var apiKey = require('./../.env').apiKey;

export class Doctors {
  constructor(illness, name) {
    this.doctors = [];
    this.illness = illness;
    this.name = name;
  }

  getData() {

    let that = this;

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      let url = "";
      if (that.name.length === 0) {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${that.illness}&location=47.608013,-122.335167,100&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      } else if (that.illness.length === 0) {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${that.name}&location=47.608013,-122.335167,100&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      } else {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${that.name}&query=${that.illness}&location=47.608013,-122.335167,100&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      }

      console.log(url);

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
    });
  }
}
