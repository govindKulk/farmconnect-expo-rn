import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const Logout = (props: SvgProps) => (
    <Svg color={'#000000'} fill={'none'} height={24} viewBox={'0 0 24 24'} width={24} {...props}>
        <Path
            d={
                'M7.02331 5.5C4.59826 7.11238 3 9.86954 3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 9.86954 19.4017 7.11238 16.9767 5.5'
            }
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={'M12 2V10'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
    </Svg>
);

export default Logout;
