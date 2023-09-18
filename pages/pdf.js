
import { getFromLocalStorage } from "@/utils/localStorage";
import { Document, Page, View, Text, Image, PDFViewer, Font } from "@react-pdf/renderer";
import { useState, useEffect } from "react";

Font.register({ family: "Inter" })
const emailDataPDF = getFromLocalStorage('emaildata') || {};

const PDF = () => {
    return (
        <Document>
            <Page size="A4"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: 30,
                }}>
                <View>
                    <Text style={{ color: "#3388af", fontSize: "35px" }}>Confirmation Order</Text>
                    <Text>Hi {emailDataPDF.name} Thank you for trust in us!</Text>
                    <Text>Total amount to pay:{emailDataPDF.total} USD</Text>
                    <Text>Address:{emailDataPDF.streetAddress},{emailDataPDF.city} {emailDataPDF.postalCode}</Text>
                    <Text>Your can check your order in </Text>
                </View>
            </Page>
        </Document>
    )
}

const PDFView = () => {
    const [client, setClient] = useState(false);
    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
            <PDF />
        </PDFViewer>
    )
}
export default PDFView 