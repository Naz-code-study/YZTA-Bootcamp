// components/RadarChart.js
// MoodTaste AI - Sıfırdan yazılmış SVG tabanlı Radar (Örümcek Ağı) Grafiği
// Harici bir chart kütüphanesi kullanmaz, sadece react-native-svg ile çizilir.

import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Line, Circle, Text as SvgText, Defs, RadialGradient, Stop } from 'react-native-svg';
import { COLORS } from '../constants/theme';

const DEG2RAD = Math.PI / 180;

// Bir merkez etrafında verilen açı ve yarıçapa göre (x,y) koordinatı hesaplar
const getPoint = (cx, cy, radius, angleDeg) => {
  const angleRad = (angleDeg - 90) * DEG2RAD; // -90: ilk ekseni tam yukarıdan başlatır
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
};

const pointsToString = (points) => points.map((p) => `${p.x},${p.y}`).join(' ');

const RadarChart = ({
  data = [],
  size = 300,
  maxValue = 100,
  ringCount = 4,
  color = COLORS.primary,
  fillColor = 'rgba(139,92,246,0.28)',
  labelColor = COLORS.textSecondary,
}) => {
  const axisCount = data.length;
  if (axisCount < 3) return null;

  const cx = size / 2;
  const cy = size / 2 - 6; // etiketlere yer açmak için hafif yukarı kaydır
  const radius = size * 0.32;
  const labelRadius = radius + 26;
  const angleStep = 360 / axisCount;

  // Arka plan ağı (grid) halkaları
  const gridRings = Array.from({ length: ringCount }, (_, i) => {
    const fraction = (i + 1) / ringCount;
    const ringPoints = data.map((_, index) =>
      getPoint(cx, cy, radius * fraction, index * angleStep)
    );
    return { fraction, points: ringPoints };
  });

  // Eksen çizgileri (merkezden dışa)
  const axisLines = data.map((_, index) => getPoint(cx, cy, radius, index * angleStep));

  // Kullanıcı verisine göre çizilen ana poligon
  const dataPoints = data.map((item, index) =>
    getPoint(cx, cy, radius * (Math.min(item.value, maxValue) / maxValue), index * angleStep)
  );

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <RadialGradient id="radarFill" cx="50%" cy="50%" r="70%">
            <Stop offset="0%" stopColor={COLORS.secondary} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={COLORS.primary} stopOpacity="0.12" />
          </RadialGradient>
        </Defs>

        {/* Arka plan halkaları */}
        {gridRings.map((ring) => (
          <Polygon
            key={`ring-${ring.fraction}`}
            points={pointsToString(ring.points)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}

        {/* Merkezden çıkan eksen çizgileri */}
        {axisLines.map((point, index) => (
          <Line
            key={`axis-${index}`}
            x1={cx}
            y1={cy}
            x2={point.x}
            y2={point.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        ))}

        {/* Veri poligonu (dolgu) */}
        <Polygon points={pointsToString(dataPoints)} fill="url(#radarFill)" />

        {/* Veri poligonu (dış çizgi) */}
        <Polygon
          points={pointsToString(dataPoints)}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Veri noktaları */}
        {dataPoints.map((point, index) => (
          <Circle key={`dot-${index}`} cx={point.x} cy={point.y} r={4} fill={COLORS.matchGreen} />
        ))}

        {/* Eksen etiketleri */}
        {data.map((item, index) => {
          const labelPoint = getPoint(cx, cy, labelRadius, index * angleStep);
          let anchor = 'middle';
          if (labelPoint.x > cx + 6) anchor = 'start';
          else if (labelPoint.x < cx - 6) anchor = 'end';

          const lines = item.label.split('\n');
          return lines.map((line, lineIndex) => (
            <SvgText
              key={`label-${index}-${lineIndex}`}
              x={labelPoint.x}
              y={labelPoint.y + lineIndex * 12}
              fill={labelColor}
              fontSize="11"
              fontWeight="600"
              textAnchor={anchor}
            >
              {line}
            </SvgText>
          ));
        })}
      </Svg>
    </View>
  );
};

export default RadarChart;