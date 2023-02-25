<template>
    <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet" />
        <div class="mobil">
            <b-button v-b-toggle.sidebar-variant style="background-color:rgba(0, 0, 0, 0.87);color:aliceblue; margin-left:20px;margin-top:10px">Menu</b-button>        
                <b-span style="font-weight:bold;margin:60px">Panel App</b-span>
                <b-sidebar id="sidebar-variant" title="Panel App" bg-variant="dark" text-variant="light" shadow>
                    <div  class="px-3 py-2">
                        <ul class="nav-links">
                            <li style="padding:20px;list-style: none" :class="(active_adres == '/' ? 'active' : '')">
                                <router-link to="/" >
                                    <a href="/"> <i style="color:aliceblue" class='fa fa-home'></i>
                                        <span class="link_name" style="color:aliceblue">Ana Sayfa</span>
                                    </a>
                                </router-link>
                            </li>
                            <li style="padding:20px;list-style: none" :class="(active_adres == '/userlist' ? 'active' : '')" @click="menu_open('/userlist')">
                                <a href="/userlist"> <i style="color:aliceblue" class='fa fa-users'></i>
                                    <span class="link_name" style="color:aliceblue">Kullanıcı Listesi</span>
                                </a>
                            </li>
                            <li style="padding:20px;list-style: none" :class="(active_adres == '/userinfo' ? 'active' : '')" @click="menu_open('/userinfo')">
                                <a href="/userinfo"> <i style="color:aliceblue" class='fa fa-info-circle'></i>
                                    <span class="link_name" style="color:aliceblue">Bilgilerim</span>
                                </a>
                            </li>
                            <!-- <li style="padding:20px;list-style: none" :class="(active_adres == '/userinfo' ? 'active' : '')" @click="menu_open('/userinfo')">
                                <a href="#"> <i style="color:aliceblue" class='fa fa-shield'></i>
                                <span class="link_name">Sistem Kullanıcıları</span>
                                </a>
                            </li> -->
                            <li style="padding:20px;list-style: none">
                                <a href="#"> <i style="color:aliceblue" class='fa fa-sign-out'></i>
                                <span class="link_name" style="color:aliceblue" @click="logout">Çıkış Yap</span>
                            </a>
                        </li>
                     </ul>
                </div>
            </b-sidebar>
        </div>

        <div class="sidebar">
            <div class="logo-details">
                <i class='bx bxl-c-plus-plus'></i>
                <span class="logo_name">Panel App</span>
            </div>
            <ul class="nav-links">
                <li :class="(active_adres == '/' ? 'active' : '')">
                    <router-link to="/" >
                        <a href="/"> <i class='fa fa-home'></i>
                            <span class="link_name">Ana Sayfa</span>
                        </a>
                    </router-link>
                </li>
                <li :class="(active_adres == '/userlist' ? 'active' : '')" @click="menu_open('/userlist')">
                    <a href="/userlist"> <i class='fa fa-users'></i>
                        <span class="link_name">Kullanıcı Listesi</span>
                    </a>
                </li>
             <!--    <li :class="(active_adres == '/userinfo' ? 'active' : '')" @click="menu_open('/userinfo')">
                    <a href="/userinfo"> <i class='fa fa-info-circle'></i>
                        <span class="link_name">Bilgilerim</span>
                    </a>
                </li>
                <li :class="(active_adres == '/userinfo' ? 'active' : '')" @click="menu_open('/userinfo')">
                    <a href="#"> <i class='fa fa-shield'></i>
                     <span class="link_name">Sistem Kullanıcıları</span>
                    </a>
                </li> -->
                <li>
                    <a href="#"> <i class='fa fa-sign-out'></i>
                        <span class="link_name" @click="logout">Çıkış Yap</span>
                    </a>
                </li>
            </ul>
        </div>

        <section class="home-section">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">App</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <button class="btn btn-info my-2 my-sm-0" @click="logout" type="submit">Çıkış Yap</button>
                    </form>
                </div>
            </nav>
            <div>
                <Nuxt />
            </div>
        </section>

    </div>
</template>
<script>
export default {
    
    data() {
        return {
            active_adres: "/",
            isLoggedIn: false
        }
    },
    
    mounted() {
        if(localStorage.getItem('token')) {
        this.isLoggedIn = true
        }
        else{
            this.$router.push('/login')
        }
    },

    methods: {

        logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        },

        menu_open(menu) {
            if (this.isLoggedIn) {
                this.active_adres = menu;
                return $nuxt.$router.push({ path: menu });
            } else {
                this.$router.push('/login')
            }
        },
    },

    name: 'app'
}

</script>

<style scoped>
@import './app.css';
</style>
<style>
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .home-section {
  left: 10px!important;
  width: 90%!important;
 }
 .bg-light{
    display: none!important;
  }
}
@media (min-width: 768px) {
  .mobil {
    display: none;
  }
  
}
.b-sidebar:not(.b-sidebar-right) {
    left: 0;
    right: auto;
    background-color: #11101d!important;
}

</style>