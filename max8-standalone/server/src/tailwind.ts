import { spawn } from 'child_process';
import { resolve } from 'path';

function watch(input: string, output: string, onUpdated?: () => void) {
  const tailwindCommand = resolve('../node_modules/.bin/tailwindcss');

  const child = spawn(tailwindCommand, [
    '--config', resolve('../tailwind.config.js'),
    '-i', resolve(input),
    '-o', resolve(output),
    '--watch'
  ]);

  child.stdout.on('data', (data) => {
    console.log(`Tailwind: ${data}`);
  });

  child.stderr.on('data', (data) => {
    const msg = `${data}`;
    if (!msg) return;
    
    console.error(`Tailwind Error: ${msg}`);
    if (onUpdated && msg.toLowerCase().startsWith('done')) {
      onUpdated();
    }
  });

  child.on('close', (code) => {
    console.log(`Tailwind process exited with code ${code}`);
  });

  return child;
}

export default {
  watch,
}