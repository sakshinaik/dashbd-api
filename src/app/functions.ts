import { Sort } from "@angular/material";

export function sortData(sort: Sort, entity: any[]) {
  const data = entity.slice();
  if (!sort.active || sort.direction === "") {
    return data;
  }
  console.log(JSON.stringify(sort));
  const isAsc = sort.direction === "asc";
  return data.sort((a, b) => {
    return this.compare(a[sort.active], b[sort.active], isAsc);
  });
}

export function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function paginate(
  entity: any[],
  currentPage: number,
  pageSize: number
): any[] {
  const end = (currentPage + 1) * pageSize;
  const start = currentPage * pageSize;

  return entity.slice(start, end);
}

export function sqlDate(date: string): string {
  if (!date) {
    return null;
  }
  var dt = new Date(new Date(date).toUTCString());
  var mm = dt.getMonth() + 1;
  var mth = mm.toString();
  if (mm < 10) {
    mth = "0" + mm.toString();
  }

  return dt.getFullYear() + "-" + mth + "-" + dt.getDate();
}

export function sqlToLocale(date: string): Date {
  if (!date) {
    return null;
  }
  var parts = date.split("-");
  var join = parts[1] + "/" + parts[2] + "/" + parts[0];

  return new Date(join);
}
