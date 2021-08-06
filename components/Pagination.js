import { PER_PAGE } from '@/config/index';

import Link from 'next/link';

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-Secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-Secondary'>Next</a>
        </Link>
      )}
    </>
  );
};

export default Pagination;
