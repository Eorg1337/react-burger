import React from 'react';
import ingredients from '../../fixtures/ingredients-test.json'
import user from '../../fixtures/user-test.json'

const myIngredients = '[data-test="ingredients"]';
const myConstructor = '[data-test="constructor"]';
const myBuns = '[data-test="buns"]';
const myMains = '[data-test="mains"]';
const mySauces = '[data-test="sauces"]';
const submitOrder = '[data-test="submit-order"]';
const closeModal = '[data-test="close-modal"]';
const myUrl = "http://localhost:3000";

describe("burger-constructor", function () {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit(myUrl);
    cy.intercept("GET", "api/ingredients", ingredients);
    cy.intercept("GET", "api/auth/user", user);
  });
  it("check all ingredients modal", () => {
    cy.get(myIngredients).each((elem) => {
      cy.wrap(elem).click({ force: true });
      cy.wait(100);
      cy.get(closeModal).click();
    });
  });
  it("check all ingr dnd in constructor", () => {
    cy.get(myIngredients).each((elem) => {
      cy.wrap(elem).trigger("dragstart");
      cy.get(myConstructor).trigger("drop");
    });
  });
  it("check submit order and reroute to login page", () => {
    cy.get(myBuns).find(myIngredients).first().trigger("dragstart");
    cy.get(myConstructor).trigger("drop");
    cy.get(mySauces).find(myIngredients).first().trigger("dragstart");
    cy.get(myConstructor).trigger("drop");
    cy.get(myMains).find(myIngredients).first().trigger("dragstart");
    cy.get(myConstructor).trigger("drop");
    cy.get(submitOrder).click();
    cy.location("pathname").should("eq", "/login");
  });
});