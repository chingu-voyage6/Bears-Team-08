import * as React from "react";
import * as Renderer from "react-test-renderer";
import { mount, ReactWrapper } from "enzyme";
import { Store } from "redux";

import { App } from ".";
import { DrawingBoard, Explorer, Navbar, Sidebar } from "../";
import { wrapComponentInProvider, createStore } from "@shared/testUtil";
import { rootReducer, initialState } from "../../reducers";
import { newDrawing, changePaintMethod } from "../../actions";

describe("components/App", () => {
  it("renders", () => {
    const store = createStore();
    const tree = Renderer.create(wrapComponentInProvider(<App />, store));
    expect(tree).toMatchSnapshot();
  });

  describe("clicking on new drawing button", () => {
    const drawingName = "Hello World Drawing";
    let store: Store;
    let wrapper: ReactWrapper;

    beforeEach(() => {
      store = createStore();
      newDrawing({ name: drawingName })(store.dispatch);
      wrapper = mount(wrapComponentInProvider(<App />, store));
    });

    it("should update current active drawing name in navbar", () => {
      expect(wrapper.find(Navbar).text()).toContain(drawingName);
    });

    it("should render Sidebar", () => {
      expect(wrapper.find(Sidebar).length).toEqual(1);
      expect(wrapper.find(Explorer).length).toEqual(0);
    });

    it("should render DrawingBoard", () => {
      expect(wrapper.find(DrawingBoard).length).toEqual(1);
      expect(wrapper.find(Explorer).length).toEqual(0);
    });
  });
});
