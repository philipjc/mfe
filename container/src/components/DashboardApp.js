import React, { useRef, useEffect } from "react";
import { mount } from 'dashboard/DashboardApp';

// This file runs the mount function from the micro frontend
// passing a reference and a set of callback functions to
// keep the routing in sync and inform when a route changes.

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />
};
