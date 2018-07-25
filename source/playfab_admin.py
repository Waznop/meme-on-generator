import pickle
import json
from playfab import PlayFabAdminAPI, PlayFabSettings
from keys import TITLE_ID, DEVELOPER_SECRET
from meme_scrape import data_path
from meme_analysis import analysis_path
from glob import glob

def genericCallback(success, failure):
	if success:
		print("Success!")
		print(success)
	else:
		print("Failure!")
		print(failure)

if __name__ == "__main__":
	PlayFabSettings.TitleId = TITLE_ID
	PlayFabSettings.DeveloperSecretKey = DEVELOPER_SECRET

	data_list = []
	for data_file in glob(data_path + "*.pkl"):
		with open(data_file, "rb") as f:
			item = pickle.load(f)
			data_list.append(item.link.split("/")[-1])

	PlayFabAdminAPI.SetTitleData({
		"Key": "memes",
		"Value": json.dumps(data_list)
	}, None)

	with open(analysis_path, "rb") as f:
		analysis = pickle.load(f)
		for k, v in analysis.items():
			PlayFabAdminAPI.SetTitleData({
				"Key": k,
				"Value": v
			}, None)

	print("Finished uploading TitleData.")


