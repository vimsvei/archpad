"use client"

import { useCallback, useRef } from "react"
import type { ReactFlowInstance } from "@xyflow/react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

/**
 * Хук для экспорта схемы ReactFlow в изображение (PNG) или PDF
 * 
 * Использует html2canvas для конвертации DOM в canvas, затем:
 * - PNG: сохраняет canvas как изображение
 * - PDF: конвертирует canvas в PDF через jsPDF
 * 
 * Обе библиотеки свободно распространяемые (MIT лицензия)
 */
export function useSchemaExport(reactFlowInstance: ReactFlowInstance | null, schemaName?: string) {
  const isExportingRef = useRef(false)

  const exportToPNG = useCallback(async () => {
    if (!reactFlowInstance || isExportingRef.current) return

    isExportingRef.current = true
    try {
      const nodes = reactFlowInstance.getNodes()
      
      if (nodes.length === 0) {
        alert("Нет узлов для экспорта")
        return
      }

      // Получаем DOM элемент ReactFlow
      const reactFlowElement = document.querySelector(".react-flow") as HTMLElement
      if (!reactFlowElement) {
        alert("Не удалось найти элемент схемы")
        return
      }

      // Конвертируем в canvas весь viewport
      const canvas = await html2canvas(reactFlowElement, {
        backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
        scale: 2, // Увеличиваем разрешение для лучшего качества
        useCORS: true,
        logging: false,
        windowWidth: reactFlowElement.scrollWidth,
        windowHeight: reactFlowElement.scrollHeight,
      })

      // Создаем ссылку для скачивания
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `${schemaName || "schema"}-${new Date().toISOString().split("T")[0]}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Ошибка при экспорте в PNG:", error)
      alert("Не удалось экспортировать схему в PNG")
    } finally {
      isExportingRef.current = false
    }
  }, [reactFlowInstance, schemaName])

  const exportToPDF = useCallback(async () => {
    if (!reactFlowInstance || isExportingRef.current) return

    isExportingRef.current = true
    try {
      const nodes = reactFlowInstance.getNodes()
      
      if (nodes.length === 0) {
        alert("Нет узлов для экспорта")
        return
      }

      const reactFlowElement = document.querySelector(".react-flow") as HTMLElement
      if (!reactFlowElement) {
        alert("Не удалось найти элемент схемы")
        return
      }

      // Конвертируем в canvas
      const canvas = await html2canvas(reactFlowElement, {
        backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: reactFlowElement.scrollWidth,
        windowHeight: reactFlowElement.scrollHeight,
      })

      const width = canvas.width
      const height = canvas.height

      // Создаем PDF (jsPDF 3.x API)
      // В версии 3.x format принимает строку или массив [width, height] в мм
      // Конвертируем пиксели в мм (1px ≈ 0.264583mm при 96 DPI)
      const mmWidth = width * 0.264583
      const mmHeight = height * 0.264583
      
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "mm",
        format: [mmWidth, mmHeight],
      })

      // Добавляем изображение в PDF (координаты в мм)
      const imgData = canvas.toDataURL("image/png")
      pdf.addImage(imgData, "PNG", 0, 0, mmWidth, mmHeight)

      // Сохраняем PDF
      pdf.save(`${schemaName || "schema"}-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Ошибка при экспорте в PDF:", error)
      alert("Не удалось экспортировать схему в PDF")
    } finally {
      isExportingRef.current = false
    }
  }, [reactFlowInstance, schemaName])

  return {
    exportToPNG,
    exportToPDF,
    isExporting: isExportingRef.current,
  }
}

