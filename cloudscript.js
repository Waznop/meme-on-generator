var imgur_prefix = "https://i.imgur.com/"

function updateCoins(delta) {
    var stats = server.GetPlayerStatistics({
        PlayFabId: currentPlayerId,
        StatisticNames: ["coins"]
    })["Statistics"];

    var numCoins = 0;
    if (stats.length > 0) {
        numCoins = stats[0]["Value"];
    }
    numCoins += delta;

    server.UpdatePlayerStatistics({
        PlayFabId: currentPlayerId,
        Statistics: [{
            StatisticName: "coins",
            Value: numCoins
        }]
    });
}

handlers.getMeme = function (args, context) {
    var memes = JSON.parse(server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"]);
    var idx = Math.floor(Math.random() * memes.length);
    var link = imgur_prefix + memes[idx];

    return link;
}

handlers.skipMeme = function (args, context) {
    var price = args.price;
    updateCoins(price);
}

handlers.buyMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;
}

handlers.sellMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;
}