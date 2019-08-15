import React, { useEffect } from 'react';

import Notam from 'molecules/Notam';
import { Notam as NotamType } from 'redux/Notams/types';

interface Props {
  notams: NotamType[];
  dismissNotam: (notamId: number) => void;
  fetchNotams: () => void;
}

const Notams: React.FC<Props> = ({ notams, dismissNotam, fetchNotams }) => {
  useEffect(() => {
    fetchNotams();
  }, []);

  return (
    <>
      {notams
        .filter((notam, index) => index === 0)
        .map(notam => (
          <Notam key={notam.id} notam={notam} onClose={dismissNotam} />
        ))}
    </>
  );
};

export default Notams;
