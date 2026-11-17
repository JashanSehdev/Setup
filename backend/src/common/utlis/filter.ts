import { FilterDto } from '../dto/filter-dto.js';
import { FindOptionsOrder, FindOptionsWhere, ILike } from 'typeorm';

interface ApplyFilters<T> {
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  order?: FindOptionsOrder<T>;
}

interface ApplyOnFilters<T> {
  searchOn?: (keyof T)[];
  sortOn?: (keyof T)[];
  defaultOrder?: 'asc' | 'desc';
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
  const order: FindOptionsOrder<T> = { ...options.order };
  if (search && searchOn && searchOn.length > 0) {
    where = searchOn.map((field) => ({
      ...baseWhere,
      [field]: ILike(`${search}%`),
    }));
  }

  if (sortBy && sortOn && sortOn.includes(sortBy as keyof T)) {
    const direction = (orderBy?.toUpperCase() === 'DESC' ? 'DESC': 'ASC') as 'ASC' | 'DESC';
    (order as Record<string, 'ASC' | "DESC" >)[sortBy] = direction
  }

  else if (sortOn && sortOn.length > 0 && Object.keys(order).length === 0) {

    const fallbackDirection = defaultOrder.toUpperCase() as 'ASC' | 'DESC';
    (order as Record<string, 'ASC' | 'DESC'>)[sortOn[0] as string] = fallbackDirection;
  }



  return [where, order];
}
