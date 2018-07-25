var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    log.debug("hi");
    var memes = server.GetTitleInternalData({"Key": "memes"});
    log.info(memes);
    return { Length: memes.length };
}