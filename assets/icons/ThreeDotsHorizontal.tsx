import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ThreeDotsHorizontal = (props: SvgProps) => (
    <Svg color={'#000000'} fill={'none'} height={24} viewBox={'0 0 24 24'} width={24} {...props}>
        <Path
            d={'M11.9959 12H12.0049'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={'M17.9998 12H18.0088'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={'M5.99981 12H6.00879'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
    </Svg>
);

export default ThreeDotsHorizontal;
