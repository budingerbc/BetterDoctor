var apiKey = require('./../.env').apiKey;

export class Practices {
  constructor(illness, name) {
    this.practices = [];
    this.illness = illness;
    this.name = name;
  }

  getData() {

    let that = this;

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      let url = "";
      // altering the api request based on the input parameters
      if (that.name.length === 0) {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${that.illness}&location=47.608013,-122.335167,100&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      } else if (that.illness.length === 0) {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${that.name}&location=47.608013,-122.335167,100&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      } else {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${that.name}&query=${that.illness}&location=47.608013,-122.335167,30&user_location=47.428718,-122.321394&skip=0&user_key=${apiKey}`;
      }

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
      for (let i = 0; i < body.data.length; i++) {
        that.practices.push(body.data[i]);
      }
    });
  }
}
