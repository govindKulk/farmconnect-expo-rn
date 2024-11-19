import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const ArrowLeft = (props: SvgProps) => (
    <Svg color={'#000000'} fill={'none'} height={24} viewBox={'0 0 24 24'} width={24} {...props}>
        <Path
            d={'M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
    </Svg>
);

export default ArrowLeft;
