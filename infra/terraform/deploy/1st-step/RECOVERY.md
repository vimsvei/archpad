# Восстановление после ошибки удаления Traefik

## Проблема
Helm release Traefik не может быть удален - зависло на удалении более 5 минут.

## Решение 1: Повторить terraform apply
```bash
terraform apply
```

Если не помогает, переходите к Решению 2.

## Решение 2: Удалить ресурс из state и пересоздать

Если `terraform apply` снова зависает, можно удалить ресурс из state вручную:

```bash
# Удалить helm_release.traefik из state
terraform state rm helm_release.traefik

# Попробовать применить снова
terraform apply
```

## Решение 3: Очистить состояние полностью и начать заново

Если ничего не помогает:

```bash
# Удалить все ресурсы Traefik из state
terraform state rm helm_release.traefik
terraform state rm time_sleep.wait_for_traefik_crd
terraform state rm data.kubernetes_service.traefik
terraform state rm null_resource.vault_ingressroute

# Попробовать применить снова
terraform apply
```

## Решение 4: Вручную удалить через kubectl (если доступен)

Если у вас есть доступ к kubectl:

```bash
# Получить список Helm releases
helm list -n traefik --kubeconfig=../../init/kubeconfig.yaml

# Принудительно удалить release (если он существует)
helm uninstall traefik -n traefik --kubeconfig=../../init/kubeconfig.yaml --timeout 5m

# Затем повторить terraform apply
terraform apply
```

## Что изменено для предотвращения проблемы в будущем

1. Добавлен `atomic = false` - не ждать завершения всех операций удаления
2. Добавлен `cleanup_on_fail = false` - не удалять ресурсы при ошибке
3. Добавлен `disable_webhooks = true` - отключить вебхуки для более быстрого удаления
4. Увеличен timeout до 900 секунд (15 минут)

## Рекомендация

**Сначала попробуйте Решение 1** - просто выполните `terraform apply` снова. 
Часто LoadBalancer успевает удалиться между попытками, и повторное применение проходит успешно.