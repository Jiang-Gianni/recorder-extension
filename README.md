# recorder-extension

### Download

```bash
git clone https://github.com/Jiang-Gianni/recorder-extension
cd recorder-extension
rm -rf .git
```

### Install

```bash
npm i
npm build
```

Copy / rename the output `dist` folder in a directory of your preference: this folder contains `manifest.json` enabling it to be used as a browser extension.

### Adding to the browser

For Chrome based browsers like [Brave](https://brave.com/download/):

1. Navigate to `brave://extensions/`
2. Enable `Developer mode`
3. Select `Load unpacked`
4. Select the previous `dist` folder (or its new directory where it has been moved)
5. Start using the extension


### How to use

Once the extension is run, a new browser tab will appear with all the currently opened pages.

By selecting one of the tab ID, a sets of ports / channels are opened between the extension and the selected tab.

The extension will record the xPath (starting from the body) of any click (in order).

Press `Ctrl` to start recording a text writing. Press `Ctrl` again to stop the recording.

Download the `json` format of the steps and use it to automate testing using a tool like Selenium.