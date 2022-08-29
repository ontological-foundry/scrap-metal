export interface SignInRequest {
  /**
   * @format email
   */
  email: string

  /**
   * @minLength 15
   */
  password: string
}
