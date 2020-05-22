export type SurfaceStyle = {
  strokeColor: string
  fillColor: string
}

const surfaceStyleA: SurfaceStyle = {
  strokeColor: '#667BA3',
  fillColor: '#002466'
}

const surfaceStyleB: SurfaceStyle = {
  strokeColor: '#667BA3',
  fillColor: '#005aff'
}

const surfaceStyleC: SurfaceStyle = {
  strokeColor: '#667BA3',
  fillColor: '#669cff'
}

export function getGraphSeriesStyle(seriesLength: number) {
  switch (seriesLength) {
    case 1:
      return [surfaceStyleB]
    case 2:
      return [surfaceStyleA, surfaceStyleC]
    default:
      return [surfaceStyleA, surfaceStyleB, surfaceStyleC]
  }
}
