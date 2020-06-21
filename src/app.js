const express = require("express");
const cors = require("cors");
const Repository = require('./classes/repository.js');

const app = express();

const repositories = [];

app.use(express.json());
app.use(cors());

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { body } = request;
  const { title, url, techs } = body;

  if(!title || !url || !techs.length){
    return response.status(400).json({ error: 'All fields need to be filled.'})
  }

  const repository = Repository.build(body);
  repositories.push(repository);

  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  const { body, params } = request;
  const { id } = params

  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0){
    return response.status(400).json({ error: 'Invalid repository ID.'})
  }
  const repository = Repository.build(body);

  repositories[repositoryId] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { params } = request;
  const { id } = params
  
  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0){
    return response.status(400).json({ error: 'Repository not found.'})
  }

  repositories.splice(repositoryId, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { params } = request;
  const { id } = params
  
  const repositoryId = repositories.findIndex(repository => repository.id === id);

  if(repositoryId < 0){
    return response.status(400).json({ error: 'Repository not found.'})
  }

  const repository = repositories[repositoryId];
  repository.likes++;

  repositories[repositoryId] = repository;

  return response.json(repositories[repositoryId]);

});

module.exports = app;
