/**
 * CSE183 Assignment 4 - Basic
 */
class Templater {
  /**
   * Replace the contents of {{ }} tagged table header and data
   * elements in document with values found in the supplied JSON
   * @param {object} document
   * @param {string} json with propeties matching tags in document
   */
  byTag(document, json) {
    var inputJson = JSON.parse(json); // inputJson is an object
    // Get the keys from the json and search for 
    // those element IDs in the document.
    // If the element id matches the key,
    // replace the content at that element id
    // with the value/data from the json
    // (set that element's.innerhtml to the value of the json)
    // The innerhtml is for example
    // {{R11}} in <td id="R11">{{R11}}</td>
    // Blank out the unset ones.
    // Selecting all table elements from the document
    var allte = document.querySelectorAll("th, td"); 
    console.log(allte);
    var x; // Variable for iterating through the JSON data
    for (x in inputJson) {
      var i = 0; // Variable for inner for loop iterating thru table headers
      console.log(x);
      console.log(inputJson[x]);
      var regex = ('\{{' + x + '\}}');
      console.log(regex);
      while (i < allte.length) { // Iterating thru the table elements
        console.log(allte[i]);
        console.log(allte[i].innerText);
        var tag = allte[i].innerText;
        if (tag == regex) { // If the tag were on matches the regex,
          allte[i].innerText = inputJson[x]; // then fill it with the json value
          console.log(allte[i].innerText);
          i = i + 1;
          break;
        }
        else { // If the tag doesn't match the regex, move on to the next tag
          i = i + 1;
        }
      }
    }
    // Fills in the leftover unused table tags with emptiness
    for (i=0; i < allte.length; i++) {
      var tagsLeft = allte[i].innerText;
      console.log(tagsLeft);
      if (tagsLeft.startsWith("{{")) {
          allte[i].innerText = null;
      }
    }
  }

  /**
   * Replace the contents of table header and data elements in
   * in document with id'd content found in the supplied JSON
   * @param {object} document 
   * @param {string} json with propeties matching element ids in document
   */
  byId(document, json) {
    var inputJson = JSON.parse(json); // inputJson is an object
    // Get the keys from the json and search for those element IDs in the document.
    // If the element id matches the key, replace the content at that element id
    // with the value/data from the json (set that element's.innerhtml to the value of the json)
    // The innerhtml is for example {{R11}} in <td id="R11">{{R11}}</td>
    var x; // Declaring x as an object to use in the following for loop
    for (x in inputJson) {
      // Replacing the table headers with the table data by looking at the element ID
      document.getElementById(x).innerHTML = inputJson[x];
    }
    // Blank out the unset ones.
    var allth = document.querySelectorAll("th");
    console.log(allth);
    var alltd = document.querySelectorAll("td");
    console.log(alltd);
    var i;
    for (i=0; i < allth.length; i++) {
      console.log(allth[i]);
      console.log(allth[i].textContent);
      var tag = allth[i].textContent;
      if (tag.startsWith("{{")) {
        allth[i].textContent = null;
      }
      console.log(allth[i].textContent);
    }
    var j;
    for (j=0; j < alltd.length; j++) {
      console.log(alltd[j]);
      console.log(alltd[j].textContent);
      var tag = alltd[j].textContent;
      if (tag.startsWith("{{")) {
        alltd[j].textContent = null;
      }
      console.log(alltd[j].textContent);
    }
  }
}
