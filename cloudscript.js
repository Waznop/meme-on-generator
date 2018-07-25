var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = JSON.parse(server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"]);
    var idx = Math.floor(Math.random() * memes.length);
    var link = imgur_prefix + memes[idx];

    return link;
}

handlers.skipMeme = function (args, context) {
    var price = args.price;

    var stats = server.GetPlayerStatistics({
        PlayFabId: currentPlayerId,
        StatisticNames: ["coins"]
    })["Statistics"];

    log.info(stats);

    var numCoins = 0;
    if (stats.length > 0) {
        numCoins = stats[0]["Value"];
    }
    
    log.info(numCoins);

    numCoins += price;

    log.info(numCoins);
    
    server.UpdatePlayerStatistics({
        PlayFabId: currentPlayerId,
        Statistics: [{
            StatisticName: "coins",
            Value: numCoins
        }]
    });
}

handlers.buyMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;
}

handlers.sellMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;
}