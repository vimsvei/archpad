import type { CreateDirectoryItemInput } from "@/services/directories.rest"

/**
 * Парсит одну строку CSV с учетом кавычек и экранированных кавычек.
 * Поддерживает значения в кавычках и запятые внутри значений.
 */
export function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Экранированная кавычка
        current += '"'
        i++ // Пропускаем следующую кавычку
      } else {
        // Начало/конец кавычек
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      // Конец поля
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  // Добавляем последнее поле
  result.push(current.trim())
  return result
}

/**
 * Парсит CSV файл со справочниками в массив объектов для создания.
 * 
 * Особенности:
 * - Порядок полей в CSV не важен
 * - Дополнительные поля, которых нет в списке поддерживаемых, игнорируются
 * - Обязательное поле: name (или "название")
 * - Необязательные поля: code, description, color, byDefault
 * - Если необязательное поле отсутствует в заголовках или имеет пустое значение - оно не добавляется
 * 
 * @param csvText - Текст CSV файла
 * @returns Массив объектов для создания элементов справочника
 * @throws Error если отсутствует обязательное поле 'name' или 'название'
 */
export function parseDirectoryCSV(csvText: string): CreateDirectoryItemInput[] {
  const lines = csvText.split("\n").filter((line) => line.trim())
  if (lines.length === 0) return []

  // Парсим заголовки (первая строка)
  // Парсер устойчив к разному порядку полей и наличию дополнительных полей
  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase().replace(/^"|"$/g, ""))

  // Находим индексы колонок по названиям (порядок не важен)
  // name - обязательное поле, остальные необязательные
  const nameIdx = headers.findIndex((h) => h === "name" || h === "название")
  if (nameIdx === -1) {
    throw new Error("CSV должен содержать колонку 'name' или 'название'")
  }

  // Необязательные поля: если их нет в заголовках, findIndex вернет -1
  const codeIdx = headers.findIndex((h) => h === "code" || h === "код")
  const descriptionIdx = headers.findIndex((h) => h === "description" || h === "описание")
  const colorIdx = headers.findIndex((h) => h === "color" || h === "цвет")
  const byDefaultIdx = headers.findIndex(
    (h) => h === "bydefault" || h === "по умолчанию" || h === "по_умолчанию"
  )

  // Парсим данные
  // Дополнительные поля, которых нет в списке выше, просто игнорируются
  // Если необязательное поле отсутствует в заголовках или имеет пустое значение - оно не добавляется
  const items: CreateDirectoryItemInput[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]).map((v) => v.replace(/^"|"$/g, "").trim())
    const name = values[nameIdx]?.trim()
    if (!name) continue // Пропускаем строки без имени

    const item: CreateDirectoryItemInput = {
      name,
    }

    // Безопасно извлекаем необязательные поля:
    // - codeIdx >= 0 проверяет, что поле найдено в заголовках
    // - values[codeIdx] проверяет, что значение существует (не undefined)
    // - trim() и проверка на пустую строку гарантируют, что добавляются только непустые значения
    if (codeIdx >= 0 && values[codeIdx]) {
      const code = values[codeIdx].trim()
      if (code) item.code = code
    }

    if (descriptionIdx >= 0 && values[descriptionIdx]) {
      const description = values[descriptionIdx].trim()
      if (description) item.description = description
    }

    if (colorIdx >= 0 && values[colorIdx]) {
      const color = values[colorIdx].trim()
      if (color) item.color = color
    }

    if (byDefaultIdx >= 0 && values[byDefaultIdx]) {
      const byDefault = values[byDefaultIdx].trim().toLowerCase()
      item.byDefault = byDefault === "true" || byDefault === "1" || byDefault === "да" || byDefault === "yes"
    }

    items.push(item)
  }

  return items
}

