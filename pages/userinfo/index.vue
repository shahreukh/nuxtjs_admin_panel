
<template> 
  <div id="app">
    <v-app id="inspire">
      <br><br><br><br><br>
      <v-container>
        <v-row justify="center" align="center">
          <v-col id="tb1" cols="12" md="6" lg="7" xl="7">
            <v-row justify="center" align="center" >
              <v-col cols="auto" >
                <br>
              </v-col>
            </v-row>   
            <h3 style="color:#00bcd4;text-align: center;">BİLGİLERİM</h3>
            <v-data-table :hide-default-footer="true" :items="items" class="elevation-1" style="color:#00bcd4; background-color: #E7E9EB;padding:20px;margin:30px;text-align: center;">
              <template v-slot:item="{ item }">
                <tr class="t-row"> 
                  <td class="t-head">Ad Soyad :</td> <td class="t-body">{{item.name}}</td>
                </tr> <br>
                <tr class="t-row"> 
                  <td class="t-head">E-posta :</td> <td class="t-body">{{item.email}}</td>
                </tr> <br>
                <tr class="t-row"> 
                  <td class="t-head">Role :</td> <td style="font-weight:500" :style="{ color: getColor(item.role) }">
                   {{ item.role == 1 ? ("Admin") : ("User") }} </td>
                </tr> <br>
              </template>
            </v-data-table>       
        </v-col>
      </v-row>
    </v-container>
    <br><br>
    </v-app>
   
  </div>
</template> 
  
  <script>
  import axios from 'axios';
  import jwtDecode from 'jwt-decode';
  
  export default {
      layout: 'app',
      name: 'userinfo',
      data() {
        return {
          role: null,
          loading: false,
          search: '',
          sortBy: '',
          sortDesc: true,
          page: 1,
          pageCount: 0,
          itemsPerPage: 10,
  
          items: [],
          headers: [
          { text:  "AD SOYAD", value: 'name'},
          { text:  "E-POSTA", value: 'email'},
          { text:  "Role", value: 'role'},
        ],
  
      }
    },
  
    props: {
      tabIndex: {
        type: Number,
        default: 0,
      },
    },
  
    methods: {
 
      async getPanelUsers() {
        try {
          this.loading = true;
          const response = await axios.get('http://localhost:3033/userinfo');
          this.items = response.data;
        } catch (error) {
          console.error(error);
        }
          this.loading = false;
      },
  
      getColor (role) {
        if (role == 0) return 'green'
        else if (role == 1) return 'brown'
      },
  
      formatDate(date) {
          return moment(date).format('dd.mm.YYYY');
      },
        
    },
  
    created() {
      this.getPanelUsers();
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