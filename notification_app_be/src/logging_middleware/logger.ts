export const logger = {
  info: (message: string, meta?: any) => {
    const output = `[INFO] ${new Date().toISOString()} - ${message} ${meta ? JSON.stringify(meta) : ''}\n`;
    if (typeof process !== 'undefined' && process.stdout) {
      process.stdout.write(output);
    }
  },
  warn: (message: string, meta?: any) => {
    const output = `[WARN] ${new Date().toISOString()} - ${message} ${meta ? JSON.stringify(meta) : ''}\n`;
    if (typeof process !== 'undefined' && process.stdout) {
      process.stdout.write(output);
    }
  },
  error: (message: string, meta?: any) => {
    const metaStr = meta instanceof Error ? meta.message : meta ? JSON.stringify(meta) : '';
    const output = `[ERROR] ${new Date().toISOString()} - ${message} ${metaStr}\n`;
    if (typeof process !== 'undefined' && process.stderr) {
      process.stderr.write(output);
    }
  }
};
