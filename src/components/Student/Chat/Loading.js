import React from 'react';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import PropTypes from 'prop-types';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Loading extends React.Component {
    propTypes = {
      loading: PropTypes.boolean.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { loading } = this.props;
      return (
        <div className="sweet-loading">
          <BeatLoader
            css={override}
            sizeUnit="px"
            size={12}
            color="#123abc"
            loading={loading}
          />
        </div>
      );
    }
}

export default Loading;
