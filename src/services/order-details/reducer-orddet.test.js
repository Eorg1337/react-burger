import {
    CREATE_ORDER_DETAILS_MODAL,
    GET_ORDER_DETAILS_MODAL,
    TModalActions,
  } from "./actions";
import {
    orderDetailsModalReducer,
    TOrderModalState,
  } from "./orderDetailsModalReducer";
  
  describe("orderDetailsModalReducer", () => {
    const initialState = {
      ingredients: [],
      _id: "",
      number: 0,
      status: "",
      name: "",
      createdAt: "",
      updatedAt: "",
    };
  
    it("should return the initial state", () => {
      expect(orderDetailsModalReducer(undefined, {})).toEqual(
        initialState
      );
    });
  
    it("should handle CREATE_ORDER_DETAILS_MODAL", () => {
      const payload = {
        ingredients: [{}, {}],
        _id: "order_id",
        number: 1,
        status: "pending",
        name: "Order name",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-02",
      };
  
      const action = {
        type: CREATE_ORDER_DETAILS_MODAL,
        payload,
      };
  
      const expectedState = {
        ...initialState,
        ...payload,
      };
  
      expect(orderDetailsModalReducer(initialState, action)).toEqual(
        expectedState
      );
    });
  
    it("should handle GET_ORDER_DETAILS_MODAL", () => {
      const payload = 2;
  
      const action = {
        type: GET_ORDER_DETAILS_MODAL,
        payload,
      };
  
      const expectedState = {
        ...initialState,
        number: payload,
      };
  
      expect(orderDetailsModalReducer(initialState, action)).toEqual(
        expectedState
      );
    });
  });