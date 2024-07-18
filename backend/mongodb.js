const mongoose = require('mongoose');
const mongoURI = "mongodb://ankit2020cs142:Ankit$123456@ac-1wf8st9-shard-00-00.fnzk20j.mongodb.net:27017,ac-1wf8st9-shard-00-01.fnzk20j.mongodb.net:27017,ac-1wf8st9-shard-00-02.fnzk20j.mongodb.net:27017/machinetask?ssl=true&replicaSet=atlas-x8yyl6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";


async function dbConnect() {

    await mongoose.connect(mongoURI).then(async () => {

        console.log("Connected Successfully !!");
        const list_view = await mongoose.connection.db.collection('listviews')
        await list_view.find({}).toArray().then(
            async (data, err) => {
                if (err) {
                    console.log("---", err);
                } else {
                    global.list_view_data = data;                   
                }
            })

    }).catch((err) => {
        console.log("---", err);
    });


}

module.exports = dbConnect();