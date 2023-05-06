const GetCurrentVersion = async () => {
    const response = await window.versions.packageVersion()
    return response
}

getNewUpdate()
const newUpdateDivElement = document.getElementById("newUpdateDiv")
async function getNewUpdate(){
    let releaseRes = await fetch('https://api.github.com/repos/UrazDuray/udcalculator/releases/latest')
    let releaseJson = await releaseRes.json()
    
    const currentVers = await GetCurrentVersion()
    document.getElementById("currentVersionSpan").textContent = currentVers
    if(!VersionIsUpToDate(currentVers, releaseJson.tag_name)){        
        newUpdateDivElement.style.display = "inline-block"
    }
}

function VersionIsUpToDate(currentVers, latestVers){
    const currentVersNum = parseInt(currentVers.replaceAll('.', ''))
    const latestVersNum = parseInt(latestVers.replaceAll('.',''))
    if(latestVersNum > currentVersNum){
        return false
    }
    return true
}