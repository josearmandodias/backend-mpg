declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CB_USER: string,
      CB_PASS: string,
      CB_URL: string,
      CB_BUCKET: string
    }
  }
}
export {}