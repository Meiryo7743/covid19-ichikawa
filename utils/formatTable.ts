import dayjs from 'dayjs'

const headers = [

  { text: '検査確定日', value: '検査確定日' },
  { text: '発症日', value: '発症日' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '職業', value: '職業' },
  //{ text: '推定感染経路', value: '推定感染経路' }
  /*
  { text: '公表日', value: '公表日' },
  { text: '居住地', value: '居住地' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '退院※', value: '退院', align: 'center' }
  */
]

type DataType = {

  検査確定日: string
  発症日: string
  年代: string | null
  性別: '男性' | '女性' | string
  職業: string | null
  //推定感染経路: string | null
  /*
  リリース日: string
  居住地: string | null
  年代: string | null
  性別: '男性' | '女性' | string
  退院: '◯' | null
  */
  [key: string]: any
}

type TableDataType = {

  検査確定日: string
  発症日: string
  年代: DataType['年代']
  性別: DataType['性別'] | '不明'
  職業: DataType['職業']
  //推定感染経路: DataType['推定感染経路']
  /*
  公表日: string
  居住地: DataType['居住地']
  年代: DataType['年代']
  性別: DataType['性別'] | '不明'
  退院: DataType['退院']
  */
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {

    const releaseDate = dayjs(d['検査確定日'])
    const appearanceDate = dayjs(d['発症日'])
    const TableRow: TableDataType = {
      検査確定日: releaseDate.isValid() ? releaseDate.format('M/D') : '不明',
      発症日: appearanceDate.isValid() ? appearanceDate.format('M/D') : '不明',
      //発症日: d['発症日'] ?? '不明',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? '不明',
      職業: d['職業'] ?? '不明',
      //推定感染経路: d['推定感染経路'] ?? '不明'
    }
    /*
    const releaseDate = dayjs(d['リリース日'])
    const TableRow: TableDataType = {
      公表日: releaseDate.isValid() ? releaseDate.format('M/D') : '不明',
      居住地: d['居住地'] ?? '調査中',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? '不明',
      退院: d['退院']
    }
    */
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets
    .sort((a, b) => dayjs(a.検査確定日).unix() - dayjs(b.検査確定日).unix())
    //.sort((a, b) => dayjs(a.公表日).unix() - dayjs(b.公表日).unix())
    .reverse()
  return tableDate
}
