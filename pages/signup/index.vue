<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-6 col-xl-5">
        <div class="card text-black" style="border-radius: 25px; background-color: #eee;box-shadow:1px 10px 10px 1px #4a657c!important;">
          <div class="card-body p-md-5">
            <div class="">
              <div class="">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Oturum Aç</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input v-model="name" type="text" class="form-control" placeholder="Ad Soyad" required>                   
                    </div>
                  </div>

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

                <!-- <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" v-model="password" class="form-control" placeholder="fjfjfj">                   
                    </div>
                  </div> -->

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="  login-page button" @click="signUp()">Kayit Et</button>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mt-3 mt-lg-4">
                    <a class="text-center signup" href="/login" type="button">Giriş yap</a>
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
    name: 'singup',

  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },

  methods: {

    async signUp() {
    if (!this.email || !this.password) {
      this.$swal({
                    icon: 'error',
                    text: "E-posta ve şifre gerekli. Lütfen tekrar deneyin",
                    type: "warning",
                    confirmButtonColor: "#d33",
                }
              );
        return;
    }
    try {
        const response = await axios.post('http://localhost:7016/signup',{
            name     : this.name,
            email    : this.email,
            password : this.password
        });

        if (response.data.message === 'Signup successful') {
          this.$swal("Başarılı!", "Kullanıcı başarıyla eklendi", 'success');
          return this.$nuxt.$router.push({ path: 'login' });
        }  

    } catch (error) {
      this.$swal({
                    icon: 'error',
                    text: "Bu e-posta zaten kayıtlı",
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
</style>  
  