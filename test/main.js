const test = require("tape");
const request = require("superagent");
const { main, close } = require("../src/main.js");
//
//  start the express server
main();

const baseURL = "http://localhost:3000";
//
//
test("available files call", function(t) {
  t.plan(2);

  request
    .get(baseURL + "/available-files")
    .then(res => res.body)
    .then(body => {
      t.ok(Array.isArray(body), "response is an Array");
      t.equal(body.length, 0, "response Array is empty");
    });
});
//
//
test("upload form call", function(t) {
  t.plan(1);

  request.get(baseURL + "/upload-multi").then(res => {
    t.ok(
      res.text.match(/id\=\"form-upload-multiple\"/),
      "response has form markup"
    );
  });
});

//
//  close the express server
test.onFinish(close);
