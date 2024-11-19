import React, { FC, memo } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';

import Avatar from './Avatar';
import Icon from '@/assets/icons';
import { theme } from '@/constants';
import { hp } from '@/helpers/';

interface CommentItemProps {
    canDelete?: boolean;
    comment: any;
    highlight?: boolean;
    onDelete?: (item: any) => void;
}

const CommentItem: FC<CommentItemProps> = ({ canDelete = false, comment, highlight = false, onDelete }) => {
    const handleDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to do this?', [
            { onPress: () => console.log('Modal cancel'), style: 'cancel', text: 'Cancel' },
            { onPress: () => onDelete?.(comment), style: 'destructive', text: 'Delete' },
        ]);
    };

    return (
        <View style={styles.container}>
            <Avatar uri={comment?.user?.image} />

            <View style={[styles.content, highlight && styles.highlight]}>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.text}>{comment?.user?.name}</Text>
                        <Text>{'•'}</Text>
                        <Text style={[styles.text, { color: theme.colors.textLight }]}>
                            {moment(comment?.usr?.created_at).format('MMM d')}
                        </Text>
                    </View>

                    {canDelete && (
                        <TouchableOpacity activeOpacity={0.7} onPress={handleDelete}>
                            <Icon color={theme.colors.rose} name={'delete'} size={20} />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={[styles.text, { fontWeight: 'normal' }]}>{comment.text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 7,
    },
    content: {
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        borderCurve: 'continuous',
        borderRadius: theme.radius.md,
        flex: 1,
        gap: 5,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    highlight: {
        backgroundColor: 'white',
        borderColor: theme.colors.dark,
        borderWidth: 0.2,
        elevation: 5,
        shadowColor: theme.colors.dark,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    nameContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    text: {
        color: theme.colors.textDark,
        fontSize: hp(1.6),
        fontWeight: theme.fonts.medium,
    },
});

export default memo(CommentItem);
