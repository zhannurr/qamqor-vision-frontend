import React, { useCallback, useRef, useState, ReactNode } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text, Portal } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

export interface ContextMenuItem {
  title: string;
  leadingIcon?: keyof typeof Icon.glyphMap;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  /** Список пунктов меню */
  items: ContextMenuItem[];
  /** Якорь (кнопка), по нажатию открывается меню */
  anchor: ReactNode;
  /** Минимальная ширина выпадающего меню */
  minWidth?: number;
  /** Максимальная высота списка */
  maxHeight?: number;
  /** Отключить открытие меню */
  disabled?: boolean;
  style?: any;
  dropdownStyle?: any;
}

const DROPDOWN_MIN_WIDTH = 200;
const DROPDOWN_MAX_HEIGHT = 400;
const ANCHOR_OFFSET = 8;
const EDGE_PADDING = 8;
const MIN_MENU_HEIGHT = 120;

type DomRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

function getDomRect(ref: React.RefObject<View | null>): DomRect | null {
  const node = ref?.current as any;
  const el = node?.getBoundingClientRect
    ? node
    : node?._node?.getBoundingClientRect
      ? node._node
      : node?._component?.getBoundingClientRect
        ? node._component
        : null;

  if (!el) return null;
  return el.getBoundingClientRect();
}

function WebBodyPortal({ children }: { children: ReactNode }) {
  if (Platform.OS !== 'web') return <Portal>{children}</Portal>;

  let createPortal: ((children: ReactNode, container: Element) => React.ReactPortal) | undefined;
  try {
    const ReactDOM = require('react-dom');
    createPortal = ReactDOM?.createPortal;
  } catch (_) {}

  if (typeof createPortal !== 'function' || typeof document === 'undefined') {
    return <Portal>{children}</Portal>;
  }

  return createPortal(children, document.body);
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  anchor,
  minWidth = DROPDOWN_MIN_WIDTH,
  maxHeight = DROPDOWN_MAX_HEIGHT,
  disabled = false,
  style,
  dropdownStyle,
}) => {
  const windowDims = useWindowDimensions();
  const anchorRef = useRef<View>(null);

  const [visible, setVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: minWidth,
  });

  const getViewport = useCallback(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return { w: window.innerWidth, h: window.innerHeight };
    }
    return { w: windowDims.width, h: windowDims.height };
  }, [windowDims.width, windowDims.height]);

  const calculatePosition = useCallback(
    (
      anchorX: number,
      anchorY: number,
      anchorWidth: number,
      anchorHeight: number
    ) => {
      const { w, h } = getViewport();
      const dropdownWidth = Math.max(anchorWidth || minWidth, minWidth);

      let finalY = anchorY + anchorHeight + ANCHOR_OFFSET;
      finalY = Math.max(EDGE_PADDING, finalY);

      let finalX = anchorX;

      if (finalX + dropdownWidth > w - EDGE_PADDING) {
        finalX = w - dropdownWidth - EDGE_PADDING;
      }
      if (finalX < EDGE_PADDING) {
        finalX = EDGE_PADDING;
      }

      return {
        x: finalX,
        y: finalY,
        width: dropdownWidth,
      };
    },
    [minWidth, getViewport]
  );

  const computeMaxHeight = useCallback(
    (y: number) => {
      const { h } = getViewport();
      const available = h - y - EDGE_PADDING;
      return Math.max(MIN_MENU_HEIGHT, Math.min(maxHeight, available));
    },
    [maxHeight, getViewport]
  );

  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  const handleItemPress = useCallback((item: ContextMenuItem) => {
    if (item.disabled || disabled) return;
    setVisible(false);
    item.onPress();
  }, [disabled]);

  const openAndMeasure = useCallback(() => {
    if (disabled) return;

    setVisible(true);

    requestAnimationFrame(() => {
      if (Platform.OS === 'web') {
        const r = getDomRect(anchorRef);
        if (!r) return;
        const pos = calculatePosition(r.left, r.top, r.width, r.height);
        setDropdownPosition(pos);
        return;
      }

      (anchorRef.current as any)?.measureInWindow?.(
        (x: number, y: number, w: number, h: number) => {
          const pos = calculatePosition(x, y, w, h);
          setDropdownPosition(pos);
        }
      );
    });
  }, [calculatePosition, disabled]);

  return (
    <View style={[styles.container, style]}>
      <View ref={anchorRef} collapsable={false}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={openAndMeasure}
          disabled={disabled}
        >
          {anchor}
        </TouchableOpacity>
      </View>

      {visible && (
        <WebBodyPortal>
          <View style={styles.portalWrapper}>
            <TouchableWithoutFeedback onPress={handleDismiss}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <View
              style={[
                styles.dropdownContainer,
                {
                  left: dropdownPosition.x,
                  top: dropdownPosition.y,
                  width: dropdownPosition.width,
                  maxHeight: computeMaxHeight(dropdownPosition.y),
                },
                dropdownStyle,
              ]}
              onStartShouldSetResponder={() => true}
            >
              <ScrollView
                style={styles.optionsContainer}
                nestedScrollEnabled
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleItemPress(item)}
                    disabled={item.disabled || disabled}
                    style={[
                      styles.optionItem,
                      (item.disabled || disabled) && styles.disabledOptionItem,
                    ]}
                  >
                    <View style={styles.optionContent}>
                      <Text
                        variant="bodyMedium"
                        style={[
                          styles.optionText,
                          item.destructive && styles.destructiveText,
                          (item.disabled || disabled) && styles.disabledOptionText,
                        ]}
                      >
                        {item.title}
                      </Text>
                      {item.leadingIcon ? (
                        <View style={styles.optionIcon}>
                          <Icon
                            name={item.leadingIcon}
                            size={20}
                            color={
                              item.destructive
                                ? '#C73E3E'
                                : item.disabled || disabled
                                  ? '#9E9E9E'
                                  : '#717182'
                            }
                          />
                        </View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </WebBodyPortal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  portalWrapper: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
    pointerEvents: 'box-none',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0F0',
    zIndex: 2,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }
      : {}),
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  disabledOptionItem: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionIcon: {
    marginLeft: 12,
  },
  optionText: {
    flex: 1,
    color: '#1B1B1B',
  },
  destructiveText: {
    color: '#C73E3E',
  },
  disabledOptionText: {
    opacity: 0.6,
  },
});
