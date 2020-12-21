/**
 * CSE183 Assignment 3 - Basic
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tagged string
   */
  constructor(template) {
    this.str = template; // Str is template, a {{ }} tagged string
  }
  /**
   * Apply map to template to generate string
   * @param {object} map Object with propeties matching tags in template
   * @param {boolean} strict Throw an Error if any tags in template are
   *     not found in map
   * @return {string} template with all tags replaced
   * @throws An Error if strict is set and any tags in template are not
   * found in map
   */
  apply(map, strict) {
    const keys = Object.keys(map); // Going to grab the map keys
    for (let i = 0; i < keys.length; i++) { // Iterating through the keys of map
      // Build the regex dynamically based on the key
      const regex = new RegExp('\{{' + keys[i] + '\}}', 'g');
      const temp = keys[i]; // A key that is part of map's keys
      // Replacing the regex with the value of the key (same as saying map.temp)
      // Ex:replace regex={{had}} with 'had'
      this.str = this.str.replace(regex, map[temp]);
    }
    // Only remove the missing tags if this.str is not already undefined
    if (this.str != undefined) {
      // If an extra tag is found in input and strict is true (an error)
      if ((this.str.search(/\{{(.*?)\}}/g) != -1) && (strict == true)) {
        throw new Error('Missing Tag Strict Error'); // Error condition
      } else { // There is no error or strict is not used
        // This removes the missing tags but leaves an extra whitespace
        this.str = this.str.replace(/\{{(.*?)\}}/g, '');
        // This removes all whitespaces where they exist
        // and then adds one back in between words
        this.str = this.str.replace(/ +/g, ' ');
      }
    }
    return this.str;
  }
}

module.exports = Templater;
