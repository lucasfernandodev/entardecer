export type requestMessage = {
  from: string,
  to: string,
  subject: string,
  data?: any | null,
  error?: null | {
    message: string,
    error?: null | string
  }
}
