import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';

const { height } = Dimensions.get('window');

interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectFilter: (filter: string) => void;
  selectedFilter?: string | null;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isVisible, 
  onClose, 
  onSelectFilter,
  selectedFilter 
}) => {
  const filters = [
    { key: 'Menor número', label: 'Menor número' },
    { key: 'Maior número', label: 'Maior número' },
    { key: 'A-Z', label: 'A-Z' },
    { key: 'Z-A', label: 'Z-A' }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione a ordem</Text>
          </View>
          
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterOption,
                selectedFilter === filter.key && styles.selectedFilterOption
              ]}
              onPress={() => {
                onSelectFilter(filter.key);
                onClose();
              }}
            >
              <Text style={[
                styles.filterOptionText,
                selectedFilter === filter.key && styles.selectedFilterOptionText
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  filterOption: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  selectedFilterOption: {
    backgroundColor: '#1E293B',
  },
  filterOptionText: {
    color: 'black',
    fontSize: 14,
  },
  selectedFilterOptionText: {
    fontWeight: '600',
  }
});

export default FilterModal;