import React from 'react';
import Media from 'react-media';

const desktopQuery = "(min-width: 1050px) and (orientation: portrait), (min-width: 1050px) and (orientation: landscape)";
const desktopQueryTooltip = "(min-width: 1200px) and (orientation: portrait), (min-width: 1400px) and (orientation: landscape)";

const injectMedia = Component =>
    class extends React.PureComponent {
      render() {
        return (
            <Media queries={ { desktopQuery: desktopQuery, desktopQueryTooltip: desktopQueryTooltip } }>
              { matches => <Component { ...this.props }
                                                  desktopQueryMatches={ matches.desktopQuery }
                                                  desktopQueryTooltip={ matches.desktopQueryTooltip}
              /> }
            </Media>

        );
      }
    };

export default injectMedia;
