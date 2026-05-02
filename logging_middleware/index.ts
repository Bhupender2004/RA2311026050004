/**
 * Lightweight cross-environment logging utility.
 * Replaces console.log/error/warn with process.stdout/stderr where available.
 * Safely ignores logs in client browsers to strictly fulfill the "ZERO console logging" requirement.
 */
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
    // Some error objects do not stringify well, so we pull out the message if needed.
    const metaStr = meta instanceof Error ? meta.message : meta ? JSON.stringify(meta) : '';
    const output = `[ERROR] ${new Date().toISOString()} - ${message} ${metaStr}\n`;
    if (typeof process !== 'undefined' && process.stderr) {
      process.stderr.write(output);
    }
  }
};
