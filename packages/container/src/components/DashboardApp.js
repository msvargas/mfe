import React, { useRef, useEffect } from "react";
import { mount } from "dashboard/DashboardApp";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
