import React from 'react';
import Media from 'react-media';

const desktopQuery = "(min-width: 1050px) and (orientation: portrait), (min-width: 1050px) and (orientation: landscape)";

const injectMedia = Component =>
    class extends React.PureComponent {
      render() {
        return (
            <Media query={desktopQuery}>
              {desktopQueryMatches => <Component {...this.props} desktopQueryMatches={desktopQueryMatches} />}
            </Media>
        );
      }
    };

export default injectMedia;
