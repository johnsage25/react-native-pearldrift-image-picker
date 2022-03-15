# react-native-pearldrift-image-picker

[![npm](https://img.shields.io/npm/v/react-native-pearldrift-image-picker.svg)](https://www.npmjs.com/package/react-native- syan-image-picker)
[![npm](https://img.shields.io/npm/dm/react-native-pearldrift-image-picker.svg)](https://www.npmjs.com/package/react-native- syan-image-picker)
[![npm](https://img.shields.io/npm/dt/react-native-pearldrift-image-picker.svg)](https://www.npmjs.com/package/react-native- syan-image-picker)
[![npm](https://img.shields.io/npm/l/react-native-pearldrift-image-picker.svg)](https://github.com/syanbo/react-native-syan- image-picker/blob/master/LICENSE)

## Features

A multi-image selection component based on an existing native third-party framework package, suitable for React Native App.

### Native framework dependencies
* Android: [PictureSelector](https://github.com/LuckSiege/PictureSelector) - by [LuckSiege](https://github.com/LuckSiege)
* iOS: [TZImagePickerController](https://github.com/banchichen/TZImagePickerController) - by [banchichen](https://github.com/banchichen)

### Features
* Support both iOS and Android
* Support single selection and multiple selection
* Customizable cropping area size, support circular cropping
* Compression quality can be set
* Can set whether to return the image base64 encoding
* Support to record the currently selected picture
* Support to delete pictures with specified subscripts

### Live

![](http://img.shaoyan.xyz/github/syan-01.gif)


## Install and use

### Install
````
// Step 1 is based on npm
npm install react-native-pearldrift-image-picker --save

// or yarn
yarn add react-native-pearldrift-image-picker

// Step 2 execute link
react-native link react-native-pearldrift-image-picker

````

### Other configuration
####iOS
##### 1. Add the `bundle` file required in the native framework:
RN version 0.60+ does not require the following configuration to use pods

- TARGETS -> Build Phases -> Copy Bundle Resources
Click the "+" button, click the "Add Other" button in the pop-up window, select
    ````
    node_modules/react-native-pearldrift-image-picker/ios/TZImagePickerController/TZImagePickerController.bundle
    ````

##### 2. Add album related permissions:

- Project Directory->Info.plist->Add

````
 Privacy - Camera Usage Description Allow this app to use your camera to take pictures?
 Privacy - Photo Library Usage Description Please allow access to the album to select photos
 Privacy - Photo Library Additions Usage Description Please allow access to the album to select photos
 Privacy - Location When In Use Usage Description We need to obtain relevant data around you through your geographic location information
````

##### 3. Chinese adaptation:
- Add Chinese PROJECT -> Info -> Localizations Click the "+" button and select Chinese(Simplified)

##### 4. Update TZImagePickerController version

````
pod update TZImagePickerController
````

#### Android

##### 1. Add permissions in `AndroidManifest.xml`:
````xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
````

##### 2. To update to PictureSelector, you need to modify minSdkVersion:
```gradle
//app/build.gradle

android {
    minSdkVersion = 19
    ...
}
````

##### 3. Dynamically obtain permissions before taking pictures
````js
requestPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Apply for permission to read and write mobile phone storage',
                    message:
                        'A cool app wants to borrow your camera,' +
                        'Then you can make cool soap flakes. ',
                    buttonNeutral: 'Ask me later',
                    buttonNegative: 'No',
                    buttonPositive: 'Ok',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Now you have camera permission');
            } else {
                console.log('The user doesn't give you');
            }
        } catch (err) {
            console.warn(err);
        }
    };
````

##### 4. The glide version is required to use fast-image at the same time
In the buildscript of build.gradle, add glideVersion under ext to specify the same version as fast-image
Added pictureVersion custom picture_library version

### Pay attention to the installation and running error
1. Check whether the automatic link is successful
2. Use Android Studio to check whether `new RNSyanImagePickerPackage()` is added to the `MainApplication.java` file
3. Use Android Studio to open the project to check if Gradle is synced

## link failed manually added (<0.60)
###iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-pearldrift-image-picker` and add `RNSyanImagePicker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSyanImagePicker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

  - Add `import com.reactlibrary.RNSyanImagePickerPackage;` to the imports at the top of the file
  - Add `new RNSyanImagePickerPackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
  ```gradle
  include ':react-native-pearldrift-image-picker'
  project(':react-native-pearldrift-image-picker').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-pearldrift-image-picker/android')
  ````

3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  ```gradle
      compile project(':react-native-pearldrift-image-picker')
  ````

## Configuration parameter description
When the component is called, it supports passing in an `options` object. The properties that can be set are as follows:

property name | type | optional | default value | description
---------------- | ------ | -------- | ----------- | ----- ------
imageCount | int | yes | 6 | maximum number of selected images
isRecordSelected | bool | yes | false | record currently selected picture
isCamera