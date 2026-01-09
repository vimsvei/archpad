# читать секреты в kv/data/archpad и всех подпутях
path "kv/data/archpad" {
  capabilities = ["read"]
}

path "kv/data/archpad/*" {
  capabilities = ["read"]
}

# читать метаданные (нужно для KV v2)
path "kv/metadata/archpad" {
  capabilities = ["read", "list"]
}

path "kv/metadata/archpad/*" {
  capabilities = ["read", "list"]
}

# Дополнительные пути на случай, если CLI использует другой формат
path "kv/data/data/archpad" {
  capabilities = ["read"]
}

path "kv/data/data/archpad/*" {
  capabilities = ["read"]
}
