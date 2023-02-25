<template> 
<div id="app">
  <v-app id="inspire">
    <br>
    <v-container>
      <v-row justify="center" align="center">
        <br><br><br><br><br><br><br><br><br><br><br>
        <br><br><br><br><br><br><br><br><br><br><br>
     
        <h1 style="color:teal">HOŞ GELDİNİZ</h1>
    </v-row>
  </v-container>
  </v-app>
 
  </div>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'app',
    name: 'userlist',
    data() {
     return{
      
     }
  },

  props: {
    tabIndex: {
      type: Number,
      default: 0,
    },
  },

 methods:{

 },

}
</script>

<style>
.elevation-2 .v-data-table-header{
  background-color: #e0e0e082;
}
.t-head{
  color:#212529
}
.trr-head{
  font-weight:bold;
  font-size: 16px!important;
  border-bottom:none!important;
  padding-right:60px!important;
  padding-left:30px!important;
  padding-top:10px!important;
  padding-bottom:10px!important;
}
#odemeler{
  margin:20px;
  padding:20px;
  overflow:auto;
  border:1px solid #fff;
  box-shadow:1px 10px 10px 1px #4a657c!important;
}
.details{
  padding:40px!important;
}
.t-row{
  color:#4a657c!important;
}
.t-row2{
  font-size: 16px;
  color:#4a657c!important;
}
.elevation-1 .v-data-table-header{
  background-color:teal;
  text-align: center;
}

.title-packet {
  color:whitesmoke;
  font-size: 2rem;
  padding: 10px;
}

#tb1{
  background-color:#212529;
  overflow:auto;
  border:1px solid #212529;
  border-radius:1%;
  box-shadow:1px 10px 10px 1px #4a657c!important;
}

.btn-primary{
  margin: 10px;
}

</style>