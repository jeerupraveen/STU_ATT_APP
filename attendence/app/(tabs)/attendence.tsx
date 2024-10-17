import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AnimatedFAB, DataTable } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { api } from '@/constants/api';
interface Student {
  _id: string;
  name: string;
  year: string;
  branch: string;
  regno: string;
  attendance_streak: number;
}

const Attendence: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${api}/retrieveAll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        setStudents(result.response);
      } else {
        throw new Error(result.message);
      }
      // console.log(result.response)
    } catch (err: any) {
      Toast.show({
        text1: 'Error',
        text2: err.message || 'Failed to fetch student data',
        type: 'error',
      });
    }
  };

  const handleAttend = async (id: string, currentStreak: number) => {
    try {
      const response = await fetch(`${api}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, attendance_streak: currentStreak}),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Failed to mark attendance');
      }

      Toast.show({
        text1: 'Success',
        text2: 'Attendance marked successfully!',
        type: 'success',
      });
      fetchData();
    } catch (error: any) {
      Toast.show({
        text1: 'Error',
        text2: error.message || 'An error occurred while marking attendance',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>STUDENT ATTENDANCE</Text>
        </View>
        <View>
          <DataTable>
            {students.map((item, index) => (
              <View key={item._id} style={styles.studentContainer}>
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
                  <DataTable.Cell><Text style={styles.cellLabel}>Streak</Text></DataTable.Cell>
                  <DataTable.Cell><Text style={styles.cellValue}>{item.attendance_streak}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1, justifyContent: "center", alignContent: 'center' }}>
                    <TouchableOpacity onPress={() => handleAttend(item._id, item.attendance_streak)}>
                      <Text style={styles.attendButton}>ATTEND</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              </View>
            ))}
          </DataTable>
        </View>
      </ScrollView>
      <AnimatedFAB icon="plus" label="plus" extended={false} visible={true} style={{ position: "absolute", bottom: 16, right: 16 }} />
      <Toast />
    </>
  );
};

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
  attendButton: {
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
    borderColor: '#F0F3FB',
  },
});

export default Attendence;
