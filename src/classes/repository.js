const { uuid } = require("uuidv4");

module.exports = class Repository {
  constructor({id, title, url, techs}){
    this.id = id || uuid();
    this.title = title;
    this.url = url;
    this.techs = techs;
    this.likes = 0;
  }

  static build (json){
    return new Repository({...json})
  }
}