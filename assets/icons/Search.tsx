import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const Search = (props: SvgProps) => (
    <Svg color={'#000000'} fill={'none'} height={24} viewBox={'0 0 24 24'} width={24} {...props}>
        <Path
            d={'M17.5 17.5L22 22'}
            stroke={'currentColor'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
        <Path
            d={
                'M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z'
            }
            stroke={'currentColor'}
            strokeLinejoin={'round'}
            strokeWidth={props.strokeWidth}
        />
    </Svg>
);

export default Search;
