var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"];
    log.info(memes.length);
    log.info(memes[0]);
    log.info(memes);
    log.info(Math.random());
    return { Length: 1 };
}