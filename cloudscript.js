var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = server.GetTitleInternalData({"Key": "memes"});
    log.info(memes["Data"]);
    return { Length: 1 };
}