import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FroalaModalEditor() {
  const [visible, setVisible] = useState(false);

  const froalaHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/froala-editor@4.0.14/css/froala_editor.pkgd.min.css">
      <script src="https://cdn.jsdelivr.net/npm/froala-editor@4.0.14/js/froala_editor.pkgd.min.js"></script>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          background: white;
        }
        #editor {
          margin: 0;
          height: 100%;
        }
      </style>
    </head>
    <body>
      <div id="editor">Start writing...</div>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
          new FroalaEditor('#editor', {
            height: '100%',
            events: {
              contentChanged: function () {
                if (window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage(this.html.get());
                }
              }
            }
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Open Froala Editor</Text>
        </TouchableOpacity>

        <Modal visible={visible} animationType="slide">
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <WebView
                style={{ flex: 1 }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                source={{ html: froalaHtml }}
                onMessage={(event) => {
                  const content = event.nativeEvent.data;
                  console.log('Editor Content:', content);
                }}
                onError={(e) => console.log('WebView Error', e.nativeEvent)}
                onHttpError={(e) => console.log('WebView HTTP Error', e.nativeEvent)}
            />
          </View>
        </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
