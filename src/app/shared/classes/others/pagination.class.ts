export class Pagination {
  pageNbr: number;
  nbrResults?: number;
  pageMax: number;
  total: number;

  constructor(pageNbr?: number, nbrResults?: number) {
    if (pageNbr == null) {
      this.pageNbr = 0;
    } else {
      this.pageNbr = pageNbr;
    }

    if (nbrResults != null) {
      this.nbrResults = nbrResults;
    }
  }
}

export class PaginationResults<T> {
  total: number;
  data: T[];
}
