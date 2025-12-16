# API Layer

Централизованный слой для работы с API. Вся интеграционная логика вынесена из компонентов.

## Структура

```
lib/api/
├── graphql.ts       # Базовые функции для GraphQL API запросов
├── rest.ts          # Базовые функции для REST API запросов
└── directories.ts   # Специфичные функции для работы со справочниками
```

## Использование

### Через useApi() (рекомендуется)

Все API методы доступны через хук `useApi()`. Это обеспечивает:
- Централизованный доступ к API
- Легкое тестирование и мокирование
- Возможность добавления логирования, кеширования и т.д.

```typescript
"use client"

import { useApi } from "@/components/providers/api-provider"

function MyComponent() {
  const api = useApi()
  
  const handleCreate = async () => {
    await api.directories.createDirectoryItem(slug, { 
      name: "Test", 
      code: "TEST" 
    })
  }
  
  const handleFetch = async () => {
    const items = await api.directories.fetchDirectoryItemsByKind(kind)
  }
  
  // GraphQL запросы
  const handleGraphQL = async () => {
    const data = await api.graphql.graphqlRequest(query, variables)
  }
  
  // Прямые REST запросы
  const handleRest = async () => {
    const data = await api.rest.restGet(["users", id])
  }
}
```

## API Routes

Все запросы проходят через Next.js API routes:

- `/api/rest/[...path]` - проксирует REST запросы в backend
- `/api/graphql` - проксирует GraphQL запросы в Hasura

API routes автоматически добавляют авторизацию из cookies.

## Настройка

`ApiProvider` уже добавлен в `ApplicationProvider`, поэтому `useApi()` доступен во всех клиентских компонентах.

## Добавление новых API функций

1. Создайте файл в `lib/api/` для вашего домена (например, `users.ts`)
2. Используйте функции из `rest.ts` или `graphql.ts` для запросов
3. Экспортируйте типизированные функции
4. Добавьте модуль в `ApiProvider` (если нужно)
5. Используйте через `useApi()` в компонентах

Пример:

```typescript
// lib/api/users.ts
import { restGet, restPost } from "./rest"
import { graphqlRequest } from "./graphql"

// REST пример
export async function getUser(id: string) {
  return restGet<User>(["users", id])
}

export async function createUser(data: CreateUserInput) {
  return restPost<User>("users", data)
}

// GraphQL пример
export async function getUserByEmail(email: string) {
  const query = `
    query GetUser($email: String!) {
      users(where: { email: { _eq: $email } }) {
        id
        name
        email
      }
    }
  `
  return graphqlRequest<{ users: User[] }>(query, { email })
}

// В компоненте
"use client"
import { useApi } from "@/components/providers/api-provider"

function UserComponent() {
  const api = useApi()
  
  const handleLoad = async () => {
    const user = await api.directories.getUser("123") // если добавили в directories
    // или создайте отдельный модуль users и добавьте в ApiProvider
  }
}
```

### Добавление нового модуля в ApiProvider

Если вы создали новый модуль (например, `users.ts`), добавьте его в `ApiProvider`:

```typescript
// components/providers/api-provider.tsx
import * as UsersAPI from "@/lib/api/users"

type ApiContextValue = {
  directories: typeof DirectoryAPI
  graphql: typeof GraphQLAPI
  rest: typeof RestAPI
  users: typeof UsersAPI  // добавить новый модуль
}
```

