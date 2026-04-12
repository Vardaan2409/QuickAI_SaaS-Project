import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.resolve(__dirname, '../debug.log');

/**
 * Appends a message to the debug.log file.
 * @param {string} tag - Tag for the log (e.g., AUTH, ARTICLE)
 * @param {string} message - Message to log
 * @param {Object} data - Optional data to stringify
 */
export const debugLog = (tag, message, data = null) => {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${tag}] ${message}`;
    if (data) {
        try {
            logMessage += ` | DATA: ${JSON.stringify(data)}`;
        } catch (e) {
            logMessage += ` | [Data Error: ${e.message}]`;
        }
    }
    logMessage += '\n';
    
    fs.appendFileSync(logFile, logMessage);
    console.log(logMessage.trim());
};
