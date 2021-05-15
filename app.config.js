export default {
    expo: {
        owner: "a-team",
        name: "react-naitiv-practice",
        slug: "stoop-test",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#000000"
        },
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
            config: {
                googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
            }
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            favicon: "./assets/favicon.png"
        }
    }
}