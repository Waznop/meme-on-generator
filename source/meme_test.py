from playfab import PlayFabClientAPI, PlayFabSettings
from keys import TITLE_ID

def genericCallback(success, failure):
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
    }, genericCallback)

    PlayFabClientAPI.ExecuteCloudScript({
        "FunctionName": "getMeme",
        "GeneratePlayStreamEvent": True,
        "RevisionSelection": "Latest"
    }, genericCallback)