/**
 * Цвета для схем ArchiMate согласно мета-модели
 * Эти цвета соответствуют слоям архитектуры ArchiMate
 * 
 * Цвета можно редактировать здесь для изменения внешнего вида схем
 */

export const ARCHIMATE_LAYER_COLORS = {
  /** Strategy layer - светло-оранжевый */
  strategy: {
    light: "#FFE5CC", // светлый фон
    dark: "#FFB366",  // темный вариант (для темной темы)
  },
  /** Business layer - светло-желтый */
  business: {
    light: "#FFFFAF",
    dark: "#FFFF66",
  },
  /** Application layer - светло-синий */
  application: {
    light: "#62FCFC",
    dark: "#00D4D4",
  },
  /** Technology layer - светло-зеленый */
  technology: {
    light: "#B3FFB3",
    dark: "#66FF66",
  },
  /** Physical layer - светло-зеленый (как Technology) */
  physical: {
    light: "#B3FFB3",
    dark: "#66FF66",
  },
  /** Implementation & Migration layer - светло-красный */
  implementation: {
    light: "#FFCCCC",
    dark: "#FF6666",
  },
} as const

/**
 * Получить цвет фона для слоя в зависимости от темы
 */
export function getLayerBackgroundColor(layer: keyof typeof ARCHIMATE_LAYER_COLORS, isDark: boolean = false): string {
  return ARCHIMATE_LAYER_COLORS[layer][isDark ? "dark" : "light"]
}

/**
 * Цвета для объектов схем (по умолчанию используется Application layer)
 */
export const SCHEMA_NODE_COLORS = {
  /** Основной фон узла Application Component */
  applicationComponent: ARCHIMATE_LAYER_COLORS.application.light,
  applicationComponentDark: ARCHIMATE_LAYER_COLORS.application.dark,
} as const
