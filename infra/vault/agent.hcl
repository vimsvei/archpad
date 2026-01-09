pid_file = "/tmp/vault-agent.pid"

vault {
  address = "http://vault:8200"
}

auto_auth {
  method "token" {
    config = {
      token = "archpad-token"
    }
  }

  sink "file" {
    config = {
      path = "/tmp/vault-token"
    }
  }
}

template {
  source      = "/vault-config/templates/secrets.env.tpl"
  destination = "/tmp/vault-secrets.env"
  perms       = 0600
  command     = "sh -c 'set -a && . /tmp/vault-secrets.env && set +a'"
}
