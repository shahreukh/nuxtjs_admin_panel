<template>
  <section class="vh-100">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
          <div class="card text-black" style="border-radius: 25px; background-color: #eee;box-shadow:1px 10px 10px 1px #4a657c!important;">
            <div class="card-body p-md-5">
              <div class="">
                <div class="">
  
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Giriş Yap</p>
                  <form class="mx-1 mx-md-4">
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input v-model="email" type="text" class="form-control" placeholder="E-posta">          
                      </div>
                    </div>
  
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" v-model="password" class="form-control" placeholder="Şifre">         
                      </div>
                    </div>
  
                    <div class="d-flex justify-content-center mx-4 mb-3 mt-lg-4">
                      <button type="button" class="  login-page button" @click="login()">Giriş yap</button>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mt-3 mt-lg-4">
                    <a class="text-center signup" href="/signup" type="button">Oturum Aç</a>
                    </div>
                  </form>
  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

import axios from 'axios';

export default {
    layout: 'auth',
    name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    
    async login() {
       try {
     
        const response = await axios.post('http://localhost:7016/login', {
          email : this.email,
          password : this.password
        });

     
        if (response.data.message === 'Login successful') {
          localStorage.setItem('token', response.data.token);
          return this.$nuxt.$router.push({ path: '/' });
        }

       } catch (error) {
        this.$swal({
                    icon: 'error',
                    text: "E-posta veya şifreniz yanlış. Lütfen tekrar deneyin.",
                    type: "warning",
                    confirmButtonColor: "#d33",
                }
              );
       }
    }
  },
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';

.login-page button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.login-page button:active {
    transform: scale(0.95);
}

.login-page button:focus {
    outline: none;
}

.login-page button.ghost {
    background-color: transparent;
    border-color: #fff;
}
.signup:hover {
  color:royalblue!important;
  
}
</style>  
  