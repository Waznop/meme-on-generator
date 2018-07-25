var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = JSON.parse(server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"]);
    var idx = Math.floor(Math.random() * memes.length);
    var link = imgur_prefix + memes[idx];

    return link;
}

handlers.skipMeme = function (args, context) {
    var price = args.price;

    log.info(price);

    var result = server.GetPlayerStatistics({
        PlayFabId: currentPlayerId,
        StatisticNames: ["Coins"]
    });

    log.info(result);

    var numCoins = JSON.parse(result)["data"]["Statistics"][0]["Value"];
    
    log.info(numCoins);

    numCoins += price;

    log.info(numCoins);
    
    server.UpdatePlayerStatistics({
        PlayFabId: currentPlayerId,
        Statistics: [{
            StatisticName: "Coins",
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