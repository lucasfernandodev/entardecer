export type requestMessage = {
  from: string,
  subject: string,
  data?: object | null,
  error?: null | {
    message: string,
    error?: null | string
  }
}