import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

export default function ImageScreen({ navigation }) {
    const [image, setImage] = useState(null); // State to hold the image URI

    // Function to request permissions and take a picture
    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Camera permissions are required to take a picture.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // Allow editing of the image
            aspect: [4, 3],      // Set aspect ratio (optional)
            quality: 1,          // Image quality (1 is best)
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri); // Save the image URI to state
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Take a Picture" onPress={takePicture} />
            {image && ( // If an image URI is set, display the image
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
            )}
            <View style={styles.bottomButton}>
                <Button
                    title="Go to Audio Screen"
                    onPress={() => navigation.navigate('AudioScreen')}
                />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    image: {
        width: 200, // Image width in pixels
        height: 200, // Image height in pixels
        marginTop: 20, // Spacing above the image
        borderRadius: 10, // Optional: Rounded corners
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});
