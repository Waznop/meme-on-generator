var imgur_prefix = "https://i.imgur.com/"

handlers.getMeme = function (args, context) {
    var memes = JSON.parse(server.GetTitleInternalData({"Key": "memes"})["Data"]["memes"]);
    var idx = Math.floor(Math.random() * memes.length);
    var link = imgur_prefix + memes[idx];

    return link;
}