import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

interface FilterModalProps {
    isVisible: boolean;
    onClose: () => void;
    onApplyFilters: (
      typeFilter: string[] | null, 
      generationFilter: string | null, 
      sortFilter: string | null
    ) => void;
    initialTypeFilters?: string[] | null;
    initialGenerationFilter?: string | null | undefined; // Add undefined here
    initialSortFilter?: string | null | undefined; // Add undefined here
  }


const FilterModal: React.FC<FilterModalProps> = ({ 
  isVisible, 
  onClose,
  onApplyFilters,
  initialTypeFilters = [],
  initialGenerationFilter,
  initialSortFilter
}) => {
  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>(initialTypeFilters || []);
  const [selectedGenerationFilter, setSelectedGenerationFilter] = useState<string | null>(
    initialGenerationFilter || null
  );
  
  const [selectedSortFilter, setSelectedSortFilter] = useState<string | null>(
    initialSortFilter || null
  );

  const typeFilters = [
    'Grama', 'Fuego', 'Água', 'Elétrico', 'Venenoso', 'Pedra', 
    'Voador', 'Psíquico', 'Lutador', 'Gelo', 'Dragão', 'Fantasma'
  ];

  const generations = [
    'Geração I', 'Geração II', 'Geração III', 
    'Geração IV', 'Geração V', 'Geração VI'
  ];

  const sortFilters = [
    { key: 'Menor número', label: 'Menor número' },
    { key: 'Maior número', label: 'Maior número' },
    { key: 'A-Z', label: 'A-Z' },
    { key: 'Z-A', label: 'Z-A' }
  ];

  const toggleTypeFilter = (type: string) => {
    setSelectedTypeFilters(current => 
      current.includes(type) 
        ? current.filter(t => t !== type)
        : [...current, type]
    );
  };

  const handleApply = () => {
    onApplyFilters(
      selectedTypeFilters.length > 0 ? selectedTypeFilters : null, 
      selectedGenerationFilter, 
      selectedSortFilter
    );
    onClose();
  };

  const handleCancel = () => {
    setSelectedTypeFilters(initialTypeFilters || []);
    setSelectedGenerationFilter(initialGenerationFilter || null);
    setSelectedSortFilter(initialSortFilter || null);
    onClose();
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Type Filter Section */}
          <View style={styles.filterSection}>
            <View style={styles.filterSectionHeader}>
              <Text style={styles.filterSectionTitle}>Tipos</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  // TODO: Implement full type selection modal/screen
                  console.log('Open full type selection');
                }}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.filterOptionsContainer}>
              <TouchableOpacity style={styles.selectContainer}>
                <Text style={styles.selectText}>
                  {selectedTypeFilters.length > 0 
                    ? selectedTypeFilters.join(', ') 
                    : 'Selecionar um tipo'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generation Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Geração</Text>
            <View style={styles.filterOptionsContainer}>
              <TouchableOpacity style={styles.selectContainer}>
                <Text style={styles.selectText}>
                  {selectedGenerationFilter || 'Selecionar geração'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sort Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ordem</Text>
            <View style={styles.filterOptionsContainer}>
              {sortFilters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterOption,
                    selectedSortFilter === filter.key && styles.selectedFilterOption
                  ]}
                  onPress={() => setSelectedSortFilter(filter.key)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedSortFilter === filter.key && styles.selectedFilterOptionText
                  ]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]} 
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.confirmButton]} 
              onPress={handleApply}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#2C3E50',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  filterSection: {
    paddingVertical: 16,
  },
  filterSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  filterSectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    padding: 4,
  },
  filterOptionsContainer: {
    paddingHorizontal: 16,
  },
  selectContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 8,
  },
  selectText: {
    color: 'white',
    fontSize: 14,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedFilterOption: {
    backgroundColor: '#007AFF',
  },
  filterOptionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedFilterOptionText: {
    fontWeight: '600',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default FilterModal;