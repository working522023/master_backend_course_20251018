import { Request } from "express";
import { User } from "../../modules";
import { ParsedQueryParams } from "../interfaces";

export const parseFilter = (filter: string): Record<string, string> => {
  if (!filter) return {};
  return filter.split(",").reduce((acc, part) => {
    const [key, value] = part.split(":").map((s) => s.trim());
    if (key && value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
};

export const parseDateRange = (start_date?: string, end_date?: string) => {
  const dateRange: { startDate?: Date; endDate?: Date } = {};
  if (start_date) {
    const start = new Date(start_date);
    if (!isNaN(start.getTime())) dateRange.startDate = start;
  }
  if (end_date) {
    const end = new Date(end_date);
    if (!isNaN(end.getTime())) dateRange.endDate = end;
  }
  return dateRange;
};

export const userParseQueryParams = (req: Request): ParsedQueryParams => {
  const query = req.query as Record<string, any>;

  const page = Math.max(Number(query.page) || 1, 1);
  const offset = Math.max(Number(query.offset) || 10, 1);

  const sortBy: keyof User = ['createdAt', 'updatedAt'].includes(query.sort_by) 
    ? (query.sort_by as keyof User)
    : 'createdAt';

  const orderBy: "ASC" | "DESC" =
    ['ASC', 'DESC'].includes((query.order_by || '').toUpperCase())
      ? (query.order_by.toUpperCase() as "ASC" | "DESC")
      : "ASC";

  const filterStr = typeof query.filter === "string" ? query.filter : undefined;
  const filter = filterStr ? parseFilter(filterStr) : {};

  const { startDate, endDate } = parseDateRange(
    typeof query.start_date === "string" ? query.start_date : undefined,
    typeof query.end_date === "string" ? query.end_date : undefined
  );

  return { page, offset, sortBy, orderBy, filter, startDate, endDate };
};
