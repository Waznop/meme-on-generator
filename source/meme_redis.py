import redis
import pickle
from keys import REDIS_HOST, REDIS_PORT, REDIS_KEY
from meme_analysis import analysis_path
from meme_scrape import data_path
from glob import glob

if __name__ == "__main__":
	r = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_KEY, ssl=True)

	result = r.ping()
	if result:
		print("Started setting up Redis...")

		with open(analysis_path, "rb") as f:
			analysis = pickle.load(f)
			redis_mult, skip_base, skip_slope = analysis["redis_mult"], analysis["skip_base"], analysis["skip_slope"]

		for data_file in glob(data_path + "*.pkl"):
			with open(data_file, "rb") as f:
				item = pickle.load(f)
				key = item.link.split("/")[-1]
				val = int(redis_mult * (skip_base + item.score * skip_slope))
				r.set(key, val)
		
		print("Finished setting up Redis.")
	else:
		print("Something went wrong...")