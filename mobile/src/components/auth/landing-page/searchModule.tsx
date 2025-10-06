import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "@/src/components/global/searchBar";
import Dropdown from "@/src/components/global/dropdown";
import { globalColors } from "@/src/styles/global";

type SearchModuleValues = {
  query?: string;
  service?: string;
  status?: boolean;
};

type SearchModuleProps = {
  onQueryChange: (searchValues: SearchModuleValues) => void;
};

const SearchModule: React.FC<SearchModuleProps> = ({ onQueryChange }) => {
  const [, setSearchBuffer] = useState<SearchModuleValues>({
    query: "",
    service: undefined,
    status: undefined,
  });

  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={(query) => {
          setSearchBuffer((prev) => {
            const updated = { ...prev, query };
            onQueryChange(updated);
            return updated;
          });
        }}
      />
      <View style={styles.filters}>
        <Dropdown
          options={services}
          placeholder="All Service"
          style={styles.dropdown}
          onValueChange={(selectedService) => {
            setSearchBuffer((prev) => {
              let updated;
              if (selectedService === "All Services")
                updated = { ...prev, service: undefined };
              else updated = { ...prev, service: selectedService };
              onQueryChange(updated);
              return updated;
            });
          }}
        />
        <Dropdown
          options={["All Status", "On", "Off"]}
          placeholder="All Status"
          style={styles.dropdown}
          onValueChange={(selectedStatus) => {
            setSearchBuffer((prev) => {
              let updated;
              switch (selectedStatus) {
                case "All Status":
                  updated = { ...prev, status: undefined };
                  break;
                case "On":
                  updated = { ...prev, status: true };
                  break;
                case "Off":
                  updated = { ...prev, status: false };
                  break;
                default:
                  updated = prev;
              }
              onQueryChange(updated);
              return updated;
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    gap: 10,
    backgroundColor: globalColors.highlightBackground,

    // iOS shadow
    shadowColor: globalColors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Android shadow
    elevation: 10,
  },
  filters: {
    flexDirection: "row",
    gap: 10,
  },
  dropdown: {
    flex: 1,
  },
});

// Placeholders
const services = ["All Services", "google", "timer", "discord"];

export default SearchModule;
