export enum PasswordErrors {
  SHORT = 'Password is to short!',
  NO_UPPER_CASE = 'Upper case letter required!',
  NO_LOWER_CASE = 'Lower case letter required!',
  NO_NUMBER = 'At least one number required!',
}

export interface CheckResult {
  valid: boolean
  reasons: PasswordErrors[]
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = []

    this.checkForLength(password, reasons)
    this.checkLowerCase(password, reasons)
    this.checkUpperCase(password, reasons)

    return {
      valid: reasons.length > 0 ? false : true,
      reasons: reasons,
    }
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password)
    this.checkForNumber(password, basicCheck.reasons)
    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    }
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER)
    }
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT)
    }
  }

  private checkUpperCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE)
    }
  }

  private checkLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE)
    }
  }
}
