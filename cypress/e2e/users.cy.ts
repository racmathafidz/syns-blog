import constants from "../../src/constants";
import Mustache from "../../src/lib/mustache";

describe("Users API", () => {
  const API_TOKEN = Cypress.env("API_TOKEN");
  let TEST_USER_ID: string;

  before(() => {
    cy.visit("/");
  });

  it("should fetch user details by ID", () => {
    const USER_ID = Cypress.env("TEST_USER_ID");
    cy.request({
      method: "GET",
      url: Mustache(constants.endpoints.GET_USERS, { id: USER_ID }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", Number(USER_ID));
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("email");
    });
  });

  it("should return null when fetching user with invalid ID", () => {
    cy.request({
      method: "GET",
      url: Mustache(constants.endpoints.GET_USERS, { id: 0 }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("should create a new user", () => {
    const newUser = {
      name: "Test User",
      email: `testuser_${Date.now()}@example.com`,
      gender: "male",
      status: "active",
    };

    cy.request({
      method: "POST",
      url: constants.endpoints.CREATE_USERS,
      body: newUser,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", newUser.name);
      expect(response.body).to.have.property("email", newUser.email);
      expect(response.body).to.have.property("gender", newUser.gender);
      expect(response.body).to.have.property("status", newUser.status);

      TEST_USER_ID = response.body.id;
    });
  });

  it("should fetch newly created user details", () => {
    cy.request({
      method: "GET",
      url: Mustache(constants.endpoints.GET_USERS, { id: TEST_USER_ID }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", TEST_USER_ID);
      expect(response.body).to.have.property("name", "Test User");
    });
  });

  it("should return an error when creating a user with invalid data", () => {
    const invalidUser = {
      name: "",
      email: "invalid-email",
      gender: "invalid-gender",
      status: "active",
    };

    cy.request({
      method: "POST",
      url: constants.endpoints.CREATE_USERS,
      body: invalidUser,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });
});
