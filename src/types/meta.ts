export interface IBusinessObjectMeta {
  key: string
  idKey?: string
  name: string
  description: string
  properties: { [key: string]: IFieldMeta }
  titleKey: string
  type?: string
}

export interface IFieldOption {
  label: string
  value: string
}

export interface IFieldMeta {
  key: string
  name: string
  type: string
  description?: string
  primary?: boolean
  options?: IFieldOption[]
  refObjectId?: string
  unique?: boolean
  required?: boolean
  maximum?: number
  minimum?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  decimalScale?: number
  multipleOf?: number
  minProperties?: number
  maxProperties?: number
  pattern?: string
  format?: string
  idKey?: string
  titleKey?: string
  properties?: { [key: string]: IFieldMeta }
  index?: number
  defaultValue?: any
  parentKey?: string
}
