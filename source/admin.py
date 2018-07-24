from playfab import PlayFabAdminAPI, PlayFabSettings
from keys import TITLE_ID, DEVELOPER_SECRET

PlayFabSettings.TitleId = TITLE_ID
PlayFabSettings.DeveloperSecretKey = DEVELOPER_SECRET

request = {}

def callback(success, failure):
	if success:
		print(success)
	else:
		print(failure)

PlayFabAdminAPI.GetContentList(request, callback)