import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioScreen({ navigation }) {
    const [recording, setRecording] = useState(null);
    const [audioUri, setAudioUri] = useState(null);
    const [sound, setSound] = useState(null);

    // Start recording
    const startRecording = async () => {
        try {
            // Request microphone permissions
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Please allow microphone access to record audio.');
                return;
            }

            // Prepare the recording options
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    };

    // Stop recording
    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setAudioUri(uri);
            setRecording(null);
        } catch (error) {
            console.error('Failed to stop recording:', error);
        }
    };

    // Play the recorded audio
    const playAudio = async () => {
        if (!audioUri) {
            Alert.alert('No Audio', 'Please record audio first!');
            return;
        }

        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioUri },
                { shouldPlay: true }
            );
            setSound(sound);

            // Cleanup after playback finishes
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Failed to play audio:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Audio Recorder</Text>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            <Button
                title="Play Recording"
                onPress={playAudio}
                disabled={!audioUri}
                style={styles.button}
            />
            <View style={styles.bottomButton}>
                <Button
                    title="Go to video Screen"
                    onPress={() => navigation.navigate('VideoScreen')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        marginTop: 20,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
});
