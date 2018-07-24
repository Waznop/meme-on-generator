from imgurpython import ImgurClient
from keys import CLIENT_ID, CLIENT_SECRET
import requests
import pickle

data_path = "./data/"
page_path = "./page.pkl"
page_start = 0
page_range = 10
max_size = 20000000 # 20MB
valid_types = ["image/gif", "image/jpeg", "image/png"]

def isValid(item):
    return not item.nsfw and not item.is_album and item.type in valid_types and item.size < max_size

try:
    with open(page_path, "rb") as f:
        page_start = pickle.load(f)
        print("Starting at page {}.".format(page_start))
except FileNotFoundError:
    with open(page_path, "wb") as f:
        pickle.dump(page_start, f, pickle.HIGHEST_PROTOCOL)
        print("Starting fresh at page 0.")

client = ImgurClient(CLIENT_ID, CLIENT_SECRET)

for page in range(page_start, page_start + page_range):
    items = client.memes_subgallery(page=page)
    for item in items:
        if isValid(item):
            media_name = data_path + item.link.split("/")[-1]
            r = requests.get(item.link, allow_redirects=True)
            with open(media_name, "wb") as f:
                f.write(r.content)
            meta_name = data_path + item.id + ".pkl"
            with open(meta_name, "wb") as f:
                pickle.dump(item, f, pickle.HIGHEST_PROTOCOL)
            print(page, item.id, item.width, item.height, item.size, item.link, item.score)
    with open(page_path, "wb") as f:
        pickle.dump(page+1, f, pickle.HIGHEST_PROTOCOL)

print(client.get_credits())