import redis
import pickle
from keys import REDIS_HOST, REDIS_PORT, REDIS_KEY
from meme_analysis import analysis_path

r = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_KEY, ssl=True)

result = r.ping()
print(result)

with open(analysis_path, "rb") as f:
	analysis = pickle.load(f)
	print(analysis)