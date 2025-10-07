import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "@/src/components/global/searchBar";
import { globalColors } from "@/src/styles/global";
import StylizedDropdown, { StylizedDropdownItem } from "../../global/dropdowns";

export type SearchModuleValues = {
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
        onSearch={(query: any) => {
          setSearchBuffer((prev: any) => {
            const updated = { ...prev, query };
            onQueryChange(updated);
            return updated;
          });
        }}
      />
      <View style={styles.filters}>
        <StylizedDropdown
          data={servicesDropdownData}
          placeholder="All Service"
          style={styles.dropdown}
          onValueChange={(selectedService: string) => {
            setSearchBuffer((prev: any) => {
              let updated;
              if (selectedService === "all")
                updated = { ...prev, service: undefined };
              else updated = { ...prev, service: selectedService };
              onQueryChange(updated);
              return updated;
            });
          }}
        />
        <StylizedDropdown
          data={stateDropdownData}
          placeholder="All Status"
          style={styles.dropdown}
          onValueChange={(selectedStatus: any) => {
            setSearchBuffer((prev: any) => {
              let updated;
              switch (selectedStatus) {
                case "all":
                  updated = { ...prev, status: undefined };
                  break;
                case "on":
                  updated = { ...prev, status: true };
                  break;
                case "off":
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

const stateDropdownData: StylizedDropdownItem[] = [
  { label: "All status", value: "all" },
  { label: "On", value: "on" },
  { label: "Off", value: "off" },
];

// Placeholders
const servicesDropdownData: StylizedDropdownItem[] = [
  { label: "All services", value: "all" },
  { label: "Github", value: "github" },
  { label: "Google", value: "google" },
  { label: "Discord", value: "discord" },
  { label: "Spotify", value: "spotify" },
  { label: "Twitter", value: "twitter" },
  { label: "Microsoft", value: "microsoft" },
];

export default SearchModule;
