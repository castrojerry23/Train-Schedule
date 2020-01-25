$(document).ready(function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBzcp7jl7gPULO1-q_qNgiVMHaygLePbFM",
        authDomain: "train-schedule-638cb.firebaseapp.com",
        databaseURL: "https://train-schedule-638cb.firebaseio.com",
        projectId: "train-schedule-638cb",
        storageBucket: "train-schedule-638cb.appspot.com",
        messagingSenderId: "498628638158",
        appId: "1:498628638158:web:2e555f1118ab3e1901679f",
        measurementId: "G-9T1HWR90XP"
      };

      let database = firebase.database();

      let trainNumber;
      let trainLine;
      let trainDestination;
      let trainDeparture;
      let nextTrain;
      let minutesAway;
      let trainFrequency;
      let trainTiming;
      let trainPlatform;
      let currentTime = moment();
      console.log('CURRENT TIME: ' + moment(currentTime).format('hh:mm:ss A'));
      
      
      let model = {
      
          pushNewTrain: () => {
      
      
              database.ref().push({
      
                  trainDeparture: trainDeparture,
                  trainDestination: trainDestination,
                  trainFrequency: trainFrequency,
                  trainLine: trainLine,
                  trainNumber: trainNumber,
                  trainPlatform: trainPlatform,
                  dateAdded: firebase.database.ServerValue.TIMESTAMP
      
              });
      
              model.pullChildFromDatabase();
      
          },
      
          pullChildFromDatabase: () => {
      
            let filter = database.ref().orderByChild("dateAdded").limitToLast(1)
      
              filter.once("child_added", function(childSnapshot) {
      
                  trainNumber = childSnapshot.val().trainNumber
                  trainLine = childSnapshot.val().trainLine
                  trainDestination = childSnapshot.val().trainDestination
                  trainDeparture = childSnapshot.val().trainDeparture
                  trainFrequency = childSnapshot.val().trainFrequency
                  trainPlatform = childSnapshot.val().trainPlatform
      

      
                  view.updateTrainScheduleTable();
              });
      
          },
      
          initialDatabasePull: () => {
      
              database.ref().on("value", function(snapshot) {
                let trains = snapshot.val();
      
      
                      $('#train-schedule-body').empty();
      
                      for (let index in trains){
                          trainNumber = trains[index].trainNumber
                          trainLine = trains[index].trainLine
                          trainDestination = trains[index].trainDestination
                          trainDeparture = trains[index].trainDeparture
                          trainFrequency = trains[index].trainFrequency
                          trainPlatform = trains[index].trainPlatform
      
                          controller.nextArrival();
                          controller.minutesAway();
                          view.updateTrainScheduleTable();
                      };
      
              }, function(errorObject) {
                    console.log("Errors handled: " + errorObject.code);
      
              });
          }
      
      }