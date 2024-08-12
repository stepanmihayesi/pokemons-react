import { FC } from "react";

interface Pagination {
  gotoPrevPage: (() => void) | null;
  setPagination: (num: string) => void;
  gotoNextPage: (() => void) | null;
}

const Pagination: FC<Pagination> = ({
  gotoPrevPage,
  setPagination,
  gotoNextPage,
}) => {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Prev</button>}
      {<button onClick={() => setPagination("10")}>10</button>}
      {<button onClick={() => setPagination("20")}>20</button>}
      {<button onClick={() => setPagination("50")}>50</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
};
export default Pagination;
