import fs from 'fs';

const content = fs.readFileSync('.env', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('OPENROUTER')) {
        console.log(`Line ${i + 1}: [${line}]`);
        console.log(`Char codes: ${Array.from(line).map(c => c.charCodeAt(0)).join(',')}`);
    }
}
