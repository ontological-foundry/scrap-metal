export interface SignInRequest {
  username: string

  /**
   * @minLength 15
   */
  password: string
}
