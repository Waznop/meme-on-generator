import pickle
import numpy as np
import matplotlib.pyplot as plt
from glob import glob
from meme_scrape import data_path

analysis_path = "./analysis.pkl"

data_list = []
for data_file in glob(data_path + "*.pkl"):
    with open(data_file, "rb") as f:
        item = pickle.load(f)
        data_list.append((item.score, item.id))

min_score = min(data_list)[0]
max_score = max(data_list)[0]
num_memes = len(data_list)
total_score = sum(el[0] for el in data_list)
avg_score = total_score / num_memes

# price = base + score * slope
skip_slope = 0.01
skip_base = -min_score * skip_slope + 1
skip_flux = 0.99
buy_mult = 50
buy_flux = 1.1
sell_mult = 0.5 * buy_mult
sell_flux = 1 / buy_flux
redis_mult = 100
int_mult = 1 / redis_mult

analysis = {
    "min_score": min_score,
    "max_score": max_score,
    "avg_score": avg_score,
    "num_memes": num_memes,
    "skip_base": skip_base,
    "skip_slope": skip_slope,
    "skip_flux": skip_flux,
    "buy_mult": buy_mult,
    "buy_flux": buy_flux,
    "sell_mult": sell_mult,
    "sell_flux": sell_flux,
    "redis_mult": redis_mult,
    "int_mult": int_mult
}

with open(analysis_path, "wb") as f:
    pickle.dump(analysis, f, pickle.HIGHEST_PROTOCOL)
    print("Updated analysis file.")

if __name__ == "__main__":
    print(analysis)
    plt.hist([el[0] for el in data_list])
    plt.show()