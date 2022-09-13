export type message = {
  from: string,
  subject: string,
  data?: object | null,
  error?: null | {
    message: string,
  }
}