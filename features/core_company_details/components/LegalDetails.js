import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCompany } from '../context/CompanyContext';

export default function LegalDetails() {
  const { companyData } = useCompany();
  const { legalDetails } = companyData;

  const renderCertification = (cert, index) => (
    <View key={index} style={styles.certCard}>
      <Text style={styles.certName}>{cert.name}</Text>
      <Text style={styles.certDescription}>{cert.description}</Text>
      <View style={styles.certMeta}>
        <Text style={styles.certValidUntil}>Valid until: {cert.validUntil}</Text>
        <Text style={styles.certIssuer}>By: {cert.issuedBy || cert.region}</Text>
      </View>
    </View>
  );

  const renderFundingRound = (round, index) => (
    <View key={index} style={styles.fundingRound}>
      <LinearGradient
        colors={['#4091FF', '#3F7EF8']}
        style={styles.roundBadge}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.roundStage}>{round.stage}</Text>
      </LinearGradient>
      <View style={styles.roundDetails}>
        <Text style={styles.roundYear}>{round.year}</Text>
        <Text style={styles.roundAmount}>{round.amount}</Text>
        <Text style={styles.roundInvestor}>{round.leadInvestor}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Company Type Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>⚖️</Text>
            <Text style={styles.sectionTitle}>Company Type</Text>
          </View>
          <View style={styles.typeCard}>
            <Text style={styles.typeValue}>{legalDetails.companyType}</Text>
          </View>
        </View>

        {/* Legal Structure Section */}
        {legalDetails.legalStructure && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📋</Text>
              <Text style={styles.sectionTitle}>Legal Structure</Text>
            </View>
            <View style={styles.structureDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{legalDetails.legalStructure.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Registration</Text>
                <Text style={styles.detailValue}>{legalDetails.legalStructure.registrationNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Incorporated</Text>
                <Text style={styles.detailValue}>{legalDetails.legalStructure.incorporationDate}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Parent Company Section */}
        {legalDetails.parentCompany && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🏢</Text>
              <Text style={styles.sectionTitle}>Parent Company</Text>
            </View>
            <View style={styles.parentCompanyCard}>
              {legalDetails.parentCompany.logo && (
                <Image 
                  source={{ uri: legalDetails.parentCompany.logo }}
                  style={styles.companyLogo}
                  resizeMode="contain"
                />
              )}
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>{legalDetails.parentCompany.name}</Text>
                <Text style={styles.companyDetail}>
                  {legalDetails.parentCompany.relationship} ({legalDetails.parentCompany.ownershipPercentage}%)
                </Text>
                <Text style={styles.companyLocation}>{legalDetails.parentCompany.headquartered}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Subsidiaries Section */}
        {legalDetails.subsidiaries && legalDetails.subsidiaries.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🔄</Text>
              <Text style={styles.sectionTitle}>Subsidiaries</Text>
            </View>
            {legalDetails.subsidiaries.map((subsidiary, index) => (
              <View key={index} style={styles.subsidiaryCard}>
                {subsidiary.logo && (
                  <Image 
                    source={{ uri: subsidiary.logo }}
                    style={styles.subsidiaryLogo}
                    resizeMode="contain"
                  />
                )}
                <View style={styles.subsidiaryInfo}>
                  <Text style={styles.subsidiaryName}>{subsidiary.name}</Text>
                  <Text style={styles.subsidiaryLocation}>{subsidiary.location}</Text>
                  {subsidiary.keyProducts && (
                    <View style={styles.productsContainer}>
                      {subsidiary.keyProducts.map((product, idx) => (
                        <Text key={idx} style={styles.productTag}>{product}</Text>
                      ))}
                    </View>
                  )}
                </View>
                <View style={styles.ownershipBadge}>
                  <Text style={styles.ownershipText}>{subsidiary.ownershipPercentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Compliance Section */}
        {legalDetails.compliance?.certifications && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>✅</Text>
              <Text style={styles.sectionTitle}>Compliance & Certifications</Text>
            </View>
            <View style={styles.certificationsGrid}>
              {legalDetails.compliance.certifications.map((cert, index) => 
                renderCertification(cert, index)
              )}
            </View>
          </View>
        )}

        {/* Funding History Section */}
        {legalDetails.fundingHistory?.rounds && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>💰</Text>
              <Text style={styles.sectionTitle}>Funding History</Text>
            </View>
            <View style={styles.fundingTimeline}>
              {legalDetails.fundingHistory.rounds.map((round, index) => 
                renderFundingRound(round, index)
              )}
            </View>
          </View>
        )}

        {/* Stock Information Section */}
        {legalDetails.stockInfo && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📈</Text>
              <Text style={styles.sectionTitle}>Stock Information</Text>
            </View>
            <LinearGradient
              colors={['#4158D0', '#C850C0']}
              style={styles.stockCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.stockGrid}>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>Exchange</Text>
                  <Text style={styles.stockValue}>{legalDetails.stockInfo.exchange}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>Ticker</Text>
                  <Text style={styles.stockValue}>{legalDetails.stockInfo.ticker}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>Market Cap</Text>
                  <Text style={styles.stockValue}>{legalDetails.stockInfo.marketCap}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>Shares</Text>
                  <Text style={styles.stockValue}>{legalDetails.stockInfo.sharesOutstanding}</Text>
                </View>
              </View>
              {legalDetails.stockInfo.ipoDetails && (
                <>
                  <View style={styles.ipoDivider} />
                  <View style={styles.ipoInfo}>
                    <Text style={styles.ipoTitle}>IPO Details</Text>
                    <View style={styles.ipoGrid}>
                      <View style={styles.ipoItem}>
                        <Text style={styles.ipoLabel}>Date</Text>
                        <Text style={styles.ipoValue}>{legalDetails.stockInfo.ipoDetails.date}</Text>
                      </View>
                      <View style={styles.ipoItem}>
                        <Text style={styles.ipoLabel}>Initial Price</Text>
                        <Text style={styles.ipoValue}>{legalDetails.stockInfo.ipoDetails.initialPrice}</Text>
                      </View>
                      <View style={styles.ipoItem}>
                        <Text style={styles.ipoLabel}>Valuation</Text>
                        <Text style={styles.ipoValue}>{legalDetails.stockInfo.ipoDetails.initialValuation}</Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </LinearGradient>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  structureDetails: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  parentCompanyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  companyDetail: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  companyLocation: {
    fontSize: 11,
    color: '#888',
  },
  subsidiaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  subsidiaryLogo: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  subsidiaryInfo: {
    flex: 1,
  },
  subsidiaryName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  subsidiaryLocation: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  productTag: {
    fontSize: 10,
    color: '#4158D0',
    backgroundColor: '#e8eeff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ownershipBadge: {
    backgroundColor: '#4158D0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  ownershipText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  certificationsGrid: {
    gap: 8,
  },
  certCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
  },
  certName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  certDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  certMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  certValidUntil: {
    fontSize: 11,
    color: '#888',
  },
  certIssuer: {
    fontSize: 11,
    color: '#888',
  },
  fundingTimeline: {
    gap: 12,
  },
  fundingRound: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  roundStage: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  roundDetails: {
    flex: 1,
  },
  roundYear: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  roundAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  roundInvestor: {
    fontSize: 11,
    color: '#888',
  },
  stockCard: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  stockItem: {
    flex: 1,
    minWidth: '40%',
  },
  stockLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  ipoDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  ipoInfo: {
    marginTop: 8,
  },
  ipoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  ipoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  ipoItem: {
    flex: 1,
  },
  ipoLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  ipoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  typeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  typeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
}); 