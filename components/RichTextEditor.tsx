import React, { forwardRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

import { theme } from '@/constants';

const RichTextEditor = forwardRef<RichEditor, { onChange: (body: string) => void }>(({ onChange }, ref) => {
    return (
        <View style={{ minHeight: 285 }}>
            <RichToolbar
                actions={[
                    actions.alignCenter,
                    actions.alignLeft,
                    actions.alignRight,
                    actions.blockquote,
                    actions.code,
                    actions.heading1,
                    actions.heading4,
                    actions.insertOrderedList,
                    actions.line,
                    actions.removeFormat,
                    actions.setBold,
                    actions.setItalic,
                    actions.setStrikethrough,
                ]}
                disabled={false}
                editor={ref}
                flatContainerStyle={styles.flatStyle}
                iconMap={{
                    [actions.heading1]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>{'H1'}</Text>,
                    [actions.heading4]: ({ tintColor }: any) => <Text style={{ color: tintColor }}>{'H4'}</Text>,
                }}
                selectedIconTint={theme.colors.primaryDark}
                style={styles.richBar}
            />

            <RichEditor
                containerStyle={styles.rich}
                editorStyle={{ color: theme.colors.text as string, placeholderColor: 'gray' }}
                onChange={onChange}
                placeholder={"What's on your mind"}
                ref={ref}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    containerStyle: {},
    flatStyle: {
        gap: 3,
        paddingHorizontal: 8,
    },
    listStyle: {},
    rich: {
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        borderColor: theme.colors.gray,
        borderTopWidth: 0,
        borderWidth: 1.5,
        flex: 1,
        minHeight: 240,
        padding: 5,
    },
    richBar: {
        backgroundColor: theme.colors.gray,
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
    },
});

export default RichTextEditor;
