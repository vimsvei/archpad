terraform {
  required_version = ">= 0.13"

  required_providers {
    twc = {
      source  = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
    }
  }
}

provider "twc" {
  # Токен можно указать через переменную окружения TWC_TOKEN
  # или через переменную twc_token в terraform.tfvars
  # Провайдер автоматически использует переменную окружения TWC_TOKEN, если она установлена
  token = var.twc_token != "" ? var.twc_token : null
}

variable "twc_token" {
  description = "Timeweb Cloud API Token (опционально, можно использовать переменную окружения TWC_TOKEN)"
  type        = string
  sensitive   = true
  default     = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjFrYnhacFJNQGJSI0tSbE1xS1lqIn0.eyJ1c2VyIjoicXY4NzM2MTQiLCJ0eXBlIjoiYXBpX2tleSIsImFwaV9rZXlfaWQiOiIzZWRkOTBlYi0wYTZmLTQ4ODMtYjM4OS1iMTVjOWJiYmYwNzQiLCJpYXQiOjE3Njc5ODI3OTN9.l9XHy5jq6oWZdHmFX0CebjpFDDe7i0-9U0jDIErbjeMTXtwl8_5a1_42QtLUmQHzJ0nV6G1f0cFiP0ipWHj6f0m3sxTG2FzgHyDjOWBuygF0TULBHVdxPa9PVfJUvnfkzpsNWDq7i_msiqH3riPqXvUWeA4TApimwheoizWNQ0E3_X3j2jmQyCjzm8ArU3uC8uM4bcmqvV_Ye1b8AbM7Fpct-iPgfeO6a85WujXioT3aT4o2jz4_NHL48HlfBssIK0G2t_LeFxVp9ZH0n6TqbVYHDFxzLnUiqtak8dCNJp2BR5KChlbW_DjE1u4eNV-s_lgrfsB8mIpt7jqDm3XbwYCZubvzP7zz72VDfV7qyczaPjlUoVNOhIM3RaPYlwytIUHZxsYHn-OH1sFCRq6hAQwCxDKMc42sEzuv3cihGqctuVvGPAEN95JH6URkJU6hI4NDcldbrKMQNkWR-Zva6IUCMxqPyobVoS7n8X2VSY8uNf_ONDL8KvdVqu7ycqaj"
}

variable "project_id" {
  description = "ID существующего проекта в Timeweb Cloud"
  type        = number
  default     = 1984197
}
