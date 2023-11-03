var mongoose = require("mongoose");


var run = async() => {
    await mongoose.connect("mongodb+srv://lathikasunder11:QAzO462n2JzXApFi@cluster0.ve7gijl.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("connected"));
}

module.exports = {
    run
}