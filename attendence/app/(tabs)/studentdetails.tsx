import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';

// Define a type for the student data
interface Student {
  name: string;
  year: string;
  branch: string;
  regno: string;
  email: string;
  phone_number: string;
}

const Studentdetails: React.FC = () => {
  const [data, setData] = useState<Student[]>([]); // State to hold student data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error status

  // Fetch student data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/retrieveAll", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          setData(result.response); // Set the retrieved student data
        } else {
          setError(result.message); // Set error message
        }
      } catch (err: any) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} showsVerticalScrollIndicator={false}>
      <View style={{ width: 400, height: 100, justifyContent: "center", alignItems: "center" }}>
        <Toast />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginBottom:30 }}>
        <Text style={styles.title}>STUDENT DETAILS</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginVertical: 20 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <DataTable>
            {data.map((item, index) => (
              <View key={index} style={styles.studentContainer}>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>S.NO</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{index + 1}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Name</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.name}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Year</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.year}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Branch</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.branch}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Register Number</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.regno}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Email</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.email}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell><Text style={styles.cellLabel}>Phone Number</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.phone_number}</Text></DataTable.Cell>
                </DataTable.Row>
              </View>
            ))}
          </DataTable>
        </View>
      )}
    </ScrollView>
  );
};

// Define the styles
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  studentContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F0F3FB',
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  cellLabel: {
    flex: 1,
    fontSize: 12,
    justifyContent: 'center',
    alignContent: 'center',
  },
  cellValue: {
    flex: 2,
    fontSize: 14,
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Studentdetails;
