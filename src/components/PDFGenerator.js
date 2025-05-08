import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

// 定義樣式
const styles = StyleSheet.create({
  page: {
    paddingTop: 80, // pt-[8rem] ≈ 80pt
    paddingHorizontal: 40, // 模擬 max-w-[1280px] 的左右間距
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  container: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 16, // pb-[2rem]
    marginBottom: 16,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 100,
    marginRight: 16,
  },
  itemDetails: {
    flexDirection: "column",
    flex: 1,
    marginRight: 16,
  },
  itemTitle: {
    fontWeight:"bold",
    fontSize:11,
  },
  itemSection: {
    flexDirection: "column",
    marginBottom: 8,
  },
  preferences: {
    flexDirection: "column",
    width: 100,
  },
  checkboxText: {
    fontSize: 10,
    marginBottom: 4,
  },
  noteSection: {
    paddingHorizontal: 32, // px-8
    paddingVertical: 16, // py-4
  },
  noteLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    minHeight: 80, // 模擬 rows={5}
  },
});

const PDFGenerator = ({ items = [], noteValue = "" }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        {/* 標題 */}
        <Text style={styles.title}>SELECTED LIST</Text>

        {/* 清單項目 */}
        {items && items.length > 0 ? (
          items.map((item) => {
            const styleNo = item.product?.tProductStyleCode;
            const fabricCode = item.product?.tFabricCode;
            const name = item.product?.tStyleName;
            const styleType = item.product?.tStyleTypeName;
            const image =
              item.product?.tFilePath?.[0] || "https://via.placeholder.com/100"; // 預設圖片
            const fabricType = item.fabric?.tFabricType;
            const composition = item.fabric?.tFabricComposition;
            const printNo = item.print?.tArticleNo;
            const printImage =
              item.print?.tFilePath?.[0] || "https://via.placeholder.com/100";
            const printTech = item.print?.tTechName;

            return styleNo ? (
              // Garment 類型
              <View key={`style-${styleNo}`} style={styles.listItem}>
                <Image style={styles.image} src={image} />
                <View style={styles.itemDetails}>
                  <View style={styles.itemSection}>
                    <Text style={styles.itemTitle}>Garment No: {styleNo}</Text>
                    <Text>{name}</Text>
                    <Text>{styleType}</Text>
                  </View>
                  <View style={styles.itemSection}>
                    <Text style={styles.itemTitle}>
                      Fabric No: {fabricCode}
                    </Text>
                    <Text>{fabricType}</Text>
                    <Text>{composition}</Text>
                  </View>
                </View>
                <View style={styles.preferences}>
                  <Text style={styles.checkboxText}>
                    {item.preferences.includes("garment") ? "[x]" : "[ ]"}{" "}
                    Garment
                  </Text>
                  <Text style={styles.checkboxText}>
                    {item.preferences.includes("fabric") ? "[x]" : "[ ]"} Fabric
                  </Text>
                </View>
              </View>
            ) : (
              // Print 類型
              <View key={`print-${printNo}`} style={styles.listItem}>
                <Image style={styles.image} src={printImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>Print No: {printNo}</Text>
                  {printTech &&
                    printTech.map((tech) => (
                      <Text key={`${printNo}-${tech}`}>{tech}</Text>
                    ))}
                </View>
                <View style={styles.preferences} />
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>Your cart is currently empty.</Text>
        )}

        {/* 備註區塊 */}
        {noteValue && (
          <View style={styles.noteSection}>
            <Text style={styles.noteLabel}>Note:</Text>
            <Text style={styles.noteText}>{noteValue}</Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default PDFGenerator;
