import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <BeatLoader color="#000000" css={override} loading={true} size={15} />
    </div>
  );
};

export default LoadingModal;