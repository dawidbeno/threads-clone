import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function NotificationCard() {
    return (
        <>
        <View style={styles.iconRow}>
            <View style={styles.threadsIcon}>
                <Ionicons name="logo-threads" size={24} color="#fff" />
            </View>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '30%' }]} />
                <View style={[styles.progressBar, { width: '50%' }]} />
            </View>
            <View style={styles.mailIcon}>
                <Ionicons name="mail-outline" size={20} color="#aaa" />
            </View>
        </View>

        <View style={styles.container}>
            <Text style={styles.textTitle}>Uz nikdy nezmeskate spravu</Text>
            <Text style={styles.textSubtitle}>Zapnite si upozornenia pre svoj novy priecinok prijatych sprav.</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Turn on notifications</Text>
            </TouchableOpacity>
        </View>

    </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textSubtitle: {
        fontSize: 14,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 8,
    },
    button: {
        marginTop: 12,
    },
    buttonText: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 12,
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        alignSelf: 'stretch',
        marginHorizontal: 60,
    },
    threadsIcon: {
        backgroundColor: '#222',
        borderRadius: 8,
        padding: 4,
    },
    progressBarContainer: {
        flex: 1,
        gap: 6, // Reduced gap for a tighter look with thinner lines
        justifyContent: 'center', // Centers the thin lines vertically
        marginHorizontal: 10,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#ddd',
        borderRadius: 3,
    },
    mailIcon: {
        padding: 4,
    },
}); 
