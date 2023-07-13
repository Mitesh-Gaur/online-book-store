export const ValidateEmail = (mail: string | any) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return (false)
}

export const ValidatePhone = (phone: string | any) => {
  if (/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone)) {
    return (true)
  }
  return (false)
}

export const ValidatePassword = (password: string | any) => {
  if (password.length >= 6) {
    return (true)
  }
  return (false)
}
