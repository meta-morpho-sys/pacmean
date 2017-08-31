'use strict';

describe("PacMean", function () {
  var pacMean;

  beforeEach(function () {
    spyOn(PacMean.prototype, "draw")
    pacMean = new PacMean(270, 480);
  });

  describe("instantiation", function () {
    it("is created with set dimensions", function () {
      expect(pacMean.width).toEqual(28)
      expect(pacMean.height).toEqual(28)
    });

    it("starts at set co-ordinates", function () {
      expect(pacMean.xCoordinate()).toEqual(270);
      expect(pacMean.yCoordinate()).toEqual(480);
    });

    it("has a default speed", function () {
      expect(pacMean.SPEED).toEqual(30);
    });
  });

  describe("xCoordinate", function () {
    it("returns the current x co-ordinate", function () {
      expect(pacMean.xCoordinate()).toEqual(270);
    });
  });

  describe("yCoordinate", function () {
    it("returns the current y co-ordinate", function () {
      expect(pacMean.yCoordinate()).toEqual(480);
    });
  });

  describe("goRight", function () {
    it("increases the x co-ordinate", function () {
      pacMean.goRight();
      expect(pacMean.xCoordinate()).toEqual(300);
    });

    it("resets its location on the board when it passes the right board edge", function () {
      pacMean.x = 670;
      pacMean.goRight();
      expect(pacMean.xCoordinate()).toEqual(0);
    });
  });

  describe("goLeft", function () {
    it("decreases the x co-ordinate", function () {
      pacMean.goLeft();
      expect(pacMean.xCoordinate()).toEqual(240);
    });

    it("resets its location on the board when it passes the left board edge", function () {
      pacMean.x = -30;
      pacMean.goLeft();
      expect(pacMean.xCoordinate()).toEqual(540);
    });
  });

  describe("goUp", function () {
    it("can have its y co-ordinate decreased", function () {
      pacMean.goUp();
      expect(pacMean.yCoordinate()).toEqual(450);
    });

    it("resets its location on the board when it passes the top board edge", function () {
      pacMean.y = -30;
      pacMean.goUp();
      expect(pacMean.yCoordinate()).toEqual(630);
    });
  });

  describe("goDown", function () {
    it("can have its y co-ordinate increased", function () {
      pacMean.goDown();
      expect(pacMean.yCoordinate()).toEqual(510);
    });

    it("resets its location on the board when it passes the bottom board edge", function () {
      pacMean.y = 690;
      pacMean.goDown();
      expect(pacMean.yCoordinate()).toEqual(0);
    });
  });
});
