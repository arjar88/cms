const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../../controllers/genericControllers");

const startServer = require("../startServer");

beforeAll(async () => {
  await startServer(); // Set up the server before running tests
});

const collections = ["client", "object", "property", "data", "filter"]; // Replace with your actual collection names

for (const collectionName of collections) {
  describe(`GET /api/${collectionName}`, () => {
    it(`should get all documents for ${collectionName}`, async () => {
      const response = await request(app).get(`/api/${collectionName}`);
      expect(response.status).toBe(200);
    });
  });
}
