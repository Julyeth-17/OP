import { themeQuartz } from "ag-grid-community";
// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz
	.withParams({
        accentColor: "#0086F4",
        backgroundColor: "#F1EDE1",
        borderColor: "#98968F",
        borderRadius: 0,
        browserColorScheme: "light",
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        fontFamily: {
            googleFont: "Pixelify Sans"
        },
        fontSize: 15,
        foregroundColor: "#605E57",
        headerBackgroundColor: "#E4DAD1",
        headerFontSize: 15,
        headerFontWeight: 700,
        headerTextColor: "#3C3A35",
        rowVerticalPaddingScale: 1.2,
        spacing: 5,
        wrapperBorderRadius: 0
    });

    export default myTheme;
