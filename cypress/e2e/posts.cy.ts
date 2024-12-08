import constants from "../../src/constants";
import Mustache from "../../src/lib/mustache";

describe("Posts API", () => {
  const TEST_USER_ID = Cypress.env("TEST_USER_ID");
  const API_TOKEN = Cypress.env("API_TOKEN");
  let POST_ID: String;

  before(() => {
    cy.visit("/");
  });

  it("should fetch all posts", () => {
    cy.request({
      method: "GET",
      url: constants.endpoints.GET_POSTS,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.at.least(1);
      expect(response.body[0]).to.have.property("id");
      expect(response.body[0]).to.have.property("title");
    });
  });

  it("should create a new post", () => {
    const newPost = {
      user: TEST_USER_ID,
      title: "Test Post",
      body: "This is a test post for Cypress.",
    };

    cy.request({
      method: "POST",
      url: Mustache(constants.endpoints.CREATE_POSTS, { id: TEST_USER_ID }),
      body: newPost,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", newPost.title);
      POST_ID = response.body.id;
    });
  });

  it("should fetch the detail of a post", () => {
    cy.request({
      method: "GET",
      url: Mustache(constants.endpoints.GET_DETAIL_POSTS, { id: POST_ID }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", POST_ID);
    });
  });

  it("should update the post", () => {
    const updatedPost = {
      id: POST_ID,
      user: TEST_USER_ID,
      title: "Updated Test Post",
      body: "This post has been updated.",
    };

    cy.request({
      method: "PUT",
      url: Mustache(constants.endpoints.EDIT_POSTS, { id: POST_ID }),
      body: updatedPost,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("title", updatedPost.title);
    });
  });

  it("should delete the post", () => {
    cy.request({
      method: "DELETE",
      url: Mustache(constants.endpoints.DELETE_POSTS, { id: POST_ID }),
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);

      cy.request({
        method: "GET",
        url: Mustache(constants.endpoints.GET_DETAIL_POSTS, { id: POST_ID }),
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });
});
