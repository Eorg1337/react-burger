import React from 'react';
import ingredients from '../../fixtures/ingredients-test.json'
import user from '../../fixtures/user-test.json'

const my_ingredients = '[data-test="ingredients"]';
const my_constructor = '[data-test="constructor"]';
const my_buns = '[data-test="buns"]';
const my_mains = '[data-test="mains"]';
const my_sauces = '[data-test="sauces"]';
const submit_order = '[data-test="submit-order"]';
const close_modal = '[data-test="close-modal"]';
const myUrl = "http://localhost:3000";

describe("burger-constructor", function () {
  beforeEach(() => {
    cy.viewport(1280, 1024);
    cy.visit(myUrl);
    cy.intercept("GET", "api/ingredients", ingredients);
    cy.intercept("GET", "api/auth/user", user);
  });
  it("check all ingredients modal", () => {
    cy.get(my_ingredients).each((elem) => {
      cy.wrap(elem).click({ force: true });
      cy.wait(100);
      cy.get(close_modal).click();
    });
  });
  it("check all ingr dnd in constructor", () => {
    cy.get(my_ingredients).each((elem) => {
      cy.wrap(elem).trigger("dragstart");
      cy.get(my_constructor).trigger("drop");
    });
  });
  it("check submit order and reroute to login page", () => {
    cy.get(my_buns).find(my_ingredients).first().trigger("dragstart");
    cy.get(my_constructor).trigger("drop");
    cy.get(my_sauces).find(my_ingredients).first().trigger("dragstart");
    cy.get(my_constructor).trigger("drop");
    cy.get(my_mains).find(my_ingredients).first().trigger("dragstart");
    cy.get(my_constructor).trigger("drop");
    cy.get(submit_order).click();
    cy.location("pathname").should("eq", "/login");
  });
});