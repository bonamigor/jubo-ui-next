import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1
  }
});

const OrderPDF = () => (
  <Document>
    <Page size="A4" orientation='landscape' style={styles.page}>
      <View style={styles.section}>
        <Text>COOPACO</Text>
        <Text>CNPJ: 33.507.873/0001-44</Text>
        <Text>Endereço: Rua 03, QD. 07, LT. 13, Sala 03, Recanto das Emboabas</Text>
        <Text>Cidade / Estado: Aparecida de Goiânia / Goiás</Text>
      </View>
      <View style={styles.section}>
        <Text>Pedido 490</Text>
        <Text>Cliente: PREFEITURA DE APARECIDA DE GOIANIA</Text>
        <Text>Endereço: RUA GERVASIO PINHEIRO, AREA PUBLICA, S/N</Text>
        <Text>Cidade/Estado: Aparecida de Goiânia / Goiás</Text>
        <Text>Telefone: 6235455801</Text>
        <Text>Data de Entrega: 02/02/2023</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)

export default OrderPDF;
