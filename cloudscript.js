var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memesString = server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"];
    var memes = JSON.parse(memesString)
    log.info(memes.length);
    log.info(memes[0]);
    log.info(memes);
    log.info(Math.random());
    return { Length: 1 };
}