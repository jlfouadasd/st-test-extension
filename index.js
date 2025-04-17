//You'll likely need to import extension_settings, getContext, and loadExtensionSettings from extensions.js
import { extension_settings, getContext, loadExtensionSettings } from "../../../extensions.js";

//You'll likely need to import some other functions from the main script
import { saveSettingsDebounced } from "../../../../script.js";

// Keep track of where your extension is located, name should match repo name
const extensionName = "st-test-extension";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {};

// This function is called when the extension is loaded
jQuery(async () => {
  toastr.info(
    "A popup appeared because you clicked the button!"
  );
});
