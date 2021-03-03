import * as React from 'react';

const useDidMountEffect = (fn: Function, deps: React.DependencyList) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      fn();
      return;
    }

    didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
