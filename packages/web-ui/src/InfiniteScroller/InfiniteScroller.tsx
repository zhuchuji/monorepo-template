/**
 * base on react-infinite-scroller: https://github.com/danbovey/react-infinite-scroller
 *
 * overwrite react-infinite-scroller as it trigger multiple loadMore
 * @todo implement infinite scroller without any third-party library
 * @issue it trigger loadMore multiple times
 * @issue pageNum is incorrect in 'loadMore' callback
 */

import React, { ComponentProps, useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Loading from '../Loading';

const InfiniteScroller: React.FC<ComponentProps<typeof InfiniteScroll>> = ({
  hasMore,
  loadMore,
  useWindow = false,
  loader = <Loading />,
  ...otherProps
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onLoadMore = useCallback(
    async (pageNum) => {
      if (!loading && hasMore) {
        setLoading(true);
        await loadMore(pageNum);
        setLoading(false);
      }
    },
    [loadMore, loading, hasMore],
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      useWindow={useWindow}
      loader={loader}
      {...otherProps}
      loadMore={(pageNum) => onLoadMore(pageNum)}
    />
  );
};
InfiniteScroller.defaultProps = {
  useWindow: false,
  loader: <Loading />,
};
export default InfiniteScroller;
