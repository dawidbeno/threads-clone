import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// 1. Define the prop interface
export default function FilterTabs({ isHeaderCollapsed }: { isHeaderCollapsed?: boolean }) {
    const [activeFilter, setActiveFilter] = useState("Primary");
    const filters = ["Primary", "Requests"];
    
    // 2. Extract the scrollable content to avoid duplicating code
    const tabContent = (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
        <TouchableOpacity 
            style={[styles.pillBorder]} 
            onPress={() => console.log("Primary filter selected")}
        >
        <Ionicons name="filter" size={18} color="#000" />
        </TouchableOpacity>
        {filters.map((filter) => {
            const isActive = filter === activeFilter
            return (
                <TouchableOpacity 
                    key={filter} 
                    style={[styles.pillBorder, isActive && styles.activePillBorder]} 
                    onPress={() => setActiveFilter(filter)}
                >
                    <Text style={styles.pillText}>{filter}</Text>
                </TouchableOpacity>
            )
        })}
        </ScrollView>
    );

    return (
        <LinearGradient
            colors={['#fff', '#fff', 'rgba(255,255,255,0)']}
            locations={[0, 0.5, 1]} 
            style={styles.gradientContainer}
        >
            {tabContent}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        paddingBottom: 8, 
        paddingTop: 8,
    },
    scrollContent: {
        paddingRight: 16, 
    },
    pillBorder: {
        borderWidth: 0.5,
        borderColor: '#aaa',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginLeft: 8,
    },
    activePillBorder: {
        borderColor: '#aaa',
        backgroundColor: '#eee'
    },
    pillText: {
        fontSize: 16,
        fontWeight: '500',
    },
});