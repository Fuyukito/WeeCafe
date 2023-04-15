const { app, BrowserWindow } = require('electron')

function load_window () {
    const window = new BrowserWindow ({
        width: 800,
        height: 600,
    })
    window.loadFile('src/index.html')
}

app.whenReady().then(load_window)