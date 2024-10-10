import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Home: React.FC = () => {
  const [home, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8000/retriveuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: sessionStorage.getItem("email") }),
        });

        const data = await response.json();
        if (response.ok) {

          setStudent(data.response);
        } else {
          Toast.show({
            type: "error",
            text1: "Error fetching data",
            text2: data.error || 'An unknown error occurred.',
          });
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: 'Error:',
          text2: error.message || 'Failed to connect to the server.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Student Details</Text>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Image</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Image
                source={{ uri: "https://picsum.photos/seed/picsum/60/60" }}
                style={styles.image}
                accessibilityLabel="Student Profile Image"
              />
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Name</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.cellText}>{home.name}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Email</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.cellText}>{home.email}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Branch</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.cellText}>{home.branch}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Phone Number</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.cellText}>{home.phone_number}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Streak</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.cellText}>{home.attendance_streak}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.cellText}>Year</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.cellText}>{home.year}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    fontSize: 40,
    fontWeight: '200',
    fontFamily: "Roboto",
    marginBottom: 20,
  },
  cellText: {
    color: 'black',
    fontWeight: '600',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

export default Home;
