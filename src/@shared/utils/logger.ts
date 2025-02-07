export function log(message: any, ...args: any) {
  if (import.meta.env.PROD) return
  console.log(`%c ${message}`, 'color:rgb(0,180,255);background:black;', args)
}
