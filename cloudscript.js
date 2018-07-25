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
    var data = server.GetUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Keys: ["memes"]
    })["Data"];

    if ("memes" in data) {
        return JSON.parse(data["memes"]["Value"]);
    }
    
    return [];
}

function setMemes(memes) {
    server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: {
            memes: JSON.stringify(memes)
        }
    });
    // TODO: check success
    return true;
}

function grantMeme(meme) {
    var memes = getMemes();
    memes.push(meme);
    return setMemes(memes);
}

function removeMeme(meme) {
    var memes = getMemes();
    var idx = memes.indexOf(meme);
    if (idx !== -1) {
        memes.splice(idx, 1);
        return setMemes(memes);
    }
    return false;
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