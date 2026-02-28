import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function FilterTabs() {
    const [activeFilter, setActiveFilter] = useState("All");
    const filters = ["All", "Follows", "Replies", "Mentions", "Quotes"]
    return (
        <LinearGradient
            colors={['#fff', 'rgba(255,255,255,150)', 'rgba(255,255,255,0)']}
            locations={[0, 0.5, 1]}
            style={styles.scrollViewBackground}
            >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => {
                const isActive = filter === activeFilter
                return (
                    <TouchableOpacity key={filter} style={[styles.pillBorder, isActive && styles.activePillBorder]} onPress={() => setActiveFilter(filter)}>
                        <Text style={styles.pillText}>{filter}</Text>
                    </TouchableOpacity>
                )
            })}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollViewBackground: {
        marginBottom: 0,
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

