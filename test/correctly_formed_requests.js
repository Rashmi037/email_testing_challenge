var expect = require("chai").expect,
  supertest = require("supertest"),
  api = supertest("http://localhost:8080");

describe("Email Service Should Send Mail For Correctly Formed Requests", function() {
  var postData = JSON.stringify({
    to: [{ email: "to_valid_1@gmail.com" }],
    cc: [],
    bcc: [],
    from: "from_valid@gmail.com",
    subject: "something",
    text: "something"
  });
  it("should send email for valid request", function(done) {
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.equal(true);
        done();
      });
  });
});

describe("Email Service Should Send Mail For Mutiple Recipients", function() {
  it("multiple valid recipients in to-field", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_2@gmail.com" }
      ],
      cc: [],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(30000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
  it("multiple valid recipients in cc-field", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [
        { email: "cc_valid_1@gmail.com" },
        { email: "cc_valid_2@gmail.com" }
      ],
      bcc: [],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
  it("multiple valid recipients in bcc-field with cc-field empty", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [],
      bcc: [
        { email: "bcc_valid_1@gmail.com" },
        { email: "bcc_valid_2@gmail.com" }
      ],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(10000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
  it("multiple valid recipients in bcc-field and cc-field", function(done) {
    var postData = JSON.stringify({
      to: [{ email: "to_valid_1@gmail.com" }],
      cc: [
        { email: "cc_valid_1@gmail.com" },
        { email: "cc_valid_2@gmail.com" }
      ],
      bcc: [
        { email: "bcc_valid_1@gmail.com" },
        { email: "bcc_valid_2@gmail.com" }
      ],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
  it("multiple valid recipients in to, cc and bcc-fields", function(done) {
    var postData = JSON.stringify({
      to: [
        { email: "to_valid_1@gmail.com" },
        { email: "to_valid_2@gmail.com" },
        { email: "to_valid_3@gmail.com" },
        { email: "to_valid_4@gmail.com" },
        { email: "to_valid_5@gmail.com" },
        { email: "to_valid_6@gmail.com" },
        { email: "to_valid_7@gmail.com" },
        { email: "to_valid_8@gmail.com" },
        { email: "to_valid_9@gmail.com" },
        { email: "to_valid_10@gmail.com" }
      ],
      cc: [
        { email: "cc_valid_1@gmail.com" },
        { email: "cc_valid_2@gmail.com" },
        { email: "cc_valid_3@gmail.com" },
        { email: "cc_valid_4@gmail.com" },
        { email: "cc_valid_5@gmail.com" },
        { email: "cc_valid_6@gmail.com" },
        { email: "cc_valid_7@gmail.com" },
        { email: "cc_valid_8@gmail.com" },
        { email: "cc_valid_9@gmail.com" },
        { email: "cc_valid_10@gmail.com" }
      ],
      bcc: [
        { email: "bcc_valid_1@gmail.com" },
        { email: "bcc_valid_2@gmail.com" },
        { email: "bcc_valid_3@gmail.com" },
        { email: "bcc_valid_4@gmail.com" },
        { email: "bcc_valid_5@gmail.com" },
        { email: "bcc_valid_6@gmail.com" },
        { email: "bcc_valid_7@gmail.com" },
        { email: "bcc_valid_8@gmail.com" },
        { email: "bcc_valid_9@gmail.com" },
        { email: "bcc_valid_10@gmail.com" }
      ],
      from: "from_valid@gmail.com",
      subject: "something",
      text: "something"
    });
    this.timeout(20000);
    api
      .post("/sendMail")
      .set("Content-Type", "application/json")
      .send(postData)
      .end(function(err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal(true);
        done();
      });
  });
});
