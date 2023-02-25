<template> 
<div id="app">
  <v-app id="inspire">  <br>
    <v-container>
      <v-row justify="center" align="center">
        <v-col id="tb1" cols="12" md="10" lg="11" xl="11">
          <v-row justify="center" align="center" >
            <v-col cols="auto">  <br>
              <h3 class="title-packet">Kullanıcı Listesi</h3>
              <v-card style="background-color:transparent;box-shadow: none!important;padding:20px;padding-top:0px;">
                <v-spacer></v-spacer>
                <v-text-field v-model="search" dark append-icon="mdi-magnify" label="Ara..." single-line hide-details></v-text-field> 
              </v-card>
            </v-col>
          </v-row>  
          <v-data-table :headers="headers" :items="filteredUsers" class="elevation-1" dark
          :loading="loading"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :search="search"
          item-key="name"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          style="margin:10px"
          :footer-props="{itemsPerPageText: 'Sayfa başına satır'}">
            <template v-slot:item.robots="{ item }">
              <v-chip v-if="item.oldrobot == 1" :color="getColorUser(item.oldrobot)" dark>
                {{ item.oldrobot == 1 ? ("Ücretsiz Robot") : ("Normal") }} 
              </v-chip>
              <v-chip v-if="item.oldrobot != 1" :color="getColorUser(item.robot)" dark>
                {{ item.robot == 1 ? ("Robot") : ("Ücretsiz Robot") }} 
              </v-chip>
            </template>
            <template v-slot:item.detay="{ item }">
              <v-btn class="btn btn-primary" @click="openDetails(item)">Detay</v-btn>
            </template>
            <template v-slot:header.country_name="{ header }" >
              <select v-model="filterCountry" @change="filterTable" style="width:80px;color:white;background-color:teal;padding:10px" class="form-select">
                <option value="all" style="color:white">TÜMÜ</option>
                <option v-for="country in countries" :value="country">{{country}}</option>
              </select>
            </template>
          </v-data-table>
        </v-col>
      </v-row> <br><br>
    </v-container>
  </v-app>
  <!-- Modal -->
  <v-row justify="center" >
    <v-dialog ref="modal" v-model="showModal"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >       
      <v-card style="background-color:#E7E9EB!important">
        <v-toolbar
          dark
          color="secondary"
        >
          <v-toolbar-title>KULLANICI DETAYLERİ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="showModal = false"
            >
             <v-icon>mdi-close</v-icon>
            </v-btn>        
            </v-toolbar-items>
          </v-toolbar>
          <v-row>
            <v-col cols="12" md="4" lg="3" xl="3"> 
              <v-container class="details">
                <modal-component :selected-user="selectedUser">
                  <h3 style="color:#00bcd4;">Kullanıcı Bilgileri</h3>
                      <br><br>                 
                    <v-simple-table style="color:#00bcd4; background-color: #E7E9EB;">
                      <template v-slot:default>
                        <tr class="t-row"> 
                          <td class="t-head">ID :</td> <td>{{selectedUser.id}}</td>
                        </tr> <br>
                        <tr class="t-row"> 
                          <td class="t-head">Ad Soyad :</td> <td class="t-body">{{selectedUser.name}}</td>
                        </tr> <br>
                        <tr class="t-row"> 
                          <td class="t-head">Kullanıcı Adı :</td> <td class="t-body">{{selectedUser.user_name}}</td>
                        </tr> <br>
                        <tr class="t-row"> 
                          <td class="t-head">E-posta :</td> <td class="t-body">{{selectedUser.email}}</td>
                        </tr> <br>
                        <tr class="t-row"> 
                          <td class="t-head">Telefon :</td> <td class="t-body">{{selectedUser.gsm}}</td>
                        </tr> <br>
                        <tr class="t-row"> 
                          <td class="t-head">Server Durumu :</td> <td class="t-body"> 
                            <button v-if="loader == true" id="loader"> </button>
                            <v-chip v-if="loader == false">
                              {{ getServerStatus() }}
                            </v-chip>
                          </td>
                        </tr> <br>
                      </template>
                    </v-simple-table>
                  </modal-component> 
                </v-container>
              </v-col>
              <v-col cols="12" md="8" lg="9" xl="9" style="padding:30px!important">
                <v-sheet elevation="6">
                  <v-tabs v-model="tab" style="border:2px solid #00bcd4;"
                    background-color="cyan"
                    dark
                    next-icon="mdi-arrow-right-bold-box-outline"
                    prev-icon="mdi-arrow-left-bold-box-outline"
                    show-arrows
                  >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab href="#tab-1" >ÖDEMELER</v-tab>
                    <v-tab href="#tab-2">İŞLEMELER</v-tab>
                    <v-tab href="#tab-3">HATA GÜNLÜKLERİ</v-tab>
                    <v-tab href="#tab-4">BALANCE</v-tab>
              <!--  <v-tab href="#tab-5"> Ayarlar </v-tab>  -->
                  </v-tabs>
                </v-sheet>
                <v-tabs-items v-model="tab" style="border:1px solid #00bcd4;">
                  <v-tab-item :value="'tab-1'">
                    <modal-component :selected-user="selectedUser">
                      <h3 class="text-center" style="color:#00bcd4;padding:20px">Ödemeler</h3>
                      <v-data-table :headers="paymentsBotHeaders" :items="userPaymentsBot" class="elevation-2" 
                        :loading="paymentsBotLoader"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="name"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        @page-count="pageCount = $event"
                        :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                        style="margin:10px">
                         <template v-slot:item.type="{ item }">
                            <span style="font-weight:500">
                              {{ item.type  }} 
                            </span>
                          </template>
                          <template v-slot:item.tarih="{ item }">
                            <span > 
                              {{ item.created_at | dateFormat}}
                            </span>
                          </template>
                          <template v-slot:item.paymenttype="{ item }">
                            <span>
                              {{ item.paymenttype  }} 
                            </span>
                          </template>
                       <!--    <template v-slot:item.daysLeft="{ item }">
                            <span>{{ calculateDateDiff(item) }}</span>
                          </template>  -->
                        </v-data-table>
                      <br>
                    </modal-component> 
                  </v-tab-item>
                </v-tabs-items>
                <v-tabs-items v-model="tab" style="border:2px solid #00bcd4;">
                  <v-tab-item :value="'tab-2'">
                  <v-tabs v-model="subTab" centered>
                    <v-tabs-slider color=""></v-tabs-slider>
                      <v-tab href="#subTab-1">Spot</v-tab>
                      <v-tab href="#subTab-2">Futures</v-tab>
                    </v-tabs>
                    <!-- Spot Open Position -->
                   <v-tabs-items v-model="subTab">
                      <v-tab-item :value="'subTab-1'">
                        <modal-component :selected-user="selectedUser">
                          <v-switch
                            v-model="singleSelect"
                            label="Açık/Kapalı İşlemler"
                            class="pa-4" style="padding-bottom:0px!important;padding-top:0px!important"
                          ></v-switch>
                          <div v-if="this.singleSelect">
                          <v-data-table :headers="spotOpenHeaders" :items="filteredSpot" class="elevation-2" 
                          :loading="userSpotLoader"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :single-select="singleSelect"
                          item-key="name"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          @page-count="pageCount = $event"
                          :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                          style="margin:10px">
                            <template v-slot:item.market="{ item }">
                              <span style="font-weight:500">
                                {{ item.market  }} 
                              </span>
                            </template>
                            <template v-slot:item.price="{ item }">
                              <span>
                                {{ item.price | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.ask="{ item }">
                              <span>
                                {{ item.ask | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                              <span> 
                                {{ item.created_at | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.nowPrice="{ item }">
                              <span v-bind:class="priceClass(item)" :key="item.nowProfit" style="text-align:left">
                                {{ nowPrice(item) | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.duration="{ item }">
                              <span>
                                {{ item | duration}}
                              </span>
                            </template>
                            <template v-slot:item.nowProfit="{ item }">
                              <span v-bind:class="profitClass(item)">
                                {{ item.nowProfit | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.updated_at="{ item }">
                              <span> 
                                {{ item.updated_at | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.isOpen="{ item }">
                              <v-span :style=" item.isOpen === true ? { color: 'green' } : { color: 'red' } ">
                                {{ item.isOpen === true ?" Açık" : "Kapalı" }} 
                              </v-span>
                            </template>
                            <template v-if="admin == true" v-slot:item.sat="{ item }">
                              <v-btn class="btn btn-success" @click="sellSpot(item)" style="background-color:green;color:white">Sat</v-btn>
                            </template>
                          </v-data-table>     
                          </div>
                          <!-- Spot Last Trade -->
                          <div v-if="!this.singleSelect">
                          <v-data-table :headers="spotCloseHeaders" :items="filteredSpot" class="elevation-2" 
                          :loading="userSpotLoader"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :single-select="singleSelect"
                          item-key="name"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          @page-count="pageCount = $event"
                          :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                          style="margin:10px">      
                            <template v-slot:item.market="{ item }">
                              <span style="font-weight:500">
                                {{ item.market  }} 
                              </span>
                            </template>
                            <template v-slot:item.bid="{ item }">
                              <span v-bind:class="priceClass(item)">
                                {{ item.bid | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.buyDate="{ item }">
                              <span> 
                                {{ item.buyDate | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                              <span> 
                                {{ item.created_at | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.duration="{ item }">
                              <span>
                                {{ item | timeDifferenceLastTrade}}
                              </span>
                            </template>
                            <template v-slot:item.sellProfit="{ item }">
                              <span v-bind:class="priceClass(item)">
                                {{ item.sellProfit | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.isOpen="{ item }">
                              <v-span  :style=" item.isOpen === true ? { color: 'green' } : { color: 'red' } ">
                                {{ item.isOpen === true ?" Açık" : "Kapalı" }} 
                              </v-span>
                            </template>
                          </v-data-table>  
                          </div>                     
                          <br>
                        </modal-component> 
                      </v-tab-item>
                      <!-- Futures Open Position -->
                      <v-tab-item :value="'subTab-2'" >
                        <modal-component :selected-user="selectedUser">
                          <v-switch
                            v-model="singleSelect"
                            label="Açık/Kapalı İşlemler"
                            class="pa-4" style="padding-bottom:0px!important;padding-top:0px!important"
                          ></v-switch>
                          <div v-if="this.singleSelect">
                          <v-data-table :headers="futuresOpenHeaders" :items="filteredFutures" class="elevation-2" 
                          :loading="userFuturesLoader"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :single-select="singleSelect"
                          item-key="name"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          @page-count="pageCount = $event"
                          :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                          style="margin:10px"> 
                            <template v-slot:item.market="{ item }">
                              <span style="font-weight:500">
                                {{ item.market  }} 
                              </span>
                            </template>
                            <template v-slot:item.unrealizedProfit="{ item }">
                              <span v-bind:class="unrealizedProfitClass(item)">
                                {{ item.unrealizedProfit | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.marginusdt="{ item }">
                              <span>
                                {{ marginUSDT(item) | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.liquidationPrice="{ item }">
                              <span>
                                {{ item.liquidationPrice | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.ask="{ item }">
                              <span>
                                {{ item.ask | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.markPrice="{ item }">
                              <span style="color:orange">
                                {{ item.markPrice | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                              <span> 
                                {{ item.created_at | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.duration="{ item }">
                              <span>
                                {{ item | duration}}
                              </span>
                            </template>
                            <template v-slot:item.nowProfit="{ item }">
                              <span v-bind:class="profitClass(item)">
                                {{ item.nowProfit | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.laverege="{ item }">
                              <span style="color:brown;text-align:center!important;margin-right: 15px;">
                                {{ item.laverege }}
                              </span>
                            </template>
                            <template v-slot:item.updated_at="{ item }">
                              <span> 
                                {{ item.updated_at | dateFormat}}
                              </span>
                            </template>
                            
                            <template v-slot:item.type="{ item }">
                              <span 
                                :style=" item.type === 'Buy' ? { color: 'green' } : { color: 'red' } " >
                                {{ item.type  }} 
                              </span>
                            </template>
                            <template v-slot:item.isOpen="{ item }">
                              <v-span :style=" item.isOpen === true ? { color: 'green' } : { color: 'red' } ">
                                {{ item.isOpen === true ?" Açık" : "Kapalı" }} 
                              </v-span>
                            </template>
                            <template v-if="admin == true" v-slot:item.sat="{ item }">
                              <v-btn class="btn btn-success" @click="sellFutures(item)" style="background-color:green;color:white">Sat</v-btn>
                            </template>
                          </v-data-table>   
                          </div>    
                          <!-- Futures Last Trade -->
                          <div v-if="!this.singleSelect">
                          <v-data-table :headers="futuresCloseHeaders" :items="filteredFutures" class="elevation-2" 
                          :loading="userFuturesLoader"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          :single-select="singleSelect"
                          item-key="name"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          @page-count="pageCount = $event"
                          :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                          style="margin:10px"> 
                          <template v-if="!this.singleSelect" v-slot:item.market="{ item }">
                              <span style="font-weight:500">
                                {{ item.market  }} 
                              </span>
                            </template>
                            <template v-slot:item.ask="{ item }">
                              <span>
                                {{ item.ask | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.unrealizedProfit="{ item }">
                              <span v-bind:class="unrealizedProfitClass(item)">
                                {{ item.unrealizedProfit | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.markPrice="{ item }">
                              <span style="color:orange">
                                {{ item.markPrice | toFixed2 }}
                              </span>
                            </template>
                            <template v-slot:item.created_at="{ item }">
                              <span> 
                                {{ item.created_at | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.sellDate="{ item }">
                              <span> 
                                {{ item.sellDate | dateFormat}}
                              </span>
                            </template>
                            <template v-slot:item.duration="{ item }">
                              <span>
                                {{ item | timeDifferenceLastTrade}}
                              </span>
                            </template>
                            <template v-slot:item.nowProfit="{ item }">
                              <span v-bind:class="profitClass(item)">
                                {{ item.nowProfit | toFixed8 }}
                              </span>
                            </template>
                            <template v-slot:item.laverege="{ item }">
                              <span style="color:brown;text-align:center!important;margin-right: 15px;">
                                {{ item.laverege }}
                              </span>
                            </template>
                            <template v-slot:item.type="{ item }">
                              <span 
                                :style=" item.type === 'Buy' ? { color: 'green' } : { color: 'red' } " >
                                {{ item.type  }} 
                              </span>
                            </template>
                            <template v-slot:item.isOpen="{ item }">
                              <v-span :style=" item.isOpen === true ? { color: 'green' } : { color: 'red' } ">
                                {{ item.isOpen === true ?" Açık" : "Kapalı" }} 
                              </v-span>
                            </template>
                          </v-data-table>                       
                          </div>  <br>
                        </modal-component> 
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tab-item>
                </v-tabs-items>
                <!-- ErrorLogs -->
                <v-tabs-items v-model="tab" style="border:2px solid #00bcd4;">
                  <v-tab-item :value="'tab-3'">
                    <modal-component :selected-user="selectedUser">
                      <h3 class="text-center" style="color:#00bcd4;padding:20px">Hata Günlükleri</h3>
                      <v-data-table  :headers="errorLogsHeaders" :items="userErrorCheck" class="elevation-2" 
                        :loading="userErrorLoader"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        item-key="name"
                        :page.sync="page"
                        :items-per-page="itemsPerPage"
                        @page-count="pageCount = $event"
                        :footer-props="{itemsPerPageText: 'Sayfa başına satır'}"
                        style="margin:10px">
                        <template v-slot:item.tarih="{ item }">
                            <span> {{ item.created_at | dateFormat}}</span>
                          </template>
                        </v-data-table> <br>
                    </modal-component> 
                  </v-tab-item>
                </v-tabs-items>
                <!-- BALANCE -->
                  <v-tabs-items v-model="tab" style="border:2px solid #00bcd4;">
                  <v-tab-item :value="'tab-4'">
                    <modal-component :selected-user="selectedUser">
                      <h3 class="text-center" style="color:#00bcd4;padding:20px">Balance</h3>
                      <v-container>
                        <v-simple-table style="color:#00bcd4; background-color: #E7E9EB; padding:20px">
                          <template >
                            <tr class="t-row"> 
                              <td class="t-head">Spot Balance USDT:</td> <td class="t-body">
                                <input v-if="spotUSDTLoader == true" id="loader">
                                <input v-if="spotUSDTLoader == false" style="width:80%;" class="form-control" v-model="userSpotUSDT" disabled>
                              </td>
                            </tr> <br>
                            <tr class="t-row"> 
                              <td class="t-head">Futures Balance USDT:</td> <td class="t-body">
                                <input v-if="futuresUSDTLoader == true" id="loader">
                                <input v-if="futuresUSDTLoader == false" style="width:80%;" class="form-control" v-model="userFuturesUSDT" disabled>
                              </td>
                            </tr> <br>
                            <tr class="t-row"> 
                              <td class="t-head">Spot Balance BNB:</td> <td class="t-body">
                                <input v-if="spotBNBLoader == true" id="loader">
                                <input v-if="spotBNBLoader == false" style="width:80%;" class="form-control" v-model="userSpotBNB" disabled>
                              </td>
                            </tr> <br>
                            <tr class="t-row"> 
                              <td class="t-head">Futures Balance BNB:</td> <td class="t-body">
                                <input v-if="futuresBNBLoader == true" id="loader">
                                <input v-if="futuresBNBLoader == false" style="width:80%;" class="form-control" v-model="userFuturesBNB" disabled>
                              </td>
                            </tr> <br>
                          </template>
                        </v-simple-table>
                      </v-container>
                      <br>
                    </modal-component> 
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

export default {
  layout: 'app',
  name: 'userlist',
  components: { 
    },

  data() {
    return {
      // Loaders
      loader:true,
      paymentsBotLoader:true,
      userSpotLoader:true,
      userFuturesLoader:true,
      userErrorLoader:true,
      spotUSDTLoader:true,
      spotBNBLoader:true,
      futuresUSDTLoader:true,
      futuresBNBLoader:true,
      serverCheckLoader:true,

      filterCountry: 'all',
      selectedCountries: [],
      selectedUser: {},
      singleSelect: false,
      userServerCheck:  undefined,
      decoded: null,
      role: null,
      admin: false,
      serverIp: '',
     
      showModal: false,
      tab: null,
      subTab: null,
 
      search: '',
      sortBy: '',
      sortDesc: true,
      loading: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      userSpotUSDT: 0,
      userSpotBNB: 0,
      userFuturesUSDT: 0,
      userFuturesBNB: 0,

      userErrorCheck: [],
        errorLogsHeaders: [
          { text:  "Market", value: 'market'},
          { text:  "Sinyal Tipi", value: 'signalType'},
          { text:  "Hata kodu", value: 'errorCode'},
          { text:  "İşlem", value: 'islem'},
          { text:  "Tarih", value: 'tarih'},
        ],

      users: [],
        headers: [
        { text:  "ID", value: 'id'},
        { text:  "AD SOYAD", value: 'name'},
        { text:  "KULLANICI ADI", value: 'user_name'},
        { text:  "E-POSTA", value: 'email'},
        { text:  "ÜLKELER", value: 'country_name',sortable: false},
        { text:  "KULLANICI TİPİ ", value: 'robots'},
        { text: "DETAYLER", value: 'detay', type: 'button'},
        ],
      
      userPaymentsBot: [],
        paymentsBotHeaders: [
        { text:  "Paket", value: 'type'},
        { text:  "WCS Miktari", value: 'wcs_amount'},
        { text:  "USD Miktari", value: 'usd_amount'},
    /*  { text:  "Kalan Süre", value: 'daysLeft'}, */
        { text:  "Alım Tarih", value: 'tarih'},
        { text:  "Ödeme Tipi", value: 'paymenttype'},
        ],

      userSpot: [],
        spotOpenHeaders: [
          { text:  "Birim", value: 'market'},
          { text:  "Miktar", value: 'quantity'},
          { text:  "Alış Tutarı", value: 'price'},
          { text:  "Alış Fiyatı", value: 'ask'},
          { text:  "Alış Tarihi", value: 'created_at'},
          { text:  "Anlık Tutar", value: 'nowPrice'},
          { text:  "Süre", value: 'duration'},
          { text:  "Kâr", value: 'nowProfit'},
          { text:  "Son Güncellenme Tarihi", value: 'updated_at'},
          { text:  "Durum", value: 'isOpen'},
          { text: "", value: 'sat', type: 'button'},
        ],
        spotCloseHeaders: [
          { text:  "Birim", value: 'market'},
          { text:  "Miktar", value: 'quantity'},
          { text:  "Alış Fiyatı", value: 'ask'},
          { text:  "Satış Fiyatı", value: 'bid'},
          { text:  "Alış Tarihi", value: 'buyDate'},
          { text:  "Satış Tarihi", value: 'created_at'},
          { text:  "Süre", value: 'duration'},
          { text:  "Kâr", value: 'sellProfit'},
          { text:  "Durum", value: 'isOpen'},
        ],

      userFutures: [],
        futuresOpenHeaders: [
          { text:  "Birim", value: 'market'},
          { text:  "Miktar", value: 'quantity'},
          { text:  "Anlık Kazanç($)", value: 'unrealizedProfit'},
          { text:  "Margin USDT", value: 'marginusdt'},
          { text:  "Likit", value: 'liquidationPrice'},
          { text:  "Alış Fiyatı", value: 'ask'},
      /* { text:  "Ekleyen Kullanıcı", value: 'createdUser'}, */ 
          { text:  "İşlem", value: 'type'},
          { text:  "Alış Tarihi", value: 'created_at'},
          { text:  "Anlık Fiyat", value: 'markPrice'},
          { text:  "Kaldıraç", value: 'laverege'},
          { text:  "Süre", value: 'duration'},
          { text:  "Kâr", value: 'nowProfit'},
          { text:  "Son Güncellenme Tarihi", value: 'updated_at'},
          { text:  "Durum", value: 'isOpen'},
          { text: "", value: 'sat', type: 'button'},
        ],
        futuresCloseHeaders: [
          { text:  "Birim", value: 'market'},
          { text:  "Miktar", value: 'quantity'},
          { text:  "Alış Fiyatı", value: 'ask'},
          { text:  "Kazanç($)", value: 'unrealizedProfit'},
          { text:  "Satış Fiyatı", value: 'markPrice'},
          { text:  "Alış Tarihi", value: 'created_at'},
          { text:  "İşlem", value: 'type'},
          { text:  "Satış Tarihi", value: 'sellDate'},
          { text:  "Kaldıraç", value: 'laverege'},
          { text:  "Süre", value: 'duration'},
          { text:  "Kâr", value: 'nowProfit'},
          { text:  "Durum", value: 'isOpen'},
        ],

      countries: [
        'Türkiye',
        'Azerbaijan',
        'Ukraine',
        'Russia',
        'Afghanistan',
        'Albania',
        'Algeria',
        'American Samoa',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antarctica',
        'Antigua And Barbuda',
        'Argentina',
        'Armenia',
        'Aruba',
        'Australia',
        'Austria',
        'Bahamas The',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bermuda',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Bouvet Island',
        'Brazil',
        'British Indian Ocean Territory',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Cape Verde',
        'Cayman Islands',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Christmas Island',
        'Cocos (Keeling) Islands',
        'Colombia',
        'Comoros',
        'Republic Of The Congo',
        'Democratic Republic Of The Congo',
        'Cook Islands',
        'Costa Rica',
        'Ivory Coast',
        'Croatia (Hrvatska)',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'East Timor',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Ethiopia',
        'External Territories of Australia',
        'Falkland Islands',
        'Faroe Islands',
        'Fiji Islands',
        'Finland',
        'France',
        'French Guiana',
        'French Polynesia',
        'French Southern Territories',
        'Gabon',
        'Gambia The',
        'Georgia',
        'Germany',
        'Ghana',
        'Gibraltar',
        'Greece',
        'Greenland',
        'Grenada',
        'Guadeloupe',
        'Guam',
        'Guatemala',
        'Guernsey and Alderney',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Heard and McDonald Islands',
        'Honduras',
        'Hong Kong S.A.R.',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jersey',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Korea North',
        'Korea South',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macau S.A.R.',
        'Macedonia',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Man (Isle of)',
        'Marshall Islands',
        'Martinique',
        'Mauritania',
        'Mauritius',
        'Mayotte',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montserrat',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands Antilles',
        'Netherlands The',
        'New Caledonia',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'Niue',
        'Norfolk Island',
        'Northern Mariana Islands',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestinian Territory Occupied',
        'Panama',
        'Papua new Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Pitcairn Island',
        'Poland',
        'Portugal',
        'Puerto Rico',
        'Qatar',
        'Reunion',
        'Romania',
        'Rwanda',
        'Saint Helena',
        'Saint Kitts And Nevis',
        'Saint Lucia',
        'Saint Pierre and Miquelon',
        'Saint Vincent And The Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Smaller Territories of the UK',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Georgia',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Svalbard And Jan Mayen Islands',
        'Swaziland',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Togo',
        'Tokelau',
        'Tonga',
        'Trinidad And Tobago',
        'Tunisia',
        'Turkmenistan',
        'Turks And Caicos Islands',
        'Tuvalu',
        'Uganda',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'United States Minor Outlying Islands',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City State (Holy See)',
        'Venezuela',
        'Vietnam',
        'Virgin Islands (British)',
        'Virgin Islands (US)',
        'Wallis And Futuna Islands',
        'Western Sahara',
        'Yemen',
        'Yugoslavia',
        'Zambia',
        'Zimbabwe',
        'Kuzey Kıbrıs Türk Cumhuriyeti'
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
    async getUsers() {
      try {
        this.loading = true;
        const response = await axios.get('http://localhost:7016/users');
        this.users = response.data;
      } catch (error) {
        console.error(error);
      } this.loading = false;
    },
    
    async openDetails(item) {
      this.showModal = true;
      this.userServerCheck =  undefined;
      this.selectedUser = item;
      const userid = this.selectedUser.id;

      // Retrieve servercheck data
      this.loader = true;
      const response = await axios.post('http://localhost:7016/servercheck', { 'userid': userid });
      const serverCheck = response.data['message'];
      this.userServerCheck = serverCheck;
      this.loader = false;
      
      // Retrieve paymentsbot data
      this.paymentsBotLoader = true;
      const paymentsBotResult = await axios.post('http://localhost:7016/paymentsbot', { userid });
      const paymentsBot = paymentsBotResult.data;
      this.userPaymentsBot = paymentsBot;
      this.paymentsBotLoader = false;
      
      // Retrieve spot data
      this.userSpotLoader = true;
      const spotResult = await axios.post('http://localhost:7016/spot', { userid });
      const tradelogs = spotResult.data;
      this.userSpot = tradelogs;
      this.userSpotLoader = false;

      // Retrieve futures data
      this.userFuturesLoader = true;
      const futuresResult = await axios.post('http://localhost:7016/futures', { userid });
      const futurelogs = futuresResult.data;
      this.userFutures = futurelogs;
      this.userFuturesLoader = false;

      // Retrieve errorLogs data
      this.userErrorLoader = true;
      const logResult = await axios.post('http://localhost:7016/errorlogs', { 'userid': userid });
      const errorLogs = logResult.data;
      this.userErrorCheck = errorLogs;
      this.userErrorLoader = false;

      // Retrieve Spot BNB Balance data 
      this.spotBNBLoader = true;
      const spotBNBResult = await axios.post('http://localhost:7016/spotbnb', { 'userid': userid });
      const spotBNB = spotBNBResult.data.free;
      this.userSpotBNB = spotBNB;
      this.spotBNBLoader = false;

      // Retrieve Futures BNB Balance data 
      this.futuresBNBLoader = true;
      const futuresBNBResult = await axios.post('http://localhost:7016/futuresbnb', { 'userid': userid });
      const futuresBNB = futuresBNBResult.data.free;
      this.userFuturesBNB = futuresBNB;
      this.futuresBNBLoader = false;

      // Retrieve Futures BNB Balance data 
      this.futuresUSDTLoader = true;
      const futuresUSDTResult = await axios.post('http://localhost:7016/futuresusdt', { 'userid': userid });
      const futuresUSDT = futuresUSDTResult.data.free;
      this.userFuturesUSDT = futuresUSDT;
      this.futuresUSDTLoader = false;

      // Retrieve Spot USDT Balance data 
      this.spotUSDTLoader = true;
      const spotUSDTResult = await axios.post('http://localhost:7016/spotusdt', { 'userid': userid });
      const spotUSDT = spotUSDTResult.data.free;
      this.userSpotUSDT = spotUSDT;
      this.spotUSDTLoader = false;

    },
    
    nowPrice: function (item) {
      var nowPrice = (item.ask * item.nowProfit) / 100;
      var rtn = (item.ask + nowPrice) * item.quantity;
      return rtn;
    },
    marginUSDT(item) {
      if(isNaN(item.usdtAmount) || isNaN(item.laverege)) {
        return 0;
      }
      var marginUSDT = (item.usdtAmount / item.laverege);
      return marginUSDT;
    },
    unrealizedProfitClass(item) {
      var cls = {
          textgreen: item.unrealizedProfit > 0,
          textred: item.unrealizedProfit < 0,
          textnormal: item.unrealizedProfit == 0,
      };
      return cls;
    },
    buyClass(item) {
      return {
          textgreen: item.type == "Buy",
          textred: item.type == "Sell",
      };
    },
    profitClass(item) {
      return {
        textgreen: item.nowProfit > 0,
        textred: item.nowProfit < 0,
        textnormal: item.nowProfit == 0
      }
    },
    priceClass(item) {
      return {
        textgreen: item.sellProfit > 0,
        textred: item.sellProfit < 0,
        textnormall: item.sellProfit == 0
      }
    },
    priceClass2(item) {
      return {
        textgreen: item.price > 0,
        textred: item.price < 0,
        textnormall: item.price == 0
      }
    },
    getColor (active) {
      if (active == 0) return 'red'
      else if (active == 1) return 'green'
      else return 'brown'
    },
    getColorUser (oldrobot) {
      if (oldrobot == 0) return 'green'
      else if (oldrobot == 1) return 'brown'
      else return 'brown'
    },

    formatDate(date) {
        return moment(date).format('dd.mm.YYYY');
    },

    getServerStatus(){
      if(!this.userServerCheck){
        return "---";
      }
        return  (this.userServerCheck === 'OK') ? 'Aktif' : 'Kapalı'
    },

    filterTable() {
      if (this.filterCountry === 'all') {
          this.filteredUsers =  this.users;
      } else {
          this.mappedUsers = this.users.filter(user => {
              return user.country_name.toLowerCase().includes(this.filterCountry.toLowerCase());
          });
      }
    },
    getCountryName(id) {
        if (id === 1) return 'Afghanistan'
        if (id === 2) return 'Albania'
        if (id === 3) return 'Algeria'
        if (id === 4) return 'American Samoa'
        if (id === 5) return 'Andorra'
        if (id === 6) return 'Angola'
        if (id === 7) return 'Anguilla'
        if (id === 8) return 'Antarctica'
        if (id === 9) return 'Antigua And Barbuda'
        if (id === 10) return 'Argentina'
        if (id === 11) return 'Armenia'
        if (id === 12) return 'Aruba'
        if (id === 13) return 'Australia'
        if (id === 14) return 'Austria'
        if (id === 15) return 'Azerbaijan'
        if (id === 16) return 'Bahamas'
        if (id === 17) return 'Bahrain'
        if (id === 18) return 'Bangladesh'
        if (id === 19) return 'Barbados'
        if (id === 20) return 'Belarus'
        if (id === 21) return 'Belgium'
        if (id === 22) return 'Belize'
        if (id === 23) return 'Benin'
        if (id === 24) return 'Bermuda'
        if (id === 25) return 'Bhutan'
        if (id === 26) return 'Bolivia'
        if (id === 27) return 'Bosnia and Herzegovina'
        if (id === 28) return 'Botswana'
        if (id === 29) return 'Bouvet Island'
        if (id === 30) return 'Brazil'
        if (id === 31) return 'British Indian Ocean Territory'
        if (id === 32) return 'Brunei'
        if (id === 33) return 'Bulgaria'
        if (id === 34) return 'Burkina Faso'
        if (id === 35) return 'Burundi'
        if (id === 36) return 'Cambodia'
        if (id === 37) return 'ameroon'
        if (id === 38) return 'Canada'
        if (id === 39) return 'Cape Verde'
        if (id === 40) return 'Cayman Islands'
        if (id === 41) return 'Central African Republic'
        if (id === 42) return 'had'
        if (id === 43) return 'Chile'
        if (id === 44) return 'China'
        if (id === 45) return 'Christmas Island'
        if (id === 46) return 'Cocos (Keeling) Islands'
        if (id === 47) return 'Colombia'
        if (id === 48) return 'Comoros'
        if (id === 49) return 'Republic Of The Congo'
        if (id === 50) return 'Democratic Republic Of The Congo'
        if (id === 51) return 'Cook Islands'
        if (id === 52) return 'Costa Rica'
        if (id === 53) return 'Ivory Coast'
        if (id === 54) return 'Croatia (Hrvatska)'
        if (id === 55) return 'Cuba'
        if (id === 56) return 'Cyprus'
        if (id === 57) return 'Czech Republic'
        if (id === 58) return 'Denmark'
        if (id === 59) return 'Djibouti'
        if (id === 60) return 'Dominica'
        if (id === 61) return 'Dominican Republic'
        if (id === 62) return 'East Timor'
        if (id === 63) return 'Ecuador'
        if (id === 64) return 'Egypt'
        if (id === 65) return ' El Salvador'
        if (id === 66) return ' Equatorial Guinea'
        if (id === 67) return ' Eritrea'
        if (id === 68) return ' Estonia'
        if (id === 69) return '   Ethiopia'
        if (id === 70) return '  External Territories of Australia'
        if (id === 71) return '   Falkland Islands'
        if (id === 72) return '   Faroe Islands'
        if (id === 73) return '  Fiji Islands'
        if (id === 74) return ' Finland'
        if (id === 75) return '  France'
        if (id === 76) return '   French Guiana'
        if (id === 77) return '    French Polynesia'
        if (id === 78) return '    French Southern Territories'
        if (id === 79) return '    Gabon'
        if (id === 80) return '   Gambia The'
        if (id === 81) return '  Georgia'
        if (id === 82) return '  Germany'
        if (id === 83) return '   Ghana'
        if (id === 84) return '   Gibraltar'
        if (id === 85) return '   Greece'
        if (id === 86) return '  Greenland'
        if (id === 87) return '  Grenada'
        if (id === 88) return '   Guadeloupe'
        if (id === 89) return '    Guam'
        if (id === 90) return '    Guatemala'
        if (id === 91) return '    Guernsey and Alderney'
        if (id === 92) return '     Guinea'
        if (id === 93) return '    Guinea-Bissau'
        if (id === 94) return ' Guyana'
        if (id === 95) return '  Haiti'
        if (id === 96) return '  Heard and McDonald Islands'
        if (id === 97) return '   Honduras'
        if (id === 98) return '   Hong Kong S.A.R.'
        if (id === 99) return '   Hungary'
        if (id === 100) return '  Iceland'
        if (id === 101) return '   India'
        if (id === 102) return '  Indonesia'
        if (id === 103) return '   Iran'
        if (id === 104) return '   Iraq'
        if (id === 105) return '  Ireland'
        if (id === 106) return '   Israel'
        if (id === 107) return '  Italy'
        if (id === 108) return '    Jamaica'
        if (id === 109) return '   Japan'
        if (id === 110) return '  Jersey'
        if (id === 111) return '  Jordan'
        if (id === 112) return '  Kazakhstan'
        if (id === 113) return '  Kenya'
        if (id === 114) return '  Kiribati'
        if (id === 115) return '   Korea North'
        if (id === 116) return '   Korea South'
        if (id === 117) return '   Kuwait'
        if (id === 118) return '   Kyrgyzstan'
        if (id === 119) return '    Laos'
        if (id === 120) return '    Latvia'
        if (id === 121) return '   Lebanon'
        if (id === 122) return '    Lesotho'
        if (id === 123) return '   Liberia'
        if (id === 124) return '  Libya'
        if (id === 125) return '  Liechtenstein'
        if (id === 126) return '   Lithuania'
        if (id === 127) return '  Luxembourg'
        if (id === 128) return '  Macau S.A.R.'
        if (id === 129) return '   Macedonia'
        if (id === 130) return '   Madagascar'
        if (id === 131) return '    Malawi'
        if (id === 132) return '   Malaysia'
        if (id === 133) return '  Maldives'
        if (id === 134) return '   Mali'
        if (id === 135) return '    Malta'
        if (id === 136) return '  Man (Isle of)'
        if (id === 137) return '   Marshall Islands'
        if (id === 138) return '   Martinique'
        if (id === 139) return '   Mauritania'
        if (id === 140) return '   Mauritius'
        if (id === 141) return '    Mayotte'
        if (id === 142) return '    Mexico'
        if (id === 143) return '    Micronesia'
        if (id === 144) return '   Moldova'
        if (id === 145) return '    Monaco'
        if (id === 146) return '    Mongolia'
        if (id === 147) return '   Montserrat'
        if (id === 148) return '   Morocco'
        if (id === 149) return '    Mozambique'
        if (id === 150) return '  Myanmar'
        if (id === 151) return '   Namibia'
        if (id === 152) return '  Nauru'
        if (id === 153) return '  Nepal'
        if (id === 154) return '  Netherlands Antilles'
        if (id === 155) return '   Netherlands The'
        if (id === 156) return '     New Caledonia'
        if (id === 157) return '   New Zealand'
        if (id === 158) return '  Nicaragua'
        if (id === 159) return ' Niger'
        if (id === 160) return '  Nigeria'
        if (id === 161) return '  Niue'
        if (id === 162) return '  Norfolk Island'
        if (id === 163) return '  Northern Mariana Islands'
        if (id === 164) return '  Norway'
        if (id === 165) return '  Oman'
        if (id === 166) return '  Pakistan'
        if (id === 167) return '   Palau'
        if (id === 168) return '   Palestinian Territory Occupied'
        if (id === 169) return '   Panama'
        if (id === 170) return '   Papua new Guinea'
        if (id === 171) return '  Paraguay'
        if (id === 172) return '   Peru'
        if (id === 173) return '   Philippines'
        if (id === 174) return '  Pitcairn Island'
        if (id === 175) return '   Poland'
        if (id === 176) return '    Portugal'
        if (id === 177) return '  Puerto Rico'
        if (id === 178) return '  Qatar'
        if (id === 179) return '  Reunion'
        if (id === 180) return '  Romania'
        if (id === 181) return '  Russia'
        if (id === 182) return '  Rwanda'
        if (id === 183) return '  Saint Helena'
        if (id === 184) return '   Saint Kitts And Nevis'
        if (id === 185) return '  Saint Lucia'
        if (id === 186) return '  Saint Pierre and Miquelon'
        if (id === 187) return '  Saint Vincent And The Grenadines'
        if (id === 188) return '   Samoa'
        if (id === 189) return '  San Marino'
        if (id === 190) return '   Sao Tome and Principe'
        if (id === 191) return '  Saudi Arabia'
        if (id === 192) return '  Senegal'
        if (id === 193) return '  Serbia'
        if (id === 194) return '  Seychelles'
        if (id === 195) return ' Sierra Leone'
        if (id === 196) return '  Singapore'
        if (id === 197) return '  Slovakia'
        if (id === 198) return '   Slovenia'
        if (id === 199) return '  Smaller Territories of the UK'
        if (id === 200) return '   Solomon Islands'
        if (id === 201) return '  Somalia'
        if (id === 202) return '   South Africa'
        if (id === 203) return '   South Georgia'
        if (id === 204) return '  South Sudan'
        if (id === 205) return '   Spain'
        if (id === 206) return '  Sri Lanka'
        if (id === 207) return '    Sudan'
        if (id === 208) return '  Suriname'
        if (id === 209) return '  Svalbard And Jan Mayen Islands'
        if (id === 210) return '  Swaziland'
        if (id === 211) return ' Sweden'
        if (id === 212) return ' Switzerland'
        if (id === 213) return ' Syria'
        if (id === 214) return '  Taiwan'
        if (id === 215) return ' Tajikistan'
        if (id === 216) return ' Tanzania'
        if (id === 217) return '  Thailand'
        if (id === 218) return '  Togo'
        if (id === 219) return '  Tokelau'
        if (id === 220) return '  Tonga'
        if (id === 221) return '  Trinidad And Tobago'
        if (id === 222) return '  Tunisia'
        if (id === 223) return '  Türkiye'
        if (id === 224) return '  Turkmenistan'
        if (id === 225) return '  Turks And Caicos Islands'
        if (id === 226) return '  Tuvalu'
        if (id === 227) return '  Uganda'
        if (id === 228) return '  Ukraine'
        if (id === 229) return '  United Arab Emirates'
        if (id === 230) return ' United Kingdom'
        if (id === 231) return '  United States'
        if (id === 232) return '  United States Minor Outlying Islands'
        if (id === 233) return '  Uruguay'
        if (id === 234) return ' Uzbekistan'
        if (id === 235) return ' Vanuatu'
        if (id === 236) return ' Vatican City State (Holy See)'
        if (id === 237) return '   Venezuela'
        if (id === 238) return '    Vietnam'
        if (id === 239) return '   Virgin Islands (British)'
        if (id === 240) return ' Virgin Islands (US)'
        if (id === 241) return ' Wallis And Futuna Islands'
        if (id === 242) return '  Western Sahara'
        if (id === 243) return ' Yemen'
        if (id === 244) return '  Yugoslavia'
        if (id === 245) return '  Zambia'
        if (id === 246) return '   Zimbabwe'
        if (id === 247) return '   Kuzey Kıbrıs Türk Cumhuriyeti'
    },
    
    sellSpot(value) {
      let message = "Are you sure?";
      this.$swal(
        {
          title: "Emin misiniz?",
          text: "Satmak ister misiniz?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Evet eminim",
          cancelButtonText: "Hayır",
        },
        message,
        "warning"
      ).then((result) => {
        if (result.value) {
          this.showLoader(true);
          axios
            .get("localhost:7016/sellspot", {
              params: {
                tradeId: value.tradeId,
              },
            })
            .then((res) => {
              this.$swal(
                {
                  title: "Başarı",
                  text: "İşlem başarıyla tamamlandı",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                },
                "Success",
                "success"
              );
            })
            .catch((err) => {
              alert("Error\n" + err);
            })
            .finally(() => {
              this.showLoader(false);
            });
        }
      });
    },

    sellFutures(value) {
      let message = "Are you sure?";
      this.$swal(
        {
          title: "Emin misiniz?",
          text: "Satmak ister misiniz?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Evet eminim",
          cancelButtonText: "Hayır",
        },
        message,
        "warning"
      ).then((result) => {
        if (result.value) {
          this.showLoader(true);
          axios
            .get("localhost:7016/sellfutures", {
              params: {
                tradeId: value.tradeId,
              },
            })
            .then((res) => {
              this.$swal(
                {
                  title: "Başarı",
                  text: "İşlem başarıyla tamamlandı",
                  type: "success",
                  showCancelButton: false,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ok",
                },
                "Success",
                "success"
              );
            })
            .catch((err) => {
              alert("Error\n" + err);
            })
            .finally(() => {
              this.showLoader(false);
            });
        }
      });
    },

  },

  computed: {
    filteredUsers() {
    if (this.filterCountry === 'all') {
      return this.mappedUsers;
    } else {
      return this.mappedUsers.filter(user => user.country_name.toLowerCase().includes(this.filterCountry.toLowerCase()))
    }
  },

    mappedUsers() {
      return this.users.map(user => {
          user.country_name = this.getCountryName(user.country_id)
          return user
      })
    },

    filteredFutures() {
      if (this.singleSelect) {
        return this.userFutures.filter(item => item.isOpen === true);
      } else {
        return this.userFutures.filter(item => item.isOpen === false);
      }
    },
    filteredSpot() {
      if (this.singleSelect) {
        return this.userSpot.filter(item => item.isOpen === true);
      } else {
        return this.userSpot.filter(item => item.isOpen === false);
      }
    },

    calculateDateDiff(selectedUser) {
      const today = new Date();
      const userDay = new Date(selectedUser.updated_at);
      const diffInMilliseconds = today - userDay;
      const diffInDays = Math.round(diffInMilliseconds / 1000 / 60 / 60 / 24);
      return diffInDays > selectedUser.day ? 'Bitmiş' : diffInDays  + " Gün" ;
    },

  },

  mounted() {
    const token = localStorage.getItem('token')
    const decoded = jwtDecode(token)
    const role = decoded.role;
    if(role == 1){
      this.admin = true
    }
    else{
      this.admin = false
    }
  },

  created() {
    this.getUsers();
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
  padding-right:0px!important;
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
.card{
  margin:20px;
  padding:20px;
  background-color: aliceblue;
}
#loader {
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 3s linear infinite;
  margin-left: 20px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.textred {
    color: #ff0000;
}
.textgreen {
    color: green;
}
</style>