import React from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      url: '',
      copyright: '',
      title: '',
      explanation: '',
    };
  }
  loadWallpapers = () => {
    axios
      .get(
        'https://api.nasa.gov/planetary/apod?api_key=LKhUiueZQt2zBMB1ysvFDGInNBxEZ8eJKTRjM2um',
      )
      .then(
        function (response) {
          this.setState({
            url: response.data.hdurl,
            isLoading: false,
            title: response.data.title,
            explanation: response.data.explanation,
            copyright: response.data.copyright,
          });
        }.bind(this),
      )
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log('request completed');
      });
  };
  setWallpaper = async () => {
    ManageWallpaper.setWallpaper(
      {
        uri: this.state.url,
      },
      this._callback,
      TYPE.HOME,
    );
  };
  componentDidMount() {
    this.loadWallpapers();
  }

  render() {
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgrey',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: this.state.url}}
          style={{width: 450, height: 500}}
        />
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: 'black',
          }}>
          {this.state.title}, by {this.state.copyright}
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            color: 'black',
            paddingVertical: 10,
          }}>
          via NASA
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'darkblue',
            borderRadius: 50,
            width: 250,
            height: 50,
            margin: 0,
          }}
          onPress={() => this.setWallpaper()}>
          <Text
            style={{
              fontSize: 20,
              margin: 25,
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFFFFF',
            }}>
            Set Today's Wallpaper
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
