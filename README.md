#  ALKO
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: Requirements
  * Node 6
  * React Native CLI: Follow the instructions below for your Development and Mobile OS
  https://facebook.github.io/react-native/docs/getting-started.html#content
  * Yarn: https://yarnpkg.com/en/docs/install

  * for iOS
    * Xcode 8

  * for Android
    * Android SDK
        - SDK Platform API 23
        - Android SDK Build-tools 23.0.1
        - Android SDK Build-tools 23.0.3

      On MacOS/Linux, define the path to your SDK directory.
      ```
      $ vim ~/.bash_profile
      export ANDROID_HOME=/Users/<your-user>/Library/Android/sdk
      export PATH=$ANDROID_HOME/tools:$PATH
      export PATH=$ANDROID_HOME/platform-tools:$PATH
      ```

      Run `(cd android && ./gradlew clean)`


## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn install` or `npm install`

## :arrow_forward: How to Run DEV App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion / Connect your real device
    * run `react-native run-android`

## :arrow_forward: How to Run RELEASE App

**iOS**

1. cd to the repo
2. Bundle JS source
  * Run `react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output iOS/main.jsbundle`
3. Open */ALKO/ios/ALKO.xcodeproj*
4. Choose menu */Product/Scheme/Edit Scheme*
5. Change `Build Configuration` to `Release` and click *Close*
6. If you have a developer account, generate **certificate** and **provisioning** for **com.tzusman.ALKO**, more information you can take a look at: [Build iOS app on an iPhone tutorial](http://codewithchris.com/deploy-your-app-on-an-iphone/))

   If you don't, follow the instructions on [Deploying to a Device without an Apple Developer Account](http://blog.ionic.io/deploying-to-a-device-without-an-apple-developer-account/)
6. Choose your device, and click `Run`.

**Android**

1. cd to the repo
2. Enable Debugging over USB
3. Plug in your device via USB
4. Run your app with `react-native run-android`

For more information you can take a look at [Running React Native App on Device](http://facebook.github.io/react-native/releases/0.38/docs/running-on-device.html)

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
