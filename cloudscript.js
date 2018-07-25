var imgur_prefix = "https://i.imgur.com/"

function getCoins() {
    var stats = server.GetPlayerStatistics({
        PlayFabId: currentPlayerId,
        StatisticNames: ["coins"]
    })["Statistics"];

    var numCoins = 0;
    if (stats.length > 0) {
        numCoins = stats[0]["Value"];
    }

    return numCoins;
}

function updateCoins(delta) {
    numCoins = getCoins() + delta;

    if (numCoins < 0) {
        return false;
    }

    server.UpdatePlayerStatistics({
        PlayFabId: currentPlayerId,
        Statistics: [{
            StatisticName: "coins",
            Value: numCoins
        }]
    });

    return true;
}

function getMemes() {
    var memes = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: ["memes"]
    });
    
    log.info(memes);
    var test1 = memes["memes"];
    log.info(test1);
    var test2 = test1["Value"];
    log.info(test2);

    return test2;
}

function grantMeme(meme) {
    var memes = getMemes();
    return true;
}

function removeMeme(meme) {
    var memes = getMemes();
    return true;
}

handlers.getMeme = function (args, context) {
    var memes = JSON.parse(server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"]);
    var idx = Math.floor(Math.random() * memes.length);
    var link = imgur_prefix + memes[idx];

    return link;
}

handlers.skipMeme = function (args, context) {
    var price = args.price;
    return updateCoins(price);
}

handlers.buyMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;

    if (updateCoins(-price)) {
        return grantMeme(meme);
    }

    return false;
}

handlers.sellMeme = function (args, context) {
    var meme = args.meme;
    var price = args.price;

    if (removeMeme(meme)) {
        return updateCoins(price);
    }

    return false;
}