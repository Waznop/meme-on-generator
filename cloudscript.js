var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"];
    log.info(len(memes));
    log.info(memes[0]);
    return { Length: memes.length };
}