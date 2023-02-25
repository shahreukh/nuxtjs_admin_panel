import Vue from 'vue'
import moment from 'moment'


Vue.filter("uppercase", function(value) {
  return value.toUpperCase();

});
Vue.filter("toFixed2", function(value) {
  return parseFloat(value).toFixed(2);

});
Vue.filter("toFixed8", function(value) {

  return parseFloat(value).toFixed(8);

});

Vue.filter("dateFormat", function(value) {

  return moment.utc(value).local().format('DD/MM/YYYY HH:mm');

});
Vue.filter("formatDate", function(value) {
  return moment.utc(value).local().format('DD/MM/YYYY HH:mm');

});
Vue.filter("dateFormatSort", function(value) {
  return moment.utc(value).local().format('DD/MM/YYYY HH:mm');

});
Vue.filter("dateFormatSortMongo", function(value) {
  try {
    var offset = moment().utcOffset();
   
    return moment.utc(value).add(0,'minutes').format('DD/MM/YYYY HH:mm');

    return  moment.utc(value).local().format('DD/MM/YYYY HH:mm');
  }catch (e) {

    return ''
  }



});
Vue.filter('timeDifferenceLastTrade', function (value) {
try {
  var datetime = new Date( moment.utc(value).local().format('YYYY-MM-DD HH:mm') ).getTime();
  var now = new Date(moment.utc(value.created_at).local().format('YYYY-MM-DD HH:mm')).getTime();
}catch (e) {
  return ''
}

  if( isNaN(datetime) )
  {
    return "";
  }


  if (datetime < now) {
    var milisec_diff = now - datetime;
  }else{
    var milisec_diff = datetime - now;
  }

  //var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  var days = Math.floor(milisec_diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((milisec_diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((milisec_diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milisec_diff % (1000 * 60)) / 1000);
  var date_diff = new Date( milisec_diff );
  return days + "/"+ hours + ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() + " ";


  var date_diff = new Date( milisec_diff );
  return days + "/"+ hours+ ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() + " ";

})
Vue.filter('timeDifferenceLastSignal', function (value) {
try {

  var datetime = new Date( moment.utc(parseInt(value.selDate.$date.$numberLong)).local().format('YYYY-MM-DD HH:mm') ).getTime();
  var now = new Date(moment.utc(value.created_at).local().format('YYYY-MM-DD HH:mm')).getTime();

}catch (e) {

  return ''
}

  if( isNaN(datetime) )
  {
    return "";
  }


  if (datetime < now) {
    var milisec_diff = now - datetime;
  }else{
    var milisec_diff = datetime - now;
  }


  //var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  var days = Math.floor(milisec_diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((milisec_diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((milisec_diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milisec_diff % (1000 * 60)) / 1000);
  var date_diff = new Date( milisec_diff );
  return days + "/"+ hours + ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() + " ";


  var date_diff = new Date( milisec_diff );
  return days + "/"+ hours+ ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() + " ";

})
Vue.filter('duration', function (value) {
  console.log('duration',value)


  var datetime = new Date( moment.utc(value.created_at).local().format('YYYY-MM-DD HH:mm') ).getTime();
  var now = new Date().getTime();



  if( isNaN(datetime) )
  {
    return "";
  }


  if (datetime < now) {
    var milisec_diff = now - datetime;
  }else{
    var milisec_diff = datetime - now;
  }

  //var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));
  var days = Math.floor(milisec_diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((milisec_diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((milisec_diff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milisec_diff % (1000 * 60)) / 1000);
  var date_diff = new Date( milisec_diff );
  return days + "/"+ hours + ":" + date_diff.getMinutes() + ":" + date_diff.getSeconds() + " ";

})


