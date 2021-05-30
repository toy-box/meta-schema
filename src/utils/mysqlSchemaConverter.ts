import { MysqlColumnSchema, MysqlDataType } from './interface'
import { IFieldMeta, BusinessFieldType, IBusinessObjectMeta } from '../types'

export function businessObjectMetaConvert(tableName: string, columnSchemas: MysqlColumnSchema[]): IBusinessObjectMeta {
  const properties: Record<string, IFieldMeta> = {}
  columnSchemas.forEach(column => {
    properties[column.COLUMN_NAME] = fieldConvert(column)
  })
  return {
    key: tableName,
    titleKey: '',
    type: BusinessFieldType.OBJECT,
    name: tableName,
    description: '',
    properties,
  }
}

export function fieldConvert(columnSchema: MysqlColumnSchema): IFieldMeta {
  const fieldType = fieldTypeConvert(columnSchema.DATA_TYPE)
  const fieldMeta: IFieldMeta = {
    key: columnSchema.COLUMN_NAME,
    name: columnSchema.COLUMN_NAME,
    type: fieldType,
    description: columnSchema.COLUMN_COMMENT,
    defaultValue: defaultValueConvert(columnSchema.COLUMN_DEFAULT, fieldType),
  }
  if (fieldType === 'integer') {
    fieldMeta.maxLength = columnSchema.NUMERIC_PRECISION
  }
  if (fieldType === 'number') {
    fieldMeta.maxLength = columnSchema.NUMERIC_PRECISION
    fieldMeta.decimalScale = columnSchema.NUMERIC_PRECISION
  }
  if (fieldType === 'string' || fieldType === 'text') {
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

export function fieldTypeConvert(dataType: MysqlDataType) {
  switch (dataType.toLocaleLowerCase()) {
    case 'tinyint':
    case 'smallint':
    case 'mediumint':
    case 'int':
    case 'big':
      return BusinessFieldType.INTEGER
    case 'float':
    case 'double':
    case 'decimal':
    case 'numeric':
      return BusinessFieldType.NUMBER
    case 'date':
      return BusinessFieldType.DATE
    case 'datetime':
    case 'time':
    case 'timestamp':
      return BusinessFieldType.DATETIME
    case 'char':
    case 'varchar':
      return BusinessFieldType.STRING
    case 'text':
    case 'mediumtext':
    case 'longtext':
      return BusinessFieldType.TEXT
    case 'json':
      return BusinessFieldType.OBJECT
    default:
      return BusinessFieldType.STRING
  }
}