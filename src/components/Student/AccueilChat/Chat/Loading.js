import React from 'react';
import { BeatLoader } from 'react-spinners';
import colors from '../../../globalSCSS/color.scss';
import sizes from '../../../globalSCSS/size.scss';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="sweet-loading">
        <BeatLoader
          sizeUnit="px"
          size={sizes.loaderSize}
          color={colors.color1}
          loading={loading}
        />
      </div>
    );
  }
}

export default Loading;
