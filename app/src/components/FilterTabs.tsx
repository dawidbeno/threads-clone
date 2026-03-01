import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// 1. Define the prop interface
export default function FilterTabs({ isHeaderCollapsed }: { isHeaderCollapsed?: boolean }) {
    const [activeFilter, setActiveFilter] = useState("All");
    const filters = ["All", "Follows", "Replies", "Mentions", "Quotes"];
    
    // 2. Extract the scrollable content to avoid duplicating code
    const tabContent = (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
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

    // 3. Conditionally render the Gradient wrapper vs a standard View wrapper
    return isHeaderCollapsed ? (
        <LinearGradient
            colors={['#fff', '#fff', 'rgba(255,255,255,0)']}
            locations={[0, 0.5, 1]} 
            style={styles.gradientContainer}
        >
            {tabContent}
        </LinearGradient>
    ) : (
        <View style={styles.gradientContainer}>
            {tabContent}
        </View>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        paddingBottom: 0, 
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
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginLeft: 8,
    },
    activePillBorder: {
        borderColor: '#000',
        backgroundColor: '#eee'
    },
    pillText: {
        fontSize: 16,
        fontWeight: '500',
    },
});