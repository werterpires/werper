import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { ErrorsUtils } from './errors.utils'

@Injectable()
export class ValidatesService {
  constructor(private readonly errorsUtils: ErrorsUtils) {}

  cpfRegex = /^\d{11}$/
  validateCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]/g, '') // Remove caracteres não numéricos

    // Verifica se a senha é válido
    if (!this.cpfRegex.test(cpf)) {
      return false
    }
    if (/^(\d)\1+$/.test(cpf)) {
      return false
    }

    // Calcula o primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    let digit1 = 11 - (sum % 11)
    if (digit1 > 9) {
      digit1 = 0
    }

    // Calcula o segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    let digit2 = 11 - (sum % 11)
    if (digit2 > 9) {
      digit2 = 0
    }

    // Verifica se os dígitos verificadores calculados são iguais aos dígitos do CPF
    if (
      digit1 !== parseInt(cpf.charAt(9)) ||
      digit2 !== parseInt(cpf.charAt(10))
    ) {
      return false
    }

    return true
  }

  validateCnpj(cnpj: string): boolean {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]/g, '')

    // Verificar se o CNPJ possui 14 dígitos
    if (cnpj.length !== 14) {
      return false
    }

    // Verificar se todos os dígitos são iguais (situação inválida para CNPJ)
    if (/^(\d)\1+$/.test(cnpj)) {
      return false
    }

    // Calcular os dígitos verificadores
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    const digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
      if (pos < 2) {
        pos = 9
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    // Verificar o primeiro dígito verificador
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
      return false
    }

    tamanho += 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
      if (pos < 2) {
        pos = 9
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    // Verificar o segundo dígito verificador
    return resultado === parseInt(digitos.charAt(1), 10)
  }

  validateEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  }

  validatePerson(
    cpf: string | null,
    cnpj: string | null,
    email: string | null,
    date: string | null
  ): string {
    let errorMessage = '#'
    if (cpf) {
      if (!this.validateCpf(cpf)) {
        errorMessage += '/CPF inválido/ '
      }
    }
    if (cnpj) {
      if (!this.validateCnpj(cnpj)) {
        errorMessage += '/CNPJ inválido/ '
      }
    }
    if (email) {
      if (!this.validateEmail(email)) {
        errorMessage += '/Email inválido/ '
      }
    }
    if (date) {
      if (!this.validateDate(date)) {
        errorMessage += '/Data inválida/ '
      }
    }

    errorMessage.trim()
    return errorMessage
  }

  validateDate(date: string): boolean {
    const dateRegex = /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/

    return !isNaN(Date.parse(date)) && dateRegex.test(date)
  }
}
