import index from "../index";

describe("hourclock", () => {
  describe("module", () => {
    describe("index", () => {
      it("should define a module", () => {
        expect(index).toMatchSnapshot();
      });
    });
  });
});
