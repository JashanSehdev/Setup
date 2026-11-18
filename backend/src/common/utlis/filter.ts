import { FilterDto } from '../dto/filter-dto.js';
import { FindOptionsOrder, FindOptionsWhere, ILike } from 'typeorm';

type NestedKeyOf<T> = (keyof T & string) | `${string}.${string}`; 

interface ApplyFilters<T> {
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  order?: FindOptionsOrder<T>;
}

interface ApplyOnFilters<T> {
  searchOn?: NestedKeyOf<T>[];
  sortOn?: NestedKeyOf<T>[];
  defaultOrder?: 'asc' | 'desc';
}


function buildNestedObject(path : string, value : unknown) : Record<string, unknown> {
  const keys = path.split(".");
  const result : Record<string, unknown> = {}

  let current = result;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = {}
      current = current[key] as Record<string, unknown>
    }
  }

  return result
}

function deepMerge (target : Record<string, any>, source: Record<string, any>) : Record<string, any> {

  for (const key of  Object.keys(source)){

    if (
      source[key] && 
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) && 
      !(`_type` in source[key])
    ) {
      target[key] = deepMerge({ ...(target[key] || {}) }, source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target
}

export function applyFilters<T>(
  filters: FilterDto,
  options: ApplyFilters<T>,
  applyOnFilters: ApplyOnFilters<T>,
) :  [FindOptionsWhere<T> | FindOptionsWhere<T>[], FindOptionsOrder<T>] {
  const { search, sortBy, orderBy } = filters;
  const { searchOn, sortOn, defaultOrder = 'ASC' } = applyOnFilters;

 const baseWhere = (Array.isArray(options.where) ? options.where[0] : options.where) || {};
  let where: FindOptionsWhere<T> | FindOptionsWhere<T>[] = { ...baseWhere };
  let order: FindOptionsOrder<T> = { ...options.order };
  if (search && searchOn && searchOn.length > 0) {
    where = searchOn.map((field) => {
      const nestedCondition = buildNestedObject(field, ILike(`%${search}%`))
      return deepMerge({
      ...baseWhere,
    }, nestedCondition) as FindOptionsWhere<T>
  
  });
  }

  const normalizedOrder = (orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC') as 'ASC' | 'DESC';
  if (sortBy && sortOn && sortOn.includes(sortBy as NestedKeyOf<T>)) {
    const nestedOrder = buildNestedObject(sortBy, normalizedOrder);
    order = deepMerge(order as Record<string, any>, nestedOrder) as FindOptionsOrder<T>;
  }

  else if (sortOn && sortOn.length > 0 && Object.keys(order).length === 0) {

    const fallbackDirection = defaultOrder.toUpperCase() as 'ASC' | 'DESC';
    const nestedFallback = buildNestedObject(sortOn[0], fallbackDirection);
    order = deepMerge(order as Record<string, any>, nestedFallback) as FindOptionsOrder<T>;
  }



  return [where, order];
}