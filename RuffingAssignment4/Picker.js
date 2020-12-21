/**
 * CSE183 Assignment 4 - Advanced
 */
class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
   */  


  constructor(containerId) {
    //window.onload = function() {
      // the code to be called when the dom has loade
      // #document has its nodes
      //var container = document.getElementById(containerId); // The div will contain the picker inside, acting as a container
      //var p = document.createElement("P"); 
      //p.innerText = "Claire";
      //container.appendChild(p);
    //}
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    console.log(day);
    console.log(month);
    console.log(year);
    
    window.onload = function() {
      //Change the contents of the month/year label to match the date
      // Set all the individual day elements appropriately
      var container = document.getElementById(containerId); // The div will contain the picker inside, acting as a container
      var monthLabel = document.createElement("P"); 
      monthLabel.innerText = months[month] + ' ' + year;
      container.appendChild(monthLabel);
    }
    
    //this.next(containerId);
    //this.prev(containerId);

  }

  prev(containerId) {
    //alert("next yes");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    month--;
    if (month < 0){
      month = 0;
      year++;
    }
    window.onload = function() {
      //Change the contents of the month/year label to match the date
      // Set all the individual day elements appropriately
      var container = document.getElementById(containerId); // The div will contain the picker inside, acting as a container
      var monthLabel = document.createElement("P"); 
      monthLabel.innerText = months[month] + ' ' + year;
      container.appendChild(monthLabel);
    }

  }



  next(containerId) {
    //alert("next yes");
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    month++;
    if (month > 11){
      year++;
    }
    window.onload = function() {
      //Change the contents of the month/year label to match the date
      // Set all the individual day elements appropriately
      var container = document.getElementById(containerId); // The div will contain the picker inside, acting as a container
      var monthLabel = document.createElement("P"); 
      monthLabel.innerText = months[month] + ' ' + year;
      container.appendChild(monthLabel);
    }

  }

}
