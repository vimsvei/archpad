{{- with secret "kv/data/archpad" }}
{{- range $key, $value := .Data.data }}
{{ $key }}={{ $value }}
{{- end }}
{{- end }}
