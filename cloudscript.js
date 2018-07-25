var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"];
    log.info(memes.length);
    return { Length: 1 };
}