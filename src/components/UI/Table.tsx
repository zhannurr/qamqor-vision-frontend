import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';

export interface TableColumn<T> {
  key: string;
  header: string;
  flex?: number;
  render: (item: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowPress?: (item: T, index: number) => void;
  keyExtractor: (item: T, index: number) => string;
  alternateRowColors?: boolean;
  containerStyle?: ViewStyle;
}

export function Table<T>({
  columns,
  data,
  onRowPress,
  keyExtractor,
  alternateRowColors = true,
  containerStyle,
}: TableProps<T>) {
  return (
    <Surface style={[styles.tableContainer, containerStyle]} elevation={1}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            {columns.map((column) => (
              <View
                key={column.key}
                style={[
                  styles.tableCell,
                  column.flex ? { flex: column.flex } : { flex: 1 },
                ]}
              >
                <Text style={styles.tableHeaderText}>{column.header}</Text>
              </View>
            ))}
          </View>

          {/* Table Body */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={keyExtractor(item, index)}
                style={[
                  styles.tableRow,
                  alternateRowColors && index % 2 === 0 && styles.tableRowEven,
                ]}
                onPress={() => onRowPress?.(item, index)}
                activeOpacity={0.7}
                disabled={!onRowPress}
              >
                {columns.map((column) => (
                  <View
                    key={column.key}
                    style={[
                      styles.tableCell,
                      column.flex ? { flex: column.flex } : { flex: 1 },
                    ]}
                  >
                    {column.render(item, index)}
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tableRowEven: {
    backgroundColor: '#FAFAFA',
  },
  tableCell: {
    justifyContent: 'center',
    paddingRight: 12,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9E9E9E',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
