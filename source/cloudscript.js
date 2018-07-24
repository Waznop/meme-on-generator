var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {

    var memes = server.GetTitleInternalData({"Key": "memes"})
    return memes.length
}