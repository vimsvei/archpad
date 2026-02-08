/**
 * Правила размеров для элементов схем ArchiMate
 * Централизованное определение ширины различных типов объектов схем
 */

/**
 * Ширина для основных блоков контента компонента
 * (интерфейсы, функции, события, объекты данных)
 */
export const CONTENT_BLOCK_WIDTH = 305 // px

/**
 * Минимальная ширина для технологических блоков
 * (системное ПО, артефакты/продукты)
 */
export const TECHNOLOGY_BLOCK_MIN_WIDTH = 150 // px

/**
 * Максимальная ширина контейнера технологических блоков
 * Должна быть достаточной для размещения двух блоков в одну строку
 * с учетом их минимальной ширины, gap и padding (px-3 = 12px с каждой стороны)
 */
export const TECHNOLOGY_BLOCKS_CONTAINER_MAX_WIDTH = TECHNOLOGY_BLOCK_MIN_WIDTH * 2 + 5 + 24 // px (2 блока + gap + padding)

/**
 * Минимальная ширина для связанных компонентов (не основного)
 */
export const RELATED_COMPONENT_MIN_WIDTH = 250 // px

/**
 * Минимальная ширина для блоков Data Object при горизонтальном размещении
 * Должна позволять разместить имя в две строки (line-clamp-2)
 */
export const DATA_OBJECT_BLOCK_MIN_WIDTH = 150 // px

/**
 * Максимальная ширина контейнера для Data Objects при горизонтальном размещении
 * Должна быть достаточной для размещения двух блоков в одну строку
 * с учетом их минимальной ширины, gap и padding (px-3 = 12px с каждой стороны)
 * Использует ту же формулу, что и для технологических блоков
 */
export const DATA_OBJECT_BLOCKS_CONTAINER_MAX_WIDTH = DATA_OBJECT_BLOCK_MIN_WIDTH * 2 + 5 + 24 // px (2 блока + gap + padding)

/**
 * Максимальная ширина для отдельного блока Data Object
 * Ограничивает расширение блока, чтобы два блока могли поместиться в одну строку
 * Рассчитывается как (CONTENT_BLOCK_WIDTH - padding - gap) / 2
 * Контейнер ограничен CONTENT_BLOCK_WIDTH, padding = 24px (12px с каждой стороны), gap = 5px
 */
export const DATA_OBJECT_BLOCK_MAX_WIDTH = Math.floor((CONTENT_BLOCK_WIDTH - 24 - 5) / 2) // px

