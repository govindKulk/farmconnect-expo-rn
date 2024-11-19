import React, { FC, ReactNode } from 'react';
import { SvgProps } from 'react-native-svg';

import ArrowLeft from './ArrowLeft';
import Call from './Call';
import Camera from './Camera';
import Comment from './Comment';
import Delete from './Delete';
import Edit from './Edit';
import Heart from './Heart';
import Home from './Home';
import Image from './Image';
import Location from './Location';
import Lock from './Lock';
import Logout from './Logout';
import Mail from './Mail';
import Plus from './Plus';
import Search from './Search';
import Send from './Send';
import Share from './Share';
import ThreeDotsCircle from './ThreeDotsCircle';
import ThreeDotsHorizontal from './ThreeDotsHorizontal';
import User from './User';
import Video from './Video';
import { theme } from '@/constants';

interface IconProps extends SvgProps {
    name: string;
    size?: number;
    strokeWidth?: number
}

interface IconList {
    arrowLeft: ReactNode;
    call: ReactNode;
    camera: ReactNode;
    comment: ReactNode;
    delete: ReactNode;
    edit: ReactNode;
    home: ReactNode;
    heart: ReactNode;
    image: ReactNode;
    location: ReactNode;
    lock: ReactNode;
    logout: ReactNode;
    mail: ReactNode;
    plus: ReactNode;
    search: ReactNode;
    send: ReactNode;
    share: ReactNode;
    threeDotsCircle: ReactNode;
    threeDotsHorizontal: ReactNode;
    user: ReactNode;
    video: ReactNode;
}

const icons = {
    arrowLeft: ArrowLeft,
    call: Call,
    camera: Camera,
    comment: Comment,
    delete: Delete,
    edit: Edit,
    home: Home,
    heart: Heart,
    image: Image,
    location: Location,
    lock: Lock,
    logout: Logout,
    mail: Mail,
    plus: Plus,
    search: Search,
    send: Send,
    share: Share,
    threeDotsCircle: ThreeDotsCircle,
    threeDotsHorizontal: ThreeDotsHorizontal,
    user: User,
    video: Video,
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
    const IconComponent = icons[name as keyof IconList];
    return (
        <IconComponent
            color={theme.colors.textLight}
            height={props.size || 24}
            strokeWidth={props.strokeWidth || 1.9}
            width={props.size || 24}
            {...props}
        />
    );
};

export default Icon;
