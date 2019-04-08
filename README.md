
# react-native-bsrefresh-list-view

## Getting started

`$ npm install react-native-bsrefresh-list-view --save`

### Mostly automatic installation

`$ react-native link react-native-bsrefresh-list-view`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-bsrefresh-list-view` and add `RNBsrefreshListView.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNBsrefreshListView.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNBsrefreshListViewPackage;` to the imports at the top of the file
  - Add `new RNBsrefreshListViewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-bsrefresh-list-view'
  	project(':react-native-bsrefresh-list-view').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-bsrefresh-list-view/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-bsrefresh-list-view')
  	```

## Usage
```javascript
import RNBsrefreshListView from 'react-native-bsrefresh-list-view';

// TODO: What to do with the module?
RNBsrefreshListView;
```
  
