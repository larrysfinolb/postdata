import { LoadingOverlay } from '@mantine/core';
import React from 'react';

type Props = {
  show: boolean;
};

function Loader({ show }: Props) {
  return (
    <LoadingOverlay
      loaderProps={{ color: 'yellow' }}
      visible={show}
      overlayBlur={3}
    />
  );
}

export default Loader;
