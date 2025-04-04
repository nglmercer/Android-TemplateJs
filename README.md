# Building for Android

This project uses Capacitor to build native mobile apps. Here's how to build for Android:

1.  **Add the Android platform:**

    ```bash
    ionic capacitor add android
    ```

2.  **Copy the web assets to the native project:**

    ```bash
    ionic capacitor copy android
    ```

3.  **Open the Android project in Android Studio:**

    ```bash
    ionic capacitor open android
    ```

4.  **Build and run the app using Android Studio.**

    In Android Studio, select "Build" -> "Build Bundle(s) / APK(s)" -> "Build APK(s)" or "Build Bundle(s)". You can then run the app on an emulator or a connected Android device.

## Additional Notes

*   Make sure you have the Android SDK installed and configured correctly.
*   You may need to configure the `capacitor.config.ts` file with your app's details.
*   If you encounter the error "Unable to launch Android Studio. Is it installed?", you need to set the `CAPACITOR_ANDROID_STUDIO_PATH` environment variable to point to the correct location of the `studio.sh` file within the Android Studio installation directory. For example:

```bash
/var/lib/flatpak/app/com.google.AndroidStudio/x86_64/stable/3b218be5c5c384c0f2537260622f72e7ab501643c85515fbe791a2149afc8099/files/extra/android-studio/bin/studio.sh
                export CAPACITOR_ANDROID_STUDIO_PATH="/var/lib/flatpak/app/com.google.AndroidStudio/x86_64/stable/3b218be5c5c384c0f2537260622f72e7ab501643c85515fbe791a2149afc8099/files/extra/android-studio/bin/studio.sh"
```

    (Replace `/var/lib/flatpak/app/com.google.AndroidStudio/x86_64/stable/3b218be5c5c384c0f2537260622f72e7ab501643c85515fbe791a2149afc8099/files/extra/android-studio/bin/studio.sh` with the actual path to your Android Studio installation.)
*   Refer to the Capacitor documentation for more information: [https://capacitorjs.com/docs/android](https://capacitorjs.com/docs/android)
