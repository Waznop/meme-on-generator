from playfab import PlayFabClientAPI, PlayFabSettings
from keys import TITLE_ID

def callback(success, failure):
    if success:
        print("Success!")
        print(success)
    else:
        print("Failure!")
        print(failure)

if __name__ == "__main__":
    PlayFabSettings.TitleId = TITLE_ID
    
    PlayFabClientAPI.LoginWithCustomID({
        "CustomId": "test",
        "CreateAccount": True
    }, callback)

    PlayFabClientAPI.ExecuteCloudScript({
        "FunctionName": "getMeme",
        "GeneratePlayStreamEvent": True
    }, callback)