import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ThreeDotsCircle = (props: SvgProps) => (
    <Svg color={'#000000'} fill={'none'} height={24} viewBox={'0 0 24 24'} width={24} {...props}>
        <Path
            d={'M11.9959 12H12.0049'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={'M15.9998 12H16.0088'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={'M7.99981 12H8.00879'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={
                'M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z'
            }
            stroke={'currentColor'}
            strokeWidth={typeof props.strokeWidth === 'number' ? props.strokeWidth - 0.5 : props.strokeWidth}
        />
    </Svg>
);

export default ThreeDotsCircle;
