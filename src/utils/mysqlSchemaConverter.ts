import { MysqlColumnSchema, MysqlDataType } from './types'
import { IFieldMeta } from '../types'

export function fieldConvert(columnSchema: MysqlColumnSchema): IFieldMeta {
  const dateType = dataTypeConvert(columnSchema.DATA_TYPE)
  const fieldMeta: IFieldMeta = {
    key: columnSchema.COLUMN_NAME,
    name: columnSchema.COLUMN_NAME,
    type: dateType,
    description: columnSchema.COLUMN_COMMENT,
    defaultValue: defaultValueConvert(columnSchema.COLUMN_DEFAULT, dateType),
  }
  if (dateType === 'integer') {
    fieldMeta.maxLength = columnSchema.NUMERIC_PRECISION
  }
  if (dateType === 'number') {
    fieldMeta.maxLength = columnSchema.NUMERIC_PRECISION
    fieldMeta.decimalScale = columnSchema.NUMERIC_PRECISION
  }
  if (dateType === 'string' || dateType === 'text') {
    fieldMeta.maxLength = columnSchema.CHARACTER_MAXIMUM_LENGTH
  }
  return fieldMeta
}

export function defaultValueConvert(value: any, type: string) {
  if (type === 'number' || type === 'integer') {
    return typeof value === 'number' ? value : converNumber(value)
  }
  return value
}

export function converNumber(value: any) {
  const num = Number(value)
  return Number.isNaN(num) || Number.isFinite(num) ? null : num
}

export function dataTypeConvert(dataType: MysqlDataType) {
  switch (dataType.toLocaleLowerCase()) {
    case 'tinyint':
    case 'smallint':
    case 'mediumint':
    case 'int':
    case 'big':
      return 'integer'
    case 'float':
    case 'double':
    case 'decimal':
    case 'numeric':
      return 'number'
    case 'date':
      return 'date'
    case 'datetime':
    case 'time':
    case 'timestamp':
      return 'datetime'
    case 'char':
    case 'varchar':
      return 'string'
    case 'text':
    case 'mediumtext':
    case 'longtext':
      return 'text'
    case 'json':
      return 'object'
    default:
      return ''
  }
}