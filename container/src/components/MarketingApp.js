import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { mount } from 'marketing/MarketingApp';

// This file runs the mount function from the micro frontend
// passing a reference and a set of callback functions to
// keep the routing in sync and inform when a route changes.

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: marketingPath }) => {
        console.log('container noticed navigate from marketing app.');

        const { pathname } = history.location;
        if (pathname !== marketingPath) {
          history.push(marketingPath);
        }
      }
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />
};
