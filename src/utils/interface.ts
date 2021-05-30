
export type BooleanType = boolean | 'NO' | 'YES' | 1 | 0

export type MysqlDataType = 'numeric' | 'decimal' | 'tinyint' | 'smallint' | 'int' | 'mediumint' | 'big' | 'float' | 'double' | 'bit' | 'enum' | 'char' | 'varchar' | 'date' | 'datetime' | 'time' | 'timestamp' | 'json' | 'blob' | 'mediumblob' | 'longblob' | 'text' | 'mediumtext' | 'longtext' | 'set'

export interface MysqlColumnSchema {
  TABLE_CATALOG?: string
  TABLE_SCHEMA?: string
  TABLE_NAME: string
  COLUMN_NAME: string
  ORDINAL_POSITION: number
  COLUMN_DEFAULT?: number | string
  IS_NULLABLE?: BooleanType
  DATA_TYPE: MysqlDataType
  CHARACTER_MAXIMUM_LENGTH?: number
  CHARACTER_OCTET_LENGTH?: number
  NUMERIC_PRECISION?: number
  NUMERIC_SCALE?: number
  DATETIME_PRECISION?: number
  CHARACTER_SET_NAME?: string
  COLLATION_NAME?: string
  COLUMN_TYPE: string
  COLUMN_KEY?: string
  EXTRA?: string
  PRIVILEGES?: string
  COLUMN_COMMENT?: string
  GENERATION_EXPRESSION?: string
}
