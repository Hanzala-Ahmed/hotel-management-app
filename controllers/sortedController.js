const userModel = require("../models/hotelSchema");

const getSortData = async (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "localhost:5000/user/sort";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      //Sort the result by name:
      var sort = { name: 1 };
      dbo.collection("hotels").find().sort(sort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
};

module.exports = {
  getSortData,
};
