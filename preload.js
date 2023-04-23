const { contextBridge, ipcRenderer } = require('electron')

// we can also expose variables, not just functions
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    packageVersion: () => ipcRenderer.invoke("version-ch")
})

contextBridge.exposeInMainWorld('ipcControls', {
    toggleWindowOverModeEnable: () => ipcRenderer.invoke("toggle-window-over-mode-enable"),
    toggleWindowOverModeDisable: () => ipcRenderer.invoke("toggle-window-over-mode-disable"),
    openExternalLinkLatestRelease: () => ipcRenderer.invoke("open-external-link-latest-release")
})