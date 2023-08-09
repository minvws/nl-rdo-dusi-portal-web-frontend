export function log(message: any, ...args: any) {
  if (import.meta.env.PROD) return
  console.log(message, args)
}
