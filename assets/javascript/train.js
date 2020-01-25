let controller = {


    captureFormFields: () => {
        $('body').on("click", ".button-add", () => {
     
             event.preventDefault();

        
            trainNumber = $('#train-number').val().trim();
            trainLine = $('#train-line').val().trim();
            trainDestination = $('#train-destination').val().trim();
            trainDeparture = $('#train-departure').val().trim();
            trainFrequency = $('#train-frequency').val().trim();
            trainPlatform = $('#train-platform').val().trim();

          
            controller.nextArrival();
            controller.minutesAway();

      
            $('.form-control').val("");

            model.pushNewTrain();
        

        });
    },

  

    nextArrival: () => {
     
       let trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
  
       let currentTime = moment();
   
       let diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
    
       let timeRemainder = diffTime % trainFrequency;
     
       let timeInMinutesTillTrain = trainFrequency - timeRemainder;
     
       nextTrain = moment().add(timeInMinutesTillTrain, 'minutes');
       nextTrain = moment(nextTrain).format('h:mm A');
   },

   minutesAway: () => {
  
        let trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');

        let currentTime = moment();

        let diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");

        let timeRemainder = diffTime % trainFrequency;

       minutesAway = trainFrequency - timeRemainder;
       minutesAway = moment().startOf('day').add(minutesAway, 'minutes').format('HH:mm');
       return moment(minutesAway).format('HH:mm');
   },
   convertFrequency: () => {
       trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
   }

};