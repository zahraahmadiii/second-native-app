import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Video } from 'expo-av'; // Import Video from expo-av
import * as ImagePicker from 'expo-image-picker';

export default function VideoScreen({ navigation }) {
    const [videoUri, setVideoUri] = useState(null); // State to hold the video URI

    // Function to record a video
    const recordVideo = async () => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Camera permissions are required to record a video.');
            return;
        }

        // Launch the camera for video recording
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1, // Highest quality
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri); // Save the video URI to state
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Record Video" onPress={recordVideo} />
            {videoUri && ( // Show the video player if a video is recorded
                <Video
                    source={{ uri: videoUri }}
                    style={styles.video}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    video: {
        width: '100%',
        height: 300,
        marginTop: 20,
    },
});
