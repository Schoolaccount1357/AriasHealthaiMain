
import React, { useMemo } from 'react';
import { scaleQuantize } from '@visx/scale';
import { Geometry } from '@visx/geo';
import { ParentSize } from '@visx/responsive';
import topology from './us-states.json';
import { StateResource } from '@/pages/ResourceLocator';

interface Props {
  width: number;
  height: number;
  data: Record<string, { resources: StateResource[] }>;
  onStateHover: (state: string | null, resources: StateResource[] | null) => void;
}

const background = '#141e2f';

function USMap({ width, height, data, onStateHover }: Props) {
  // Calculate number of resources per state for heat map
  const resourceCounts = useMemo(() => {
    return Object.entries(data).reduce((acc, [state, { resources }]) => {
      acc[state] = resources.length;
      return acc;
    }, {} as Record<string, number>);
  }, [data]);

  // Color scale for heat map
  const colorScale = scaleQuantize({
    domain: [0, Math.max(...Object.values(resourceCounts))],
    range: ['#e6f3ff', '#badeff', '#8ec9ff', '#62b4ff', '#369eff', '#0a85ff', '#0066cc'],
  });

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Geometry
        topology={topology}
        scale={width * 1.2}
        translate={[width / 2, height / 2]}
        fill={({ feature }) => {
          const stateName = feature.properties.name;
          return resourceCounts[stateName] ? colorScale(resourceCounts[stateName]) : '#e6e6e6';
        }}
        stroke="#fff"
        strokeWidth={0.5}
        onMouseEnter={({ feature }) => {
          const stateName = feature.properties.name;
          if (data[stateName]) {
            onStateHover(stateName, data[stateName].resources);
          }
        }}
        onMouseLeave={() => onStateHover(null, null)}
        style={{ cursor: 'pointer' }}
      />
    </svg>
  );
}

export default function ResponsiveUSMap(props: Omit<Props, 'width' | 'height'>) {
  return (
    <ParentSize>
      {({ width, height }) => <USMap width={width} height={height} {...props} />}
    </ParentSize>
  );
}
