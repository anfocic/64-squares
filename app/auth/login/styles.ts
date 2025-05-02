import { StyleSheet } from "react-native";

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#181818",
        borderRadius: 16,
        padding: 24,
        width: "90%",
        maxWidth: 400,
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    logoImage: {
        width: 36,
        height: 36,
        marginRight: 8,
    },
    logoText: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#333",
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: "#fff",
        height: 48,
        fontSize: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    rememberMe: {
        flexDirection: "row",
        alignItems: "center",
    },
    rememberMeText: {
        color: "#ccc",
        marginLeft: 6,
        fontSize: 14,
    },
    forgotPassword: {
        color: "#8bc34a",
        fontSize: 14,
        textDecorationLine: "underline",
    },
    loginButton: {
        backgroundColor: "#8bc34a",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 24,
    },
    loginButtonText: {
        color: "#181818",
        fontWeight: "bold",
        fontSize: 18,
    },
    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#333",
    },
    orText: {
        color: "#888",
        marginHorizontal: 12,
        fontSize: 14,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    socialButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        color: "#ccc",
        fontSize: 14,
    },
    footerLink: {
        color: "#8bc34a",
        fontSize: 14,
        textDecorationLine: "underline",
    },
});
