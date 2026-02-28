"use client";

import ReactECharts from "echarts-for-react";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { RiskGaugeProps } from "@/types";

export function RiskGauge({ score }: RiskGaugeProps) {
  // Aseguramos que el score se mantenga estrictamente entre los límites de 0 y 100
  const normalized = Math.min(100, Math.max(0, score));

  // Obtenemos el tema actual (light/dark) de next-themes para adaptar el contraste
  const { resolvedTheme } = useTheme();

  // Definimos dinámicamente el color del texto y la aguja dependiendo del tema
  // Para modo oscuro usamos un texto claro (#f8fafc) y para modo claro usamos un texto oscuro (#0f172a)
  const textColor = resolvedTheme === "dark" ? "#f8fafc" : "#0f172a";

  // useMemo memoriza la configuración del gráfico y evita recalcularla en cada re-render.
  // Solo se recalcula cuando cambian los valores dependientes (normalized o textColor).
  const option = useMemo(
    () => ({
      series: [
        {
          type: "gauge", // Tipo de gráfico: Medidor o velocímetro

          // Configuración de los ángulos para formar un semicírculo en lugar de un círculo completo
          startAngle: 180, // Empieza en la izquierda (grado 180)
          endAngle: 0, // Termina en la derecha (grado 0)

          // Escala general de valores
          min: 0,
          max: 100,

          splitNumber: 4, // Cantidad de grandes divisiones o bloques en la escala
          radius: "100%", // Ocupa todo el espacio de su contenedor sin padding extra
          center: ["50%", "75%"], // Desplaza el centro del gráfico hacia abajo para aprovechar mejor el espacio rectangular

          // Configuración de la aguja o puntero
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z", // Dibuja una flecha triangular mediante un trazado SVG personalizado
            length: "55%", // Define la longitud del puntero respecto al radio del medidor
            width: 8, // Anchura de la aguja
            offsetCenter: [0, "-15%"], // Desplaza el punto de anclaje de la aguja levemente hacia arriba
            itemStyle: {
              color: textColor, // La aguja adopta el color dinámico dependiendo del tema
            },
          },

          // Línea base del eje o arco superior de color
          axisLine: {
            lineStyle: {
              width: 30, // Grosor o espesor del arco de color

              // Define el mapa de colores a lo largo del arco, basado en fracciones de 0 a 1 (porcentajes de 0 a 100%)
              color: [
                [0.3, "#22c55e"], // Verde (del 0% al 30%) - Nivel Bajo
                [0.6, "#eab308"], // Amarillo (del 30% al 60%) - Nivel Medio
                [0.8, "#f97316"], // Naranja (del 60% al 80%) - Nivel Alto
                [1, "#ef4444"], // Rojo (del 80% al 100%) - Nivel Crítico
              ],
            },
          },

          // Marcas pequeñas intermedias en el arco de color
          axisTick: {
            splitNumber: 5, // Cantidad de de sub-secciones dentro de cada sección principal
            length: 8, // Distancia/largo de cada marquita
            lineStyle: {
              color: "auto", // Usará automáticamente el color sobre el que esté posicionado (verde, amarillo, etc)
              width: 1, // Grosor de la línea
            },
          },

          // Líneas o separadores gruesos que dividen el medidor en las 4 grandes secciones
          splitLine: {
            length: 15,
            lineStyle: {
              color: "auto",
              width: 3,
            },
          },

          // Etiquetas de texto asociadas a la escala numérica
          axisLabel: {
            color: textColor,
            fontSize: 12,
            distance: -50, // Distancia "negativa" para empujar el texto hacia ADENTRO del arco
            formatter: (value: number) => {
              // Sólo mostramos texto posicionado en valores intermedios precisos
              // para rotular las 4 diferentes zonas dentro del gráfico
              if (value === 15) return "Bajo"; // Zona de 0 a 30
              if (value === 45) return "Medio"; // Zona de 30 a 60
              if (value === 70) return "Alto"; // Zona de 60 a 80
              if (value === 90) return "Crítico"; // Zona de 80 a 100
              return ""; // Ocultar el resto de los números
            },
          },

          // Configuración del título local del gauge integrado (si se usara)
          title: {
            offsetCenter: [0, "-20%"],
            fontSize: 16,
            color: textColor,
          },

          // Información grande principal y precisa en el centro del componente
          detail: {
            fontSize: 36,
            offsetCenter: [0, "10%"], // Se ancla justo debajo del inicio del puntero
            formatter: "{value}", // Muestra el input en crudo ("normalized")
            color: textColor,
            fontWeight: "bold",
          },

          // Punto de datos que controla hasta dónde apunta la aguja
          data: [
            {
              value: normalized, // Valor calculado a inyectar en este gráfico
              name: "",
            },
          ],
        },
      ],
    }),
    [normalized, textColor],
  );

  return (
    // Contenedor principal para establecer un bloque responsivo (aspect-ratio asegura la forma)
    <div className="w-full max-w-[320px] aspect-[1.8] flex items-center justify-center mt-2 relative">
      {/* Componente Wrapper de Apache ECharts para React */}
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: "svg" }} // Optimizamos el render indicando motor SVG por sobre Canvas
      />

      {/* Rotulo estático flotante adherido a la parte baja del componente */}
      <div className="absolute bottom-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
        {/* !TODO: cambiar */}
        RIESGO
      </div>
    </div>
  );
}
